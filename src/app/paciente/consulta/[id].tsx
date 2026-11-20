import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import StudentSummary from '@/components/StudentSummary';
import StatusTag from '@/components/StatusTag';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import {
  situacaoDaConsulta,
  salaDisponivel,
  podeCancelarConsulta,
  inicioDaConsulta,
  fimDaConsulta,
  horaDe,
} from '@/utils/consultas';
import { dataLonga } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/consulta/detalhes.styles';
import { colors } from '@/styles/colors';

const ORIENTACOES_ONLINE = [
  { icone: 'headset-outline', texto: 'Use fones de ouvido' },
  { icone: 'home-outline', texto: 'Escolha um ambiente privativo e silencioso' },
  { icone: 'shield-checkmark-outline', texto: 'Sessão protegida por sigilo ético' },
] as const;

const ORIENTACOES_PRESENCIAL = [
  { icone: 'time-outline', texto: 'Chegue com alguns minutos de antecedência' },
  { icone: 'business-outline', texto: 'O local é informado pela clínica-escola' },
  { icone: 'shield-checkmark-outline', texto: 'Sessão protegida por sigilo ético' },
] as const;

export default function DetalhesConsulta() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { consultas, carregando } = useConsultas();
  const { buscarPorId } = useEstudantes();

  const consulta = consultas.find((item) => item.id === Number(id));

  if (!consulta) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Detalhes da consulta" />
          <Text style={styles.texto}>{carregando ? 'Carregando...' : 'Consulta não encontrada.'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const estudante = buscarPorId(consulta.estudanteId);
  const inicio = inicioDaConsulta(consulta);
  const proxima = situacaoDaConsulta(consulta) === 'proxima';
  const online = consulta.modalidade === 'ONLINE';
  const sala = salaDisponivel(consulta);
  const cancelavel = podeCancelarConsulta(consulta);
  const orientacoes = online ? ORIENTACOES_ONLINE : ORIENTACOES_PRESENCIAL;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Detalhes da consulta" />

        {/* Status do backend */}
        <View style={styles.topo}>
          <StatusTag status={consulta.status} />
        </View>

        <StudentSummary
          nome={consulta.estudanteNome}
          estudante={estudante}
          modalidade={consulta.modalidade}
        />

        {/* Data, modalidade e observação */}
        <View style={styles.card}>
          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Data e horário</Text>
              <Text style={styles.valor}>{dataLonga(inicio)}</Text>
              <Text style={styles.texto}>
                {horaDe(inicio)} às {horaDe(fimDaConsulta(consulta))} ({consulta.duracaoMinutos} min)
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons
                name={online ? 'videocam-outline' : 'business-outline'}
                size={18}
                color={colors.primaria}
              />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Modalidade</Text>
              <Text style={styles.valor}>{ROTULO_MODALIDADE[consulta.modalidade]}</Text>
            </View>
          </View>

          {consulta.observacao ? (
            <>
              <View style={styles.divisor} />
              <View style={styles.linha}>
                <View style={styles.linhaIcone}>
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primaria} />
                </View>
                <View style={styles.linhaTextos}>
                  <Text style={styles.rotulo}>Sua observação</Text>
                  <Text style={styles.texto}>{consulta.observacao}</Text>
                </View>
              </View>
            </>
          ) : null}
        </View>

        {/* Sala (só consultas online futuras) */}
        {proxima && online && (
          <View style={styles.sala}>
            <Text style={styles.salaTitulo}>
              {sala ? 'A sala está aberta!' : 'Sala do atendimento online'}
            </Text>
            <View style={styles.salaTextoLinha}>
              <Ionicons name="time-outline" size={14} color={colors.texto} />
              <Text style={styles.salaTexto}>
                {sala
                  ? `${primeiroNome(consulta.estudanteNome)} vai te receber em instantes.`
                  : consulta.linkReuniao
                  ? `A sala abre 15 minutos antes, às ${horaDe(new Date(inicio.getTime() - 15 * 60000))}.`
                  : 'O link da sala ainda não foi disponibilizado pela clínica-escola.'}
              </Text>
            </View>
            <AppButton
              titulo="Entrar na sala virtual"
              icone="videocam-outline"
              desabilitado={!sala}
              onPress={() => consulta.linkReuniao && Linking.openURL(consulta.linkReuniao)}
            />
          </View>
        )}

        {/* Orientações */}
        {proxima && (
          <View style={styles.card}>
            <Text style={styles.rotulo}>Orientações rápidas</Text>
            {orientacoes.map((item) => (
              <View key={item.texto} style={styles.orientacao}>
                <View style={styles.linhaIcone}>
                  <Ionicons name={item.icone} size={18} color={colors.primaria} />
                </View>
                <Text style={styles.orientacaoTexto}>{item.texto}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Ações */}
        <View style={styles.acoes}>
          {cancelavel ? (
            <>
              <TouchableOpacity
                style={styles.cancelarLink}
                onPress={() =>
                  router.push({
                    pathname: '/paciente/consulta/cancelar',
                    params: { id: String(consulta.id) },
                  })
                }
              >
                <Ionicons name="close-circle-outline" size={18} color={colors.erro} />
                <Text style={styles.cancelarTexto}>Cancelar consulta</Text>
              </TouchableOpacity>
              <Text style={styles.nota}>
                Você pode cancelar até o horário de início. Para mudar o horário, cancele e agende
                outro.
              </Text>
            </>
          ) : proxima ? (
            <Text style={styles.nota}>Esta consulta já começou e não pode mais ser cancelada.</Text>
          ) : estudante ? (
            <AppButton
              titulo="Agendar novamente"
              variante="secundario"
              icone="refresh"
              onPress={() => router.push(`/paciente/estudante/${estudante.id}`)}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
