import { createContext, useContext, useState, ReactNode } from 'react';
import { gerarProtocolo } from '@/utils/protocolo';
import { situacaoDaConsulta } from '@/utils/consultas';
import { criarConsultasExemplo } from '@/mocks/consultas';

export type Consulta = {
  id: string;
  estudanteId: string;
  data: string; // "2026-11-03"
  hora: string; // "14:00"
  protocolo: string;
  status: 'agendada' | 'cancelada';
  motivoCancelamento?: string;
  criadaEm: string;     // quando foi marcada
  canceladaEm?: string; // quando foi cancelada
};

// O que a tela precisa informar para agendar
type NovaConsulta = Pick<Consulta, 'estudanteId' | 'data' | 'hora'>;

type ConsultasContextType = {
  consultas: Consulta[];
  proxima: Consulta | null;
  agendar: (nova: NovaConsulta) => Consulta;
  cancelar: (id: string, motivo?: string) => void;
};

const ConsultasContext = createContext<ConsultasContextType | null>(null);

function momento(consulta: { data: string; hora: string }) {
  return `${consulta.data} ${consulta.hora}`;
}

export function ConsultasProvider({ children }: { children: ReactNode }) {
  // Em teste, já começa com exemplos. No app publicado, começa vazio.
  const [consultas, setConsultas] = useState<Consulta[]>(() =>
    __DEV__ ? criarConsultasExemplo() : []
  );

    function agendar(nova: NovaConsulta) {
    const consulta: Consulta = {
      ...nova,
      id: String(Date.now()),
      protocolo: gerarProtocolo(),
      status: 'agendada',
      criadaEm: new Date().toISOString(),
    };

    setConsultas((anteriores) =>
      [...anteriores, consulta].sort((a, b) => momento(a).localeCompare(momento(b)))
    );

    return consulta;
  }

  // Não apaga: marca como cancelada e guarda o motivo e o momento
  function cancelar(id: string, motivo?: string) {
    setConsultas((anteriores) =>
      anteriores.map((consulta) =>
        consulta.id === id
          ? {
              ...consulta,
              status: 'cancelada',
              motivoCancelamento: motivo,
              canceladaEm: new Date().toISOString(),
            }
          : consulta
      )
    );
  }

  // A próxima consulta que ainda não terminou e não foi cancelada
  const proxima = consultas.find((consulta) => situacaoDaConsulta(consulta) === 'proxima') ?? null;

  return (
    <ConsultasContext.Provider value={{ consultas, proxima, agendar, cancelar }}>
      {children}
    </ConsultasContext.Provider>
  );
}

export function useConsultas() {
  const contexto = useContext(ConsultasContext);
  if (!contexto) {
    throw new Error('useConsultas precisa estar dentro do ConsultasProvider');
  }
  return contexto;
}