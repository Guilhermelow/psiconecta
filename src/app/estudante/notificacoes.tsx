import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import NotificationList from '@/components/NotificationList';
import { styles } from '@/styles/estudante/notificacoes.styles';

export default function NotificacoesEstudante() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Notificações" />
        <NotificationList textoVazio="Avisos sobre solicitações e atendimentos aparecerão aqui." />
      </ScrollView>
    </SafeAreaView>
  );
}