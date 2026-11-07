import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Atendimento } from '@/contexts/AtendimentosContext';
import { DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, somarMinutos } from '@/utils/datas';
import { styles } from '@/styles/components/sessionItem.styles';
import { colors } from '@/styles/colors';

type Props = {
  atendimento: Atendimento;
};

// Linha "14:00 | foto | nome" — abre os detalhes ao tocar
export default function SessionItem({ atendimento }: Props) {
  const fim = dataEHora(atendimento.data, atendimento.hora).getTime() + DURACAO_MINUTOS * 60000;
  const concluido = fim < Date.now();

  const sessao =
    atendimento.sessao === 1 ? 'Primeira consulta' : `Sessão nº ${atendimento.sessao}`;

  return (
    <TouchableOpacity
      style={[styles.item, concluido && styles.itemConcluido]}
      onPress={() => router.push(`/estudante/atendimento/${atendimento.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.horaColuna}>
        <Text style={styles.hora}>{atendimento.hora}</Text>
        <Text style={styles.fim}>até {somarMinutos(atendimento.hora, DURACAO_MINUTOS)}</Text>
      </View>

      <View style={styles.divisor} />

      <Image
        source={
          atendimento.pacienteFoto
            ? { uri: atendimento.pacienteFoto }
            : require('../../assets/avatar-padrao.png')
        }
        style={styles.foto}
      />

      <View style={styles.textos}>
        <Text style={styles.nome}>{atendimento.pacienteNome}</Text>
        <Text style={styles.sub}>{concluido ? 'Concluído' : `${sessao} • Online`}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textoClaro} />
    </TouchableOpacity>
  );
}