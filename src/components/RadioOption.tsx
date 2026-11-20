import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/radioOption.styles';
import { colors } from '@/styles/colors';

type Props = {
  icone: keyof typeof Ionicons.glyphMap;
  texto: string;
  selecionado: boolean;
  onPress: () => void;
};

export default function RadioOption({ icone, texto, selecionado, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.icone}>
        <Ionicons name={icone} size={18} color={colors.primaria} />
      </View>
      <Text style={styles.texto}>{texto}</Text>
      <View style={[styles.radio, selecionado && styles.radioSelecionado]}>
        {selecionado && <View style={styles.radioPonto} />}
      </View>
    </TouchableOpacity>
  );
}