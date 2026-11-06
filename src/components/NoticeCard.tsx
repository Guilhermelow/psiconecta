import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/noticeCard.styles';
import { colors } from '@/styles/colors';

type Props = {
  icone: keyof typeof Ionicons.glyphMap;
  titulo?: string;
  texto: string;
};

export default function NoticeCard({ icone, titulo, texto }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconeCaixa}>
        <Ionicons name={icone} size={18} color={colors.primaria} />
      </View>

      <View style={styles.textos}>
        {titulo ? <Text style={styles.titulo}>{titulo}</Text> : null}
        <Text style={styles.texto}>{texto}</Text>
      </View>
    </View>
  );
}