import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/topBar.styles';
import { colors } from '@/styles/colors';

type Props = {
  naoLidas?: number;              // mostra a bolinha se for maior que 0
  onPressNotificacoes: () => void;
};

// Logo + sino. Usado pelo paciente e pelo estudante.
export default function TopBar({ naoLidas = 0, onPressNotificacoes }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.marca}>
        <Image source={require('../../assets/psiconecta-logo.png')} style={styles.logo} />
        <Text style={styles.marcaTexto}>Psiconecta</Text>
      </View>

      <TouchableOpacity style={styles.botaoIcone} onPress={onPressNotificacoes}>
        <Ionicons name="notifications-outline" size={22} color={colors.titulo} />
        {naoLidas > 0 && <View style={styles.notificacaoPonto} />}
      </TouchableOpacity>
    </View>
  );
}