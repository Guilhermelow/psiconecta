import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/verifiedBadge.styles';
import { colors } from '@/styles/colors';

type Props = {
  texto?: string;
  style?: StyleProp<ViewStyle>; // estilo extra (ex.: centralizar)
};

export default function VerifiedBadge({ texto = 'Verificado', style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="checkmark-circle" size={12} color={colors.verde} />
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}