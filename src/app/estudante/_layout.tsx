import { ReactNode } from 'react';
import { Redirect, Stack } from 'expo-router';
import { rotaInicial, useAuth } from '@/contexts/AuthContext';
import { AtendimentosProvider, useAtendimentos } from '@/contexts/AtendimentosContext';
import { NotificacoesProvider } from '@/contexts/NotificacoesContext';
import { gerarNotificacoesEstudante } from '@/utils/notificacoes';

// Gera as notificações a partir das consultas do estudante
function NotificacoesDoEstudante({ children }: { children: ReactNode }) {
  const { consultas } = useAtendimentos();
  return (
    <NotificacoesProvider notificacoes={gerarNotificacoesEstudante(consultas)}>
      {children}
    </NotificacoesProvider>
  );
}

export default function EstudanteLayout() {
  const { usuario, perfilEstudante, carregando } = useAuth();

  // Só entra estudante logado e aprovado; pendente/rejeitado vai para a tela de análise
  if (carregando) return null;
  if (!usuario) return <Redirect href="/boas-vindas" />;
  if (usuario.perfil !== 'ESTUDANTE' || (perfilEstudante && perfilEstudante.statusAprovacao !== 'APROVADO')) {
    return <Redirect href={rotaInicial(usuario, perfilEstudante)} />;
  }

  return (
    <AtendimentosProvider>
      <NotificacoesDoEstudante>
        <Stack screenOptions={{ headerShown: false }} />
      </NotificacoesDoEstudante>
    </AtendimentosProvider>
  );
}
