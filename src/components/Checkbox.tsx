import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/checkbox.styles';
import { colors } from '@/styles/colors';

type Props = {
  label: string;
  marcado: boolean;
  onPress: () => void;
};

export default function Checkbox({ label, marcado, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.caixa, marcado && styles.caixaMarcada]}>
        {marcado && <Ionicons name="checkmark" size={14} color={colors.branco} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}