import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNotificacoes } from '@/contexts/NotificacoesContext';
import { styles } from '@/styles/components/patientHeader.styles';
import { colors } from '@/styles/colors';

export default function PatientHeader() {
  const { naoLidas } = useNotificacoes();

  return (
    <View style={styles.container}>
      <View style={styles.marca}>
        <Image source={require('../../assets/psiconecta-logo.png')} style={styles.logo} />
        <Text style={styles.marcaTexto}>Psiconecta</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoIcone}
        onPress={() => router.push('/paciente/notificacoes')}
      >
        <Ionicons name="notifications-outline" size={22} color={colors.titulo} />
        {/* Bolinha só quando tem algo não lido */}
        {naoLidas > 0 && <View style={styles.notificacaoPonto} />}
      </TouchableOpacity>
    </View>
  );
}