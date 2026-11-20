import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StatusHero from '@/components/StatusHero';
import NextSteps from '@/components/NextSteps';
import VerifiedBadge from '@/components/VerifiedBadge';
import StatusTag from '@/components/StatusTag';
import AppButton from '@/components/AppButton';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { inicioDaConsulta, fimDaConsulta, horaDe } from '@/utils/consultas';
import { dataLonga } from '@/utils/datas';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/agendamento/confirmado.styles';
import { colors } from '@/styles/colors';

const PASSOS_ONLINE = [
  {
    titulo: 'Preparação',
    texto: 'Escolha um lugar reservado e silencioso para a sua videochamada.',
  },
  {
    titulo: 'Acesso à sala',
    texto: 'O link da sala aparece nos detalhes da consulta quando a clínica-escola disponibilizar.',
  },
];

const PASSOS_PRESENCIAL = [
  {
    titulo: 'Local',
    texto: 'O endereço do atendimento é informado pela clínica-escola.',
  },
  {
    titulo: 'Pontualidade',
    texto: 'Chegue com alguns minutos de antecedência.',
  },
];

export default function AgendamentoConfirmado() {
  const { consultaId } = useLocalSearchParams<{ consultaId: string }>();
  const { consultas } = useConsultas();
  const { buscarPorId } = useEstudantes();

  const consulta = consultas.find((item) => item.id === Number(consultaId));
  const estudante = consulta ? buscarPorId(consulta.estudanteId) : undefined;

  // Fecha a confirmação e abre uma das abas
  function irPara(rota: '/paciente/agendamentos' | '/paciente/inicio') {
    if (router.canDismiss()) router.dismissAll();
    router.navigate(rota);
  }

  if (!consulta) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Agendamento não encontrado.</Text>
          <AppButton titulo="Voltar para o início" onPress={() => irPara('/paciente/inicio')} />
        </View>
      </SafeAreaView>
    );
  }

  const inicio = inicioDaConsulta(consulta);
  const online = consulta.modalidade === 'ONLINE';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusHero
          icone="calendar-check"
          status="Atendimento agendado"
          titulo="Agendamento confirmado!"
          subtitulo="Sua sessão está reservada. Preparamos tudo para você ter um espaço seguro e tranquilo de escuta."
        />

        {/* Resumo */}
        <View style={styles.card}>
          <View style={styles.cardTopo}>
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
              <Text style={styles.estudanteNome}>{consulta.estudanteNome}</Text>
              <Text style={styles.estudanteCurso}>
                Estudante de Psicologia{estudante ? ` • ${estudante.periodo}º período` : ''}
              </Text>
            </View>
            <VerifiedBadge />
          </View>

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Data</Text>
              <Text style={styles.valor}>{dataLonga(inicio)}</Text>
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="time-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Horário</Text>
              <Text style={styles.valor}>
                {horaDe(inicio)} às {horaDe(fimDaConsulta(consulta))} ({consulta.duracaoMinutos} min)
              </Text>
            </View>
          </View>

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
        </View>

        {/* Próximos passos */}
        <Text style={styles.secaoTitulo}>Próximos passos</Text>
        <NextSteps passos={online ? PASSOS_ONLINE : PASSOS_PRESENCIAL} />

        {/* Botões */}
        <View style={styles.botoes}>
          <AppButton
            titulo="Ver meus agendamentos"
            icone="calendar-outline"
            onPress={() => irPara('/paciente/agendamentos')}
          />
          <AppButton
            titulo="Voltar para o início"
            variante="secundario"
            icone="home-outline"
            onPress={() => irPara('/paciente/inicio')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
