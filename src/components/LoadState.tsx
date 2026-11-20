import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/loadState.styles';
import { colors } from '@/styles/colors';

type Props = {
  carregando: boolean;
  erro: string | null;
  onTentarDeNovo: () => void;
  textoCarregando?: string;
};

// Mostra "carregando" ou o erro com "Tentar de novo". Não mostra nada se estiver tudo certo.
export default function LoadState({ carregando, erro, onTentarDeNovo, textoCarregando }: Props) {
  if (carregando) {
    return (
      <View style={styles.caixa}>
        <ActivityIndicator color={colors.primaria} />
        <Text style={styles.texto}>{textoCarregando ?? 'Carregando...'}</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.caixa, styles.caixaErro]}>
        <Ionicons name="cloud-offline-outline" size={22} color={colors.erro} />
        <Text style={[styles.texto, styles.textoErro]}>{erro}</Text>
        <TouchableOpacity onPress={onTentarDeNovo} hitSlop={10}>
          <Text style={styles.link}>Tentar de novo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}
