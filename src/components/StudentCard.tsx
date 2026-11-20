import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import VerifiedBadge from '@/components/VerifiedBadge';
import { RECURSOS } from '@/config/recursos';
import type { EstudanteResponseDTO } from '@/types/api';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/components/studentCard.styles';
import { colors } from '@/styles/colors';

type Props = {
  estudante: EstudanteResponseDTO;
  detalhado?: boolean; // mostra mais informações (usado no Explorar)
  supervisor?: string; // escondido: o backend não tem supervisor (RECURSOS.supervisor)
};

export default function StudentCard({ estudante, detalhado, supervisor }: Props) {
  const areas = estudante.areasAtendimento.map((area) => area.nome);

  return (
    <View style={styles.card}>
      {/* Foto, nome e selo */}
      <View style={styles.topo}>
        <Image
          source={
            estudante.fotoUrl
              ? { uri: estudante.fotoUrl }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />

        <View style={styles.textos}>
          <Text style={[styles.nome, detalhado && styles.nomeDetalhado]}>
            {estudante.usuario.nome}
          </Text>

          {detalhado ? (
            <>
              <Text style={styles.cursoDestaque}>Estudante de Psicologia</Text>
              <Text style={styles.curso}>{estudante.periodo}º período</Text>
              <Text style={styles.curso}>{estudante.universidade}</Text>
            </>
          ) : (
            <Text style={styles.curso}>
              Estudante de Psicologia — {estudante.periodo}º período ({estudante.universidade})
            </Text>
          )}
        </View>

        <VerifiedBadge />
      </View>

      {/* Áreas de atendimento */}
      {detalhado ? (
        <>
          <View style={styles.tags}>
            {areas.map((area) => (
              <View key={area} style={[styles.foco, { marginVertical: 0 }]}>
                <Text style={styles.focoTexto}>{area}</Text>
              </View>
            ))}
          </View>

          {RECURSOS.supervisor && supervisor ? (
            <View style={styles.supervisor}>
              <Ionicons name="school-outline" size={14} color={colors.primaria} />
              <Text style={styles.supervisorTexto} numberOfLines={1}>
                Supervisão: {supervisor}
              </Text>
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.foco}>
          <Text style={styles.focoTexto} numberOfLines={1}>
            Áreas: {areas.join(', ')}
          </Text>
        </View>
      )}

      {/* Modalidade e botão */}
      <View style={styles.rodape}>
        <View style={styles.horario}>
          <Ionicons
            name={estudante.modalidade === 'PRESENCIAL' ? 'business-outline' : 'videocam-outline'}
            size={16}
            color={colors.primaria}
          />
          <Text style={styles.horarioTexto}>{ROTULO_MODALIDADE[estudante.modalidade]}</Text>
        </View>

        <TouchableOpacity
          style={styles.botaoPerfil}
          onPress={() => router.push(`/paciente/estudante/${estudante.id}`)}
        >
          <Text style={styles.botaoPerfilTexto}>Ver perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
