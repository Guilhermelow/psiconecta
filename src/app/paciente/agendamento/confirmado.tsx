import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StatusHero from '@/components/StatusHero';
import NextSteps from '@/components/NextSteps';
import VerifiedBadge from '@/components/VerifiedBadge';
import AppButton from '@/components/AppButton';
import { useConsultas } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { dataDaChave, dataLonga, somarMinutos } from '@/utils/datas';
import { styles } from '@/styles/paciente/agendamento/confirmado.styles';
import { colors } from '@/styles/colors';

const PROXIMOS_PASSOS = [
  {
    titulo: 'Lembrete',
    texto: 'Você receberá um aviso no app antes da consulta começar.',
  },
  {
    titulo: 'Preparação',
    texto: 'Escolha um lugar reservado e silencioso para a sua videochamada.',
  },
  {
    titulo: 'Acesso à sala',
    texto: 'O botão para entrar na sala fica disponível na aba Agendamentos 15 minutos antes.',
  },
];

export default function AgendamentoConfirmado() {
  const { consultaId } = useLocalSearchParams<{ consultaId: string }>();
  const { consultas } = useConsultas();

  const consulta = consultas.find((item) => item.id === consultaId);
  const estudante = consulta
    ? ESTUDANTES.find((item) => item.id === consulta.estudanteId)
    : undefined;

  // Fecha a confirmação e abre uma das abas
  function irPara(rota: '/paciente/agendamentos' | '/paciente/inicio') {
    if (router.canDismiss()) router.dismissAll();
    router.navigate(rota);
  }

  if (!consulta || !estudante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Agendamento não encontrado.</Text>
          <AppButton titulo="Voltar para o início" onPress={() => irPara('/paciente/inicio')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusHero
          icone="calendar-check"
          status="Atendimento agendado"
          titulo="Agendamento confirmado!"
          subtitulo="Sua sessão está reservada. Preparamos tudo para você ter um espaço seguro e tranquilo de escuta."
        />

        {/* Comprovante */}
        <View style={styles.card}>
          <View style={styles.cardTopo}>
            <View style={styles.confirmada}>
              <View style={styles.confirmadaPonto} />
              <Text style={styles.confirmadaTexto}>Confirmada</Text>
            </View>
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
              <Text style={styles.estudanteNome}>{estudante.nome}</Text>
              <Text style={styles.estudanteCurso}>
                Estudante de Psicologia • {estudante.periodo} período
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
              <Text style={styles.valor}>{dataLonga(dataDaChave(consulta.data))}</Text>
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="time-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Horário</Text>
              <Text style={styles.valor}>
                {consulta.hora} às {somarMinutos(consulta.hora, 50)} (50 min)
              </Text>
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="videocam-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Modalidade</Text>
              <Text style={styles.valor}>Online • Sala segura Psiconecta</Text>
            </View>
          </View>
        </View>

        {/* Próximos passos */}
        <Text style={styles.secaoTitulo}>Próximos passos</Text>
        <NextSteps passos={PROXIMOS_PASSOS} />

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