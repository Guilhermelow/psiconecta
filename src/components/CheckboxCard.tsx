import { ReactNode } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/checkboxCard.styles';
import { colors } from '@/styles/colors';

type Props = {
  marcado: boolean;
  onPress: () => void;
  children: ReactNode; // o texto do card (pode ter partes coloridas)
};

export default function CheckboxCard({ marcado, onPress, children }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, marcado && styles.cardMarcado]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.caixa, marcado && styles.caixaMarcada]}>
        {marcado && <Ionicons name="checkmark" size={14} color={colors.branco} />}
      </View>
      <Text style={styles.texto}>{children}</Text>
    </TouchableOpacity>
  );
}