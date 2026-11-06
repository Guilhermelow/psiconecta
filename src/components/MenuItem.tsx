import { ReactNode } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/menuItem.styles';
import { colors } from '@/styles/colors';

type Props = {
  icone: keyof typeof Ionicons.glyphMap;
  titulo: string;
  subtitulo?: string;
  onPress?: () => void;
  direita?: ReactNode; // algo no lugar da setinha (ex.: um botão liga/desliga)
};

export default function MenuItem({ icone, titulo, subtitulo, onPress, direita }: Props) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.icone}>
        <Ionicons name={icone} size={20} color={colors.primaria} />
      </View>

      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      </View>

      {direita ??
        (onPress ? (
          <Ionicons name="chevron-forward" size={18} color={colors.textoClaro} />
        ) : null)}
    </TouchableOpacity>
  );
}