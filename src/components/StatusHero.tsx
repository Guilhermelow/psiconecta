import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '@/styles/components/statusHero.styles';
import { colors } from '@/styles/colors';

type Props = {
  icone: keyof typeof MaterialCommunityIcons.glyphMap;
  cor?: 'roxo' | 'verde';
  status: string;
  titulo: string;
  subtitulo: string;
};

export default function StatusHero({ icone, cor = 'roxo', status, titulo, subtitulo }: Props) {
  const verde = cor === 'verde';
  const corPrincipal = verde ? colors.verde : colors.primaria;
  const fundo = verde ? styles.fundoVerde : styles.fundoRoxo;

  return (
    <View style={styles.container}>
      <View style={[styles.iconeCirculo, fundo]}>
        <MaterialCommunityIcons name={icone} size={44} color={corPrincipal} />
      </View>

      <View style={[styles.status, fundo]}>
        <View style={[styles.statusPonto, { backgroundColor: corPrincipal }]} />
        <Text style={[styles.statusTexto, { color: corPrincipal }]}>{status}</Text>
      </View>

      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}