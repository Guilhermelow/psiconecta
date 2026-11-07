import { router } from 'expo-router';
import TopBar from '@/components/TopBar';
import { useNotificacoes } from '@/contexts/NotificacoesContext';

// TopBar já ligado às notificações do paciente
export default function PatientHeader() {
  const { naoLidas } = useNotificacoes();

  return (
    <TopBar
      naoLidas={naoLidas}
      onPressNotificacoes={() => router.push('/paciente/notificacoes')}
    />
  );
}