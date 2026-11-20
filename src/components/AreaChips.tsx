import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import FilterChips from '@/components/FilterChips';
import type { AreaAtendimentoResponseDTO } from '@/types/api';
import { styles } from '@/styles/components/areaChips.styles';
import { colors } from '@/styles/colors';

type Props = {
  areas: AreaAtendimentoResponseDTO[];
  carregando: boolean;
  erro: string | null;
  onTentarDeNovo: () => void;
  selecionadas: number[]; // ids (areasAtendimentoIds)
  onMudar: (ids: number[]) => void;
};

// Seleção múltipla de áreas de atendimento, por id
export default function AreaChips({
  areas,
  carregando,
  erro,
  onTentarDeNovo,
  selecionadas,
  onMudar,
}: Props) {
  if (carregando) {
    return (
      <View style={styles.estado}>
        <ActivityIndicator color={colors.primaria} />
        <Text style={styles.estadoTexto}>Carregando áreas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.estado}>
        <Text style={styles.erroTexto}>{erro}</Text>
        <TouchableOpacity onPress={onTentarDeNovo} hitSlop={10}>
          <Text style={styles.link}>Tentar de novo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const nomes = areas.map((area) => area.nome);
  const nomesSelecionados = areas
    .filter((area) => selecionadas.includes(area.id))
    .map((area) => area.nome);

  function alternar(nome: string) {
    const area = areas.find((item) => item.nome === nome);
    if (!area) return;
    onMudar(
      selecionadas.includes(area.id)
        ? selecionadas.filter((id) => id !== area.id)
        : [...selecionadas, area.id]
    );
  }

  return (
    <FilterChips opcoes={nomes} selecionado={nomesSelecionados} onSelecionar={alternar} quebrarLinha />
  );
}
