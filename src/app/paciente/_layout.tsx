import { ReactNode } from 'react';
import { Stack } from 'expo-router';
import { ConsultasProvider, useConsultas } from '@/contexts/ConsultasContext';
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
  return (
    <ConsultasProvider>
      <NotificacoesDoPaciente>
        <Stack screenOptions={{ headerShown: false }} />
      </NotificacoesDoPaciente>
    </ConsultasProvider>
  );
}