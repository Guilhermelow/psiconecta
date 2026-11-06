import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import StudentSummary from '@/components/StudentSummary';
import NoticeCard from '@/components/NoticeCard';
import CheckboxCard from '@/components/CheckboxCard';
import AppButton from '@/components/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { useConsultas } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { dataDaChave, dataLonga } from '@/utils/datas';
import { styles } from '@/styles/paciente/agendamento/revisao.styles';
import { colors } from '@/styles/colors';

export default function RevisaoAgendamento() {
  const { estudanteId, data, hora, reagendarId } = useLocalSearchParams<{
    estudanteId: string;
    data: string;
    hora: string;
    reagendarId?: string;
  }>();
  const estudante = ESTUDANTES.find((item) => item.id === estudanteId);

  const { usuario } = useAuth();
  const { consultas, agendar, cancelar } = useConsultas();
  const [ciente, setCiente] = useState(false);

  if (!estudante || !data || !hora) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Não foi possível carregar o agendamento.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const dataTexto = dataLonga(dataDaChave(data));

  function confirmar() {
    // Evita marcar o mesmo horário duas vezes
    const jaExiste = consultas.some(
      (consulta) =>
        consulta.status === 'agendada' &&
        consulta.estudanteId === estudanteId &&
        consulta.data === data &&
        consulta.hora === hora
    );
    if (jaExiste) {
      Alert.alert('Horário já agendado', 'Você já tem uma consulta marcada neste horário.');
      return;
    }

    // Depois isso também vai para o servidor
    const nova = agendar({ estudanteId, data, hora });
    
    if (reagendarId) cancelar(reagendarId, 'Reagendada para outro horário');

    // Fecha o agendamento e abre a confirmação
    // (assim o "voltar" não retorna para a revisão)
    if (router.canDismiss()) router.dismissAll();
    router.push({
      pathname: '/paciente/agendamento/confirmado',
      params: { consultaId: nova.id },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StepHeader
          passoAtual={2}
          totalPassos={2}
          etiqueta="Agendamento"
          iconeEtiqueta="calendar"
        />

        <Text style={styles.titulo}>Revise seu agendamento</Text>
        <Text style={styles.subtitulo}>
          Confira se está tudo certo antes de confirmar sua consulta supervisionada.
        </Text>

        <StudentSummary estudante={estudante} />

        {/* Detalhes da sessão */}
        <View style={styles.cardDetalhes}>
          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="calendar-outline" size={20} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Data e horário</Text>
              <Text style={styles.valor}>{dataTexto}</Text>
              <Text style={styles.detalhe}>às {hora} • 50 minutos • Horário de Brasília</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="videocam-outline" size={20} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Modalidade</Text>
              <Text style={styles.valor}>Atendimento online supervisionado</Text>
              <Text style={styles.detalhe}>
                O link da sala segura chega no app e por e-mail 15 minutos antes.
              </Text>
            </View>
          </View>

          {usuario?.nome ? (
            <>
              <View style={styles.divisor} />
              <View style={styles.linha}>
                <View style={styles.linhaIcone}>
                  <Ionicons name="person-outline" size={20} color={colors.primaria} />
                </View>
                <View style={styles.linhaTextos}>
                  <Text style={styles.rotulo}>Paciente</Text>
                  <Text style={styles.valor}>{usuario.nome}</Text>
                </View>
              </View>
            </>
          ) : null}
        </View>

        {/* Orientações */}
        <Text style={styles.secaoTitulo}>Antes de confirmar</Text>
        <View style={styles.avisos}>
          {reagendarId ? (
            <NoticeCard
              icone="swap-horizontal-outline"
              titulo="Reagendamento"
              texto="Ao confirmar, sua consulta anterior será cancelada automaticamente."
            />
          ) : null}
          <NoticeCard
            icone="time-outline"
            titulo="Compromisso e pontualidade"
            texto="Este horário fica reservado exclusivamente para você, o estudante e o docente orientador."
          />
          <NoticeCard
            icone="calendar-clear-outline"
            titulo="Política de cancelamento"
            texto="Você pode cancelar sem prejuízo até 4 horas antes, pelo próprio aplicativo."
          />
        </View>

        <CheckboxCard marcado={ciente} onPress={() => setCiente(!ciente)}>
          Estou ciente das diretrizes éticas e de sigilo do atendimento clínico supervisionado.
        </CheckboxCard>
      </ScrollView>

      {/* Botão fixo */}
      <View style={styles.rodape}>
        <AppButton
          titulo="Confirmar agendamento"
          icone="checkmark-circle-outline"
          desabilitado={!ciente}
          onPress={confirmar}
        />
      </View>
    </SafeAreaView>
  );
}