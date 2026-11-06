import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
import type { Consulta } from '@/contexts/ConsultasContext';
import type { Estudante } from '@/mocks/estudantes';
import { SituacaoConsulta, salaAberta, DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, dataCurta, ehHoje } from '@/utils/datas';
import { styles } from '@/styles/components/appointmentCard.styles';
import { colors } from '@/styles/colors';

type Props = {
  consulta: Consulta;
  estudante: Estudante;
  situacao: SituacaoConsulta;
};

export default function AppointmentCard({ consulta, estudante, situacao }: Props) {
  const inicio = dataEHora(consulta.data, consulta.hora);
  const hoje = ehHoje(inicio);
  const proxima = situacao === 'proxima';

  const textoData =
    hoje && proxima ? `Hoje, ${consulta.hora}` : `${dataCurta(inicio)} às ${consulta.hora}`;

  const corData = !proxima ? colors.texto : hoje ? colors.verde : colors.primaria;
  const fundoData = !proxima ? styles.pillCinza : hoje ? styles.pillVerde : styles.pillRoxo;

  const aberta = salaAberta(consulta);

  function verDetalhes() {
    router.push(`/paciente/consulta/${consulta.id}`);
  }

  return (
    <View style={styles.card}>
      {/* Data + situação */}
      <View style={styles.topo}>
        <View style={[styles.pill, fundoData]}>
          <Ionicons name="calendar-outline" size={13} color={corData} />
          <Text style={[styles.pillTexto, { color: corData }]}>{textoData}</Text>
        </View>

        {situacao === 'concluida' && (
          <View style={[styles.tag, styles.tagVerde]}>
            <Text style={[styles.tagTexto, { color: colors.verde }]}>Concluída</Text>
          </View>
        )}
        {situacao === 'cancelada' && (
          <View style={[styles.tag, styles.tagVermelha]}>
            <Text style={[styles.tagTexto, { color: colors.erro }]}>Cancelada</Text>
          </View>
        )}
      </View>

      {/* Estudante */}
      <View style={styles.estudante}>
        <Image
          source={
            estudante.foto
              ? { uri: estudante.foto }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />
        <View style={styles.estudanteTextos}>
          <Text style={styles.nome}>{estudante.nome}</Text>
          <Text style={styles.curso}>
            Estudante • {estudante.periodo} período • {estudante.instituicao}
          </Text>
        </View>
      </View>

      {proxima ? (
        <>
          <View style={styles.infos}>
            <View style={styles.info}>
              <Ionicons name="videocam-outline" size={14} color={colors.primaria} />
              <Text style={styles.infoTexto}>Online</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="time-outline" size={14} color={colors.primaria} />
              <Text style={styles.infoTexto}>{DURACAO_MINUTOS} min</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="lock-closed-outline" size={14} color={colors.primaria} />
              <Text style={styles.infoTexto}>Sala segura</Text>
            </View>
          </View>

          <AppButton
            titulo={aberta ? 'Entrar na sala virtual' : 'Sala abre 15 min antes'}
            icone="videocam-outline"
            desabilitado={!aberta}
            onPress={() => Alert.alert('Em breve', 'Sala de atendimento online.')}
          />

          <TouchableOpacity style={styles.links} onPress={verDetalhes}>
            <Text style={styles.link}>Ver detalhes, reagendar ou cancelar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <AppButton
          titulo="Agendar novamente"
          variante="secundario"
          icone="refresh"
          onPress={() => router.push(`/paciente/estudante/${estudante.id}`)}
        />
      )}
    </View>
  );
}