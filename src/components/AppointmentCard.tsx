import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
import StatusTag from '@/components/StatusTag';
import type { ConsultaResponseDTO, EstudanteResponseDTO } from '@/types/api';
import {
  SituacaoConsulta,
  inicioDaConsulta,
  horaDe,
  salaDisponivel,
  podeCancelarConsulta,
} from '@/utils/consultas';
import { dataCurta, ehHoje } from '@/utils/datas';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/components/appointmentCard.styles';
import { colors } from '@/styles/colors';

type Props = {
  consulta: ConsultaResponseDTO;
  estudante?: EstudanteResponseDTO; // pode faltar se ele não estiver mais na lista de aprovados
  situacao: SituacaoConsulta;
};

export default function AppointmentCard({ consulta, estudante, situacao }: Props) {
  const inicio = inicioDaConsulta(consulta);
  const hora = horaDe(inicio);
  const hoje = ehHoje(inicio);
  const proxima = situacao === 'proxima';
  const online = consulta.modalidade === 'ONLINE';

  const textoData = hoje && proxima ? `Hoje, ${hora}` : `${dataCurta(inicio)} às ${hora}`;
  const corData = !proxima ? colors.texto : hoje ? colors.verde : colors.primaria;
  const fundoData = !proxima ? styles.pillCinza : hoje ? styles.pillVerde : styles.pillRoxo;

  const sala = salaDisponivel(consulta);

  function verDetalhes() {
    router.push(`/paciente/consulta/${consulta.id}`);
  }

  return (
    <View style={styles.card}>
      {/* Data + status do backend */}
      <View style={styles.topo}>
        <View style={[styles.pill, fundoData]}>
          <Ionicons name="calendar-outline" size={13} color={corData} />
          <Text style={[styles.pillTexto, { color: corData }]}>{textoData}</Text>
        </View>
        <StatusTag status={consulta.status} />
      </View>

      {/* Estudante */}
      <TouchableOpacity style={styles.estudante} onPress={verDetalhes} activeOpacity={0.8}>
        <Image
          source={
            estudante?.fotoUrl
              ? { uri: estudante.fotoUrl }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />
        <View style={styles.estudanteTextos}>
          <Text style={styles.nome}>{consulta.estudanteNome}</Text>
          <Text style={styles.curso}>
            {estudante
              ? `Estudante • ${estudante.periodo}º período • ${estudante.universidade}`
              : 'Estudante de Psicologia'}
          </Text>
        </View>
      </TouchableOpacity>

      {proxima ? (
        <>
          <View style={styles.infos}>
            <View style={styles.info}>
              <Ionicons
                name={online ? 'videocam-outline' : 'business-outline'}
                size={14}
                color={colors.primaria}
              />
              <Text style={styles.infoTexto}>{ROTULO_MODALIDADE[consulta.modalidade]}</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="time-outline" size={14} color={colors.primaria} />
              <Text style={styles.infoTexto}>{consulta.duracaoMinutos} min</Text>
            </View>
          </View>

          {online && (
            <AppButton
              titulo={sala ? 'Entrar na sala virtual' : 'Link da sala ainda não disponível'}
              icone="videocam-outline"
              desabilitado={!sala}
              onPress={() => consulta.linkReuniao && Linking.openURL(consulta.linkReuniao)}
            />
          )}

          <TouchableOpacity style={styles.links} onPress={verDetalhes}>
            <Text style={styles.link}>
              {podeCancelarConsulta(consulta) ? 'Ver detalhes ou cancelar' : 'Ver detalhes'}
            </Text>
          </TouchableOpacity>
        </>
      ) : estudante ? (
        <AppButton
          titulo="Agendar novamente"
          variante="secundario"
          icone="refresh"
          onPress={() => router.push(`/paciente/estudante/${estudante.id}`)}
        />
      ) : null}
    </View>
  );
}
