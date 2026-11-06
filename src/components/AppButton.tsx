import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/appButton.styles';
import { colors } from '@/styles/colors';

type Variante = 'primario' | 'secundario' | 'perigo';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: Variante; // roxo, clarinho ou vermelho
  icone?: keyof typeof Ionicons.glyphMap;
  desabilitado?: boolean;
};

// Estilo de cada variante
const ESTILOS_BOTAO = {
  primario: styles.botaoPrimario,
  secundario: styles.botaoSecundario,
  perigo: styles.botaoPerigo,
};
const ESTILOS_TEXTO = {
  primario: styles.textoPrimario,
  secundario: styles.textoSecundario,
  perigo: styles.textoPerigo,
};

export default function AppButton({
  titulo,
  onPress,
  variante = 'primario',
  icone,
  desabilitado = false,
}: Props) {
  const corConteudo = desabilitado
    ? colors.primariaMedia
    : variante === 'secundario'
    ? colors.primaria
    : colors.branco;

  return (
    <TouchableOpacity
      style={[styles.botao, ESTILOS_BOTAO[variante], desabilitado && styles.botaoDesabilitado]}
      onPress={onPress}
      disabled={desabilitado}
      activeOpacity={0.8}
    >
      <Text style={[styles.texto, ESTILOS_TEXTO[variante], desabilitado && styles.textoDesabilitado]}>
        {titulo}
      </Text>

      {icone && <Ionicons name={icone} size={18} color={corConteudo} />}
    </TouchableOpacity>
  );
}