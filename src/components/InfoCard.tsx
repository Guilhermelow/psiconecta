import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/infoCard.styles';
import { colors } from '@/styles/colors';

type Props = {
  icone: keyof typeof Ionicons.glyphMap;
  titulo: string;
  descricao: string;
  verificado?: boolean; // mostra o check verde ao lado do título
};

export default function InfoCard({ icone, titulo, descricao, verificado }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconeCaixa}>
        <Ionicons name={icone} size={22} color={colors.primaria} />
      </View>

      <View style={styles.textos}>
        <View style={styles.tituloLinha}>
          <Text style={styles.titulo}>{titulo}</Text>
          {verificado && (
            <Ionicons name="checkmark-circle" size={16} color={colors.verde} />
          )}
        </View>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>
    </View>
  );
}