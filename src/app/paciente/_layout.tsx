import { ReactNode } from 'react';
import { Redirect, Stack } from 'expo-router';
import { rotaInicial, useAuth } from '@/contexts/AuthContext';
import { ConsultasProvider, useConsultas } from '@/contexts/ConsultasContext';
import { EstudantesProvider } from '@/contexts/EstudantesContext';
import { NotificacoesProvider } from '@/contexts/NotificacoesContext';
import { gerarNotificacoes } from '@/utils/notificacoes';

// Gera as notificações a partir das consultas do paciente
function NotificacoesDoPaciente({ children }: { children: ReactNode }) {
  const { consultas } = useConsultas();
  return (
    <NotificacoesProvider notificacoes={gerarNotificacoes(consultas)}>
      {children}
    </NotificacoesProvider>
  );
}

export default function PacienteLayout() {
  const { usuario, perfilEstudante, carregando } = useAuth();

  // Só entra quem está logado como paciente (igual ao /api/paciente/** do backend)
  if (carregando) return null;
  if (!usuario) return <Redirect href="/boas-vindas" />;
  if (usuario.perfil !== 'PACIENTE') return <Redirect href={rotaInicial(usuario, perfilEstudante)} />;

  return (
    <EstudantesProvider>
      <ConsultasProvider>
        <NotificacoesDoPaciente>
          <Stack screenOptions={{ headerShown: false }} />
        </NotificacoesDoPaciente>
      </ConsultasProvider>
    </EstudantesProvider>
  );
}