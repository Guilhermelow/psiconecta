import { Stack } from 'expo-router';
import { ConsultasProvider } from '@/contexts/ConsultasContext';
import { NotificacoesProvider } from '@/contexts/NotificacoesContext';

// As notificações ficam DENTRO das consultas, porque nascem delas
export default function PacienteLayout() {
  return (
    <ConsultasProvider>
      <NotificacoesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </NotificacoesProvider>
    </ConsultasProvider>
  );
}