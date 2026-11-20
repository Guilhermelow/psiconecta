import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/styles/components/filterChips.styles';

type Props = {
  opcoes: string[];
  selecionado: string | string[]; // um texto (uma escolha) ou uma lista (várias)
  onSelecionar: (opcao: string) => void;
  quebrarLinha?: boolean;         // quebra em várias linhas em vez de rolar para o lado
};

export default function FilterChips({ opcoes, selecionado, onSelecionar, quebrarLinha }: Props) {
  function estaAtivo(opcao: string) {
    return Array.isArray(selecionado) ? selecionado.includes(opcao) : opcao === selecionado;
  }

  const chips = opcoes.map((opcao) => {
    const ativo = estaAtivo(opcao);
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
  });

  if (quebrarLinha) {
    return <View style={styles.listaQuebrada}>{chips}</View>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}
    >
      {chips}
    </ScrollView>
  );
}