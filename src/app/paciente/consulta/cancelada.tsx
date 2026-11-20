import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StatusHero from '@/components/StatusHero';
import NoticeCard from '@/components/NoticeCard';
import StatusTag from '@/components/StatusTag';
import AppButton from '@/components/AppButton';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { inicioDaConsulta, horaDe } from '@/utils/consultas';
import { dataLonga } from '@/utils/datas';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/consulta/cancelada.styles';
import { colors } from '@/styles/colors';

export default function ConsultaCancelada() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { consultas } = useConsultas();
  const { buscarPorId } = useEstudantes();

  const consulta = consultas.find((item) => item.id === Number(id));

  function voltarAoInicio() {
    if (router.canDismiss()) router.dismissAll();
    router.navigate('/paciente/inicio');
  }

  if (!consulta || consulta.status !== 'CANCELADA') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Cancelamento não encontrado.</Text>
          <AppButton titulo="Voltar para o início" onPress={voltarAoInicio} />
        </View>
      </SafeAreaView>
    );
  }

  const estudante = buscarPorId(consulta.estudanteId);
  const inicio = inicioDaConsulta(consulta);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusHero
          icone="calendar-remove-outline"
          status="Horário liberado"
          titulo="Consulta cancelada"
          subtitulo="O horário foi liberado. Esperamos que esteja tudo bem com você!"
        />

        {/* Resumo do cancelamento */}
        <View style={styles.card}>
          <View style={styles.cardTopo}>
            <Text style={styles.rotulo}>Situação</Text>
            <StatusTag status={consulta.status} />
          </View>

          <View style={styles.estudante}>
            <Image
              source={
                estudante?.fotoUrl
                  ? { uri: estudante.fotoUrl }
                  : require('../../../../assets/avatar-padrao.png')
              }
              style={styles.foto}
            />
            <View style={styles.estudanteTextos}>
              <Text style={styles.estudanteRotulo}>Estudante sob supervisão</Text>
              <Text style={styles.nome}>{consulta.estudanteNome}</Text>
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.linhaRotulo}>Data da consulta</Text>
              <Text style={styles.valor}>
                {dataLonga(inicio)} às {horaDe(inicio)}
              </Text>
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons
                name={consulta.modalidade === 'PRESENCIAL' ? 'business-outline' : 'videocam-outline'}
                size={18}
                color={colors.primaria}
              />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.linhaRotulo}>Modalidade</Text>
              <Text style={styles.valor}>{ROTULO_MODALIDADE[consulta.modalidade]}</Text>
            </View>
          </View>
        </View>

        <NoticeCard
          icone="leaf-outline"
          texto="Sentir-se bem é um processo. Quando quiser retomar, novos horários estarão disponíveis."
        />

        <View style={styles.botoes}>
          {estudante ? (
            <AppButton
              titulo="Agendar novo horário"
              icone="calendar-outline"
              onPress={() =>
                router.push({
                  pathname: '/paciente/agendamento/[id]',
                  params: { id: String(estudante.id) },
                })
              }
            />
          ) : null}
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
