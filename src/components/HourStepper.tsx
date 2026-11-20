import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/hourStepper.styles';
import { colors } from '@/styles/colors';

type Props = {
  rotulo: string;
  valor: number; // hora cheia: 8 = 08:00
  minimo: number;
  maximo: number;
  onMudar: (novo: number) => void;
};

export const formatarHoraCheia = (hora: number) => `${String(hora).padStart(2, '0')}:00`;

// Seletor "− 08:00 +"
export default function HourStepper({ rotulo, valor, minimo, maximo, onMudar }: Props) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View style={styles.linha}>
        <TouchableOpacity
          style={[styles.botao, valor <= minimo && styles.botaoDesabilitado]}
          disabled={valor <= minimo}
          onPress={() => onMudar(valor - 1)}
        >
          <Ionicons name="remove" size={18} color={colors.primaria} />
        </TouchableOpacity>

        <Text style={styles.valor}>{formatarHoraCheia(valor)}</Text>

        <TouchableOpacity
          style={[styles.botao, valor >= maximo && styles.botaoDesabilitado]}
          disabled={valor >= maximo}
          onPress={() => onMudar(valor + 1)}
        >
          <Ionicons name="add" size={18} color={colors.primaria} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
