import { ReactNode } from 'react';
import { Stack } from 'expo-router';
import { AtendimentosProvider, useAtendimentos } from '@/contexts/AtendimentosContext';
import { NotificacoesProvider } from '@/contexts/NotificacoesContext';
import { gerarNotificacoesEstudante } from '@/utils/notificacoes';

// Gera as notificações a partir dos atendimentos e solicitações
function NotificacoesDoEstudante({ children }: { children: ReactNode }) {
  const { atendimentos, solicitacoes } = useAtendimentos();
  return (
    <NotificacoesProvider notificacoes={gerarNotificacoesEstudante(atendimentos, solicitacoes)}>
      {children}
    </NotificacoesProvider>
  );
}

export default function EstudanteLayout() {
  return (
    <AtendimentosProvider>
      <NotificacoesDoEstudante>
        <Stack screenOptions={{ headerShown: false }} />
      </NotificacoesDoEstudante>
    </AtendimentosProvider>
  );
}