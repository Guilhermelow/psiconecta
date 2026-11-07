import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import NotificationList from '@/components/NotificationList';
import { styles } from '@/styles/paciente/notificacoes.styles';

export default function NotificacoesPaciente() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Notificações" />
        <NotificationList textoVazio="Avisos sobre suas consultas aparecerão aqui." />
      </ScrollView>
    </SafeAreaView>
  );
}