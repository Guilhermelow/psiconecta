import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '@/styles/components/accountTypeCard.styles';
import { colors } from '@/styles/colors';

type NomeIcone = keyof typeof MaterialCommunityIcons.glyphMap;

type Props = {
  icone: NomeIcone;
  titulo: string;
  tag: string;
  descricao: string;
  destaque: string;
  iconeDestaque: NomeIcone;
  selecionado: boolean;
  onPress: () => void;
};

export default function AccountTypeCard({
  icone,
  titulo,
  tag,
  descricao,
  destaque,
  iconeDestaque,
  selecionado,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selecionado && styles.cardSelecionado]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.topo}>
        <View style={styles.iconeCaixa}>
          <MaterialCommunityIcons name={icone} size={26} color={colors.primaria} />
        </View>

        <View style={[styles.radio, selecionado && styles.radioSelecionado]}>
          {selecionado && <View style={styles.radioPonto} />}
        </View>
      </View>

      <View style={styles.tituloLinha}>
        <Text style={styles.titulo}>{titulo}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagTexto}>{tag}</Text>
        </View>
      </View>

      <Text style={styles.descricao}>{descricao}</Text>

      <View style={styles.destaque}>
        <MaterialCommunityIcons name={iconeDestaque} size={14} color={colors.primaria} />
        <Text style={styles.destaqueTexto}>{destaque}</Text>
      </View>
    </TouchableOpacity>
  );
}