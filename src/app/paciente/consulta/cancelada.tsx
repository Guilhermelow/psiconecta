import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StatusHero from '@/components/StatusHero';
import NoticeCard from '@/components/NoticeCard';
import AppButton from '@/components/AppButton';
import { useConsultas } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { dataDaChave, dataLonga } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/paciente/consulta/cancelada.styles';
import { colors } from '@/styles/colors';

export default function ConsultaCancelada() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { consultas } = useConsultas();

  const consulta = consultas.find((item) => item.id === id);
  const estudante = consulta
    ? ESTUDANTES.find((item) => item.id === consulta.estudanteId)
    : undefined;

  function voltarAoInicio() {
    if (router.canDismiss()) router.dismissAll();
    router.navigate('/paciente/inicio');
  }

  if (!consulta || !estudante || consulta.status !== 'cancelada') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Cancelamento não encontrado.</Text>
          <AppButton titulo="Voltar para o início" onPress={voltarAoInicio} />
        </View>
      </SafeAreaView>
    );
  }

  const estudanteId = estudante.id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusHero
          icone="calendar-remove-outline"
          status="Horário liberado"
          titulo="Consulta cancelada"
          subtitulo={`${primeiroNome(estudante.nome)} receberá um aviso. Esperamos que esteja tudo bem com você!`}
        />

        {/* Comprovante do cancelamento */}
        <View style={styles.card}>
          <View style={styles.cardTopo}>
            <Text style={styles.rotulo}>Protocolo</Text>
            <Text style={styles.protocolo}>#{consulta.protocolo}</Text>
          </View>

          <View style={styles.estudante}>
            <Image
              source={
                estudante.foto
                  ? { uri: estudante.foto }
                  : require('../../../../assets/avatar-padrao.png')
              }
              style={styles.foto}
            />
            <View style={styles.estudanteTextos}>
              <Text style={styles.estudanteRotulo}>Estudante sob supervisão</Text>
              <Text style={styles.nome}>{estudante.nome}</Text>
            </View>
            <View style={styles.instituicao}>
              <Text style={styles.instituicaoTexto}>{estudante.instituicao}</Text>
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.linhaRotulo}>Data da consulta</Text>
              <Text style={styles.valor}>
                {dataLonga(dataDaChave(consulta.data))} às {consulta.hora}
              </Text>
            </View>
          </View>

          {consulta.motivoCancelamento ? (
            <View style={styles.linha}>
              <View style={styles.linhaIcone}>
                <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primaria} />
              </View>
              <View style={styles.linhaTextos}>
                <Text style={styles.linhaRotulo}>Motivo</Text>
                <Text style={styles.valor}>{consulta.motivoCancelamento}</Text>
              </View>
            </View>
          ) : null}
        </View>

        <NoticeCard
          icone="leaf-outline"
          texto="Sentir-se bem é um processo. Quando quiser retomar, novos horários estarão sempre disponíveis."
        />

        <View style={styles.botoes}>
          <AppButton
            titulo="Agendar novo horário"
            icone="calendar-outline"
            onPress={() =>
              router.push({
                pathname: '/paciente/agendamento/[id]',
                params: { id: estudanteId },
              })
            }
          />
          <AppButton
            titulo="Voltar para o início"
            variante="secundario"
            icone="home-outline"
            onPress={voltarAoInicio}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}