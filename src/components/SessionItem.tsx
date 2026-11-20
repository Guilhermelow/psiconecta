import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ConsultaResponseDTO } from '@/types/api';
import { fimDaConsulta, horaDe, inicioDaConsulta } from '@/utils/consultas';
import { precisaRegistro } from '@/utils/atendimentos';
import { ROTULO_MODALIDADE, ROTULO_STATUS_CONSULTA } from '@/utils/rotulos';
import { styles } from '@/styles/components/sessionItem.styles';
import { colors } from '@/styles/colors';

type Props = {
  consulta: ConsultaResponseDTO;
};

// Linha "14:00 | foto | nome" — abre os detalhes ao tocar
export default function SessionItem({ consulta }: Props) {
  const encerrada = ['CONCLUIDA', 'CANCELADA', 'NAO_COMPARECEU'].includes(consulta.status);
  const sub = precisaRegistro(consulta)
    ? 'Registrar atendimento'
    : `${ROTULO_STATUS_CONSULTA[consulta.status]} • ${ROTULO_MODALIDADE[consulta.modalidade]}`;

  return (
    <TouchableOpacity
      style={[styles.item, encerrada && styles.itemConcluido]}
      onPress={() => router.push(`/estudante/atendimento/${consulta.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.horaColuna}>
        <Text style={styles.hora}>{horaDe(inicioDaConsulta(consulta))}</Text>
        <Text style={styles.fim}>até {horaDe(fimDaConsulta(consulta))}</Text>
      </View>

      <View style={styles.divisor} />

      <Image source={require('../../assets/avatar-padrao.png')} style={styles.foto} />

      <View style={styles.textos}>
        <Text style={styles.nome}>{consulta.pacienteNome}</Text>
        <Text style={[styles.sub, precisaRegistro(consulta) && { color: colors.erro }]}>{sub}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textoClaro} />
    </TouchableOpacity>
  );
}
