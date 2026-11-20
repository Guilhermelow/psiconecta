import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import * as servicoPaciente from '@/services/paciente';
import { mensagemDeErro } from '@/services/api';
import type { AgendamentoConsultaDTO, ConsultaResponseDTO } from '@/types/api';
import { ordenarPorInicio, situacaoDaConsulta } from '@/utils/consultas';

// Consultas do paciente logado (GET /api/paciente/consultas)
type ConsultasContextType = {
  consultas: ConsultaResponseDTO[];
  carregando: boolean;
  erro: string | null;
  proxima: ConsultaResponseDTO | null;
  recarregar: () => Promise<void>;
  agendar: (dto: AgendamentoConsultaDTO) => Promise<ConsultaResponseDTO>;
  cancelar: (id: number) => Promise<ConsultaResponseDTO>;
};

const ConsultasContext = createContext<ConsultasContextType | null>(null);

export function ConsultasProvider({ children }: { children: ReactNode }) {
  const [consultas, setConsultas] = useState<ConsultaResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setConsultas(ordenarPorInicio(await servicoPaciente.listarMinhasConsultas()));
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  // Troca (ou inclui) a consulta devolvida pela API
  function guardar(consulta: ConsultaResponseDTO) {
    setConsultas((anteriores) =>
      ordenarPorInicio([...anteriores.filter((item) => item.id !== consulta.id), consulta])
    );
    return consulta;
  }

  // POST /api/paciente/consultas (o backend já devolve CONFIRMADA)
  async function agendar(dto: AgendamentoConsultaDTO) {
    return guardar(await servicoPaciente.agendarConsulta(dto));
  }

  // PUT /api/paciente/consultas/{id}/cancelar
  async function cancelar(id: number) {
    return guardar(await servicoPaciente.cancelarConsulta(id));
  }

  const proxima = consultas.find((consulta) => situacaoDaConsulta(consulta) === 'proxima') ?? null;

  return (
    <ConsultasContext.Provider
      value={{ consultas, carregando, erro, proxima, recarregar, agendar, cancelar }}
    >
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
