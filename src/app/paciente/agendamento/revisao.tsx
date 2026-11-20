import { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import StudentSummary from '@/components/StudentSummary';
import NoticeCard from '@/components/NoticeCard';
import CheckboxCard from '@/components/CheckboxCard';
import RadioOption from '@/components/RadioOption';
import AppButton from '@/components/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { mensagemDeErro } from '@/services/api';
import type { ModalidadeSessao } from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { dataHoraNoFusoBackend } from '@/utils/horarios';
import { dataDaChave, dataLonga } from '@/utils/datas';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/agendamento/revisao.styles';
import { colors } from '@/styles/colors';

const MAX_OBSERVACAO = 1000; // AgendamentoConsultaDTO.observacao

export default function RevisaoAgendamento() {
  const params = useLocalSearchParams<{
    estudanteId: string;
    data: string;
    hora: string;
    modalidades?: string; // "ONLINE" ou "ONLINE,PRESENCIAL"
  }>();
  const estudanteId = Number(params.estudanteId);
  const opcoesModalidade = (params.modalidades ?? '')
    .split(',')
    .filter((item): item is ModalidadeSessao => item === 'ONLINE' || item === 'PRESENCIAL');

  const { usuario } = useAuth();
  const { agendar } = useConsultas();
  const { buscarPorId } = useEstudantes();
  const estudante = buscarPorId(estudanteId);

  const [modalidade, setModalidade] = useState<ModalidadeSessao | null>(
    opcoesModalidade.length === 1 ? opcoesModalidade[0] : null
  );
  const [observacao, setObservacao] = useState('');
  const [ciente, setCiente] = useState(false);
  const [enviando, setEnviando] = useState(false);

  if (!estudante || !params.data || !params.hora || opcoesModalidade.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Não foi possível carregar o agendamento.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const data = params.data;
  const hora = params.hora;
  const dataTexto = dataLonga(dataDaChave(data));

  // POST /api/paciente/consultas
  async function confirmar() {
    if (!modalidade) return;
    setEnviando(true);
    try {
      const nova = await agendar({
        estudanteId,
        dataHoraInicio: dataHoraNoFusoBackend(data, hora),
        modalidade,
        observacao: observacao.trim() || null,
      });

      // Fecha o agendamento e abre a confirmação (o "voltar" não retorna para a revisão)
      if (router.canDismiss()) router.dismissAll();
      router.push({
        pathname: '/paciente/agendamento/confirmado',
        params: { consultaId: String(nova.id) },
      });
    } catch (erro) {
      // Ex.: "O estudante já possui uma consulta neste horário." (outro paciente marcou antes)
      Alert.alert('Não foi possível agendar', mensagemDeErro(erro), [
        { text: 'Escolher outro horário', onPress: () => router.back() },
        { text: 'Fechar', style: 'cancel' },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <StepHeader passoAtual={2} totalPassos={2} etiqueta="Agendamento" iconeEtiqueta="calendar" />

          <Text style={styles.titulo}>Revise seu agendamento</Text>
          <Text style={styles.subtitulo}>
            Confira se está tudo certo antes de confirmar sua consulta supervisionada.
          </Text>

          <StudentSummary
            nome={estudante.usuario.nome}
            estudante={estudante}
            modalidade={modalidade ?? undefined}
          />

          {/* Detalhes da sessão */}
          <View style={styles.cardDetalhes}>
            <View style={styles.linha}>
              <View style={styles.linhaIcone}>
                <Ionicons name="calendar-outline" size={20} color={colors.primaria} />
              </View>
              <View style={styles.linhaTextos}>
                <Text style={styles.rotulo}>Data e horário</Text>
                <Text style={styles.valor}>{dataTexto}</Text>
                <Text style={styles.detalhe}>
                  às {hora} • {DURACAO_CONSULTA_MINUTOS} minutos • horário de Brasília
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

          {/* Modalidade */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Modalidade</Text>
            {opcoesModalidade.length > 1 ? (
              <View style={styles.opcoes}>
                {opcoesModalidade.map((opcao) => (
                  <RadioOption
                    key={opcao}
                    icone={opcao === 'ONLINE' ? 'videocam-outline' : 'business-outline'}
                    texto={ROTULO_MODALIDADE[opcao]}
                    selecionado={modalidade === opcao}
                    onPress={() => setModalidade(opcao)}
                  />
                ))}
              </View>
            ) : (
              <NoticeCard
                icone={opcoesModalidade[0] === 'ONLINE' ? 'videocam-outline' : 'business-outline'}
                titulo={`Atendimento ${ROTULO_MODALIDADE[opcoesModalidade[0]].toLowerCase()}`}
                texto={
                  opcoesModalidade[0] === 'ONLINE'
                    ? 'O link da sala aparece nos detalhes da consulta quando a clínica-escola disponibilizar.'
                    : 'O local do atendimento é informado pela clínica-escola.'
                }
              />
            )}
          </View>

          {/* Observação (opcional) */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>Observação (opcional)</Text>
              <Text style={styles.contador}>
                {observacao.length}/{MAX_OBSERVACAO}
              </Text>
            </View>
            <TextInput
              style={styles.textarea}
              value={observacao}
              onChangeText={setObservacao}
              maxLength={MAX_OBSERVACAO}
              multiline
              textAlignVertical="top"
              placeholder="Se quiser, conte ao estudante o que te traz ao atendimento."
              placeholderTextColor={colors.textoClaro}
            />
          </View>

          {/* Orientações */}
          <Text style={styles.secaoTitulo}>Antes de confirmar</Text>
          <View style={styles.avisos}>
            <NoticeCard
              icone="time-outline"
              titulo="Compromisso e pontualidade"
              texto="Este horário fica reservado para você, o estudante e o docente orientador."
            />
            <NoticeCard
              icone="calendar-clear-outline"
              titulo="Cancelamento"
              texto="Você pode cancelar pelo aplicativo até o horário de início da consulta."
            />
          </View>

          <CheckboxCard marcado={ciente} onPress={() => setCiente(!ciente)}>
            Estou ciente das diretrizes éticas e de sigilo do atendimento clínico supervisionado.
          </CheckboxCard>
        </ScrollView>

        {/* Botão fixo */}
        <View style={styles.rodape}>
          <AppButton
            titulo={modalidade ? 'Confirmar agendamento' : 'Escolha a modalidade'}
            icone="checkmark-circle-outline"
            desabilitado={!ciente || !modalidade}
            carregando={enviando}
            onPress={confirmar}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
