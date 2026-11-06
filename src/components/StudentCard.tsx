import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VerifiedBadge from '@/components/VerifiedBadge';
import { Estudante } from '@/mocks/estudantes';
import { styles } from '@/styles/components/studentCard.styles';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';

type Props = {
  estudante: Estudante;
  detalhado?: boolean; // mostra mais informações (usado no Explorar)
};

export default function StudentCard({ estudante, detalhado }: Props) {
  return (
    <View style={styles.card}>
      {/* Foto, nome e selo */}
      <View style={styles.topo}>
        <Image
          source={
            estudante.foto
              ? { uri: estudante.foto }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />

        <View style={styles.textos}>
          <Text style={[styles.nome, detalhado && styles.nomeDetalhado]}>
            {estudante.nome}
          </Text>

          {detalhado ? (
            <>
              <Text style={styles.cursoDestaque}>Estudante de Psicologia</Text>
              <Text style={styles.curso}>
                {estudante.periodo} período • {estudante.abordagem}
              </Text>
              <Text style={styles.curso}>{estudante.instituicaoCompleta}</Text>
            </>
          ) : (
            <Text style={styles.curso}>
              Estudante de Psicologia — {estudante.periodo} período ({estudante.instituicao})
            </Text>
          )}
        </View>

        <VerifiedBadge />
      </View>

      {/* Temas */}
      {detalhado ? (
        <>
          <View style={styles.tags}>
            {estudante.focos.map((foco) => (
              <View key={foco} style={[styles.foco, { marginVertical: 0 }]}>
                <Text style={styles.focoTexto}>{foco}</Text>
              </View>
            ))}
          </View>

          <View style={styles.supervisor}>
            <Ionicons name="school-outline" size={14} color={colors.primaria} />
            <Text style={styles.supervisorTexto} numberOfLines={1}>
              Supervisão: {estudante.supervisor}
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.foco}>
          <Text style={styles.focoTexto}>Foco: {estudante.focos.join(' e ')}</Text>
        </View>
      )}

      {/* Horário e botão */}
      <View style={styles.rodape}>
        <View style={styles.horario}>
          <Ionicons name="time-outline" size={16} color={colors.primaria} />
          <Text style={styles.horarioTexto}>{estudante.proximoHorario}</Text>
        </View>

        <TouchableOpacity style={styles.botaoPerfil} onPress={() => router.push(`/paciente/estudante/${estudante.id}`)}>
          <Text style={styles.botaoPerfilTexto}>Ver perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}