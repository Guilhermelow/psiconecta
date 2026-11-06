import { createContext, useContext, useState, ReactNode } from 'react';
import { useConsultas } from '@/contexts/ConsultasContext';
import { gerarNotificacoes, Notificacao } from '@/utils/notificacoes';

export type NotificacaoComLeitura = Notificacao & { lida: boolean };

type NotificacoesContextType = {
  notificacoes: NotificacaoComLeitura[];
  naoLidas: number;
  marcarComoLida: (id: string) => void;
  marcarTodasComoLidas: () => void;
};

const NotificacoesContext = createContext<NotificacoesContextType | null>(null);

export function NotificacoesProvider({ children }: { children: ReactNode }) {
  const { consultas } = useConsultas();
  const [lidas, setLidas] = useState<string[]>([]); // ids das já lidas

  const notificacoes = gerarNotificacoes(consultas).map((notificacao) => ({
    ...notificacao,
    lida: lidas.includes(notificacao.id),
  }));

  const naoLidas = notificacoes.filter((notificacao) => !notificacao.lida).length;

  function marcarComoLida(id: string) {
    setLidas((anteriores) => (anteriores.includes(id) ? anteriores : [...anteriores, id]));
  }

  function marcarTodasComoLidas() {
    setLidas(notificacoes.map((notificacao) => notificacao.id));
  }

  return (
    <NotificacoesContext.Provider
      value={{ notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas }}
    >
      {children}
    </NotificacoesContext.Provider>
  );
}

export function useNotificacoes() {
  const contexto = useContext(NotificacoesContext);
  if (!contexto) {
    throw new Error('useNotificacoes precisa estar dentro do NotificacoesProvider');
  }
  return contexto;
}