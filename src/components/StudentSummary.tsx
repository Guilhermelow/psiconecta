import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VerifiedBadge from '@/components/VerifiedBadge';
import { RECURSOS } from '@/config/recursos';
import type { EstudanteResponseDTO, ModalidadeAtendimento } from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/components/studentSummary.styles';
import { colors } from '@/styles/colors';

type Props = {
  nome: string; // vem da consulta (estudanteNome) ou do estudante
  estudante?: EstudanteResponseDTO; // pode faltar se ele não estiver mais na lista de aprovados
  modalidade?: ModalidadeAtendimento; // da consulta; se faltar, usa a do estudante
  supervisor?: string; // escondido: o backend não tem supervisor (RECURSOS.supervisor)
};

export default function StudentSummary({ nome, estudante, modalidade, supervisor }: Props) {
  const modalidadeTexto = ROTULO_MODALIDADE[modalidade ?? estudante?.modalidade ?? 'ONLINE'];

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Image
          source={
            estudante?.fotoUrl
              ? { uri: estudante.fotoUrl }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />
        <View style={styles.textos}>
          <Text style={styles.nome}>{nome}</Text>
          <VerifiedBadge />
          <Text style={styles.curso}>
            Estudante de Psicologia
            {estudante ? ` — ${estudante.periodo}º período • ${estudante.universidade}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <Ionicons name="time-outline" size={14} color={colors.primaria} />
        <Text style={styles.infoTexto}>
          {DURACAO_CONSULTA_MINUTOS} min • {modalidadeTexto} • supervisionado
        </Text>
      </View>

      {RECURSOS.supervisor && supervisor ? (
        <View style={styles.supervisao}>
          <Ionicons name="school-outline" size={14} color={colors.primaria} />
          <Text style={styles.supervisaoTexto} numberOfLines={1}>
            Supervisão: {supervisor}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
