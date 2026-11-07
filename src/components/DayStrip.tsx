import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { ehHoje, diaSemanaCurto } from '@/utils/datas';
import { styles } from '@/styles/components/dayStrip.styles';

export type DiaDaFaixa = {
  chave: string;          // "2026-11-07"
  data: Date;
  legenda: string;        // texto embaixo do número (ex.: "3 vagas", "2 sessões")
  desabilitado?: boolean; // apagado e sem toque
  destaque?: boolean;     // legenda em roxo
};

type Props = {
  dias: DiaDaFaixa[];
  selecionado: string | null;
  onSelecionar: (chave: string) => void;
};

export default function DayStrip({ dias, selecionado, onSelecionar }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}
    >
      {dias.map((dia) => {
        const ativo = dia.chave === selecionado;

        return (
          <TouchableOpacity
            key={dia.chave}
            style={[
              styles.dia,
              ativo && styles.diaSelecionado,
              dia.desabilitado && styles.diaDesabilitado,
            ]}
            disabled={dia.desabilitado}
            onPress={() => onSelecionar(dia.chave)}
            activeOpacity={0.8}
          >
            <Text style={[styles.semana, ativo && styles.textoBranco]}>
              {ehHoje(dia.data) ? 'Hoje' : diaSemanaCurto(dia.data)}
            </Text>
            <Text style={[styles.numero, ativo && styles.textoBranco]}>
              {dia.data.getDate()}
            </Text>
            <Text
              style={[
                styles.legenda,
                dia.destaque && styles.legendaDestaque,
                ativo && styles.textoBranco,
              ]}
            >
              {dia.legenda}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}