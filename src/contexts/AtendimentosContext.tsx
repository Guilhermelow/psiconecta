import { createContext, useContext, useState, ReactNode } from 'react';
import {
  criarAtendimentosExemplo,
  criarSolicitacoesExemplo,
  criarDisponibilidadeExemplo,
} from '@/mocks/atendimentos';
import {
  Disponibilidade,
  disponibilidadeVazia,
  paraAgendaSemanal,
} from '@/utils/disponibilidade';

// Atendimento já marcado com um paciente
export type Atendimento = {
  id: string;
  pacienteNome: string;
  pacienteFoto?: string;
  sessao: number;
  data: string;
  hora: string;
  queixa?: string;
  contatoEmergencia?: {
    nome: string;
    relacao: string;
    telefone: string;
  };
};

// Pedido de um paciente esperando o estudante aceitar
export type Solicitacao = {
  id: string;
  pacienteNome: string;
  pacienteFoto?: string;
  queixa: string;
  data: string;
  hora: string;
  recebidaEm: string;
};

type AtendimentosContextType = {
  atendimentos: Atendimento[];
  solicitacoes: Solicitacao[];
  disponibilidade: Disponibilidade;
  aceitarSolicitacao: (id: string) => void;
  recusarSolicitacao: (id: string, motivo: string) => void;
  cancelarAtendimento: (id: string, motivo: string) => void;
  salvarDisponibilidade: (nova: Disponibilidade) => void;
};

const AtendimentosContext = createContext<AtendimentosContextType | null>(null);

function momento(item: { data: string; hora: string }) {
  return `${item.data} ${item.hora}`;
}

export function AtendimentosProvider({ children }: { children: ReactNode }) {
  // Em teste, começa com exemplos. No app publicado, começa vazio.
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>(() =>
    __DEV__ ? criarAtendimentosExemplo() : []
  );
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(() =>
    __DEV__ ? criarSolicitacoesExemplo() : []
  );
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade>(() =>
    __DEV__ ? criarDisponibilidadeExemplo() : disponibilidadeVazia()
  );

  // Aceitar: vira um atendimento (1ª sessão) e sai da lista de pedidos
  function aceitarSolicitacao(id: string) {
    const pedido = solicitacoes.find((item) => item.id === id);
    if (!pedido) return;

    const novo: Atendimento = {
      id: `at-${pedido.id}`,
      pacienteNome: pedido.pacienteNome,
      pacienteFoto: pedido.pacienteFoto,
      sessao: 1,
      data: pedido.data,
      hora: pedido.hora,
      queixa: pedido.queixa,
    };

    setAtendimentos((anteriores) =>
      [...anteriores, novo].sort((a, b) => momento(a).localeCompare(momento(b)))
    );
    setSolicitacoes((anteriores) => anteriores.filter((item) => item.id !== id));
  }

  // O paciente volta para a triagem.
  // Depois, o motivo será enviado ao servidor para a coordenação.
  function recusarSolicitacao(id: string, motivo: string) {
    console.log('Solicitação recusada:', id, motivo);
    setSolicitacoes((anteriores) => anteriores.filter((item) => item.id !== id));
  }

  // Depois, o motivo vai para o servidor e o paciente é avisado
  function cancelarAtendimento(id: string, motivo: string) {
    console.log('Atendimento cancelado:', id, motivo);
    setAtendimentos((anteriores) => anteriores.filter((item) => item.id !== id));
  }

  // Depois, isso vai para o servidor e alimenta o calendário dos pacientes
  function salvarDisponibilidade(nova: Disponibilidade) {
    console.log('Horários que o paciente verá:', paraAgendaSemanal(nova));
    setDisponibilidade(nova);
  }

  return (
    <AtendimentosContext.Provider
      value={{
        atendimentos,
        solicitacoes,
        disponibilidade,
        aceitarSolicitacao,
        recusarSolicitacao,
        cancelarAtendimento,
        salvarDisponibilidade,
      }}
    >
      {children}
    </AtendimentosContext.Provider>
  );
}

export function useAtendimentos() {
  const contexto = useContext(AtendimentosContext);
  if (!contexto) {
    throw new Error('useAtendimentos precisa estar dentro do AtendimentosProvider');
  }
  return contexto;
}