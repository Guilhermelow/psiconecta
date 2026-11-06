import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/styles/components/filterChips.styles';

type Props = {
  opcoes: string[];
  selecionado: string;
  onSelecionar: (opcao: string) => void;
};

export default function FilterChips({ opcoes, selecionado, onSelecionar }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}
    >
      {opcoes.map((opcao) => {
        const ativo = opcao === selecionado;
        return (
          <TouchableOpacity
            key={opcao}
            style={[styles.chip, ativo && styles.chipAtivo]}
            onPress={() => onSelecionar(opcao)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>{opcao}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}