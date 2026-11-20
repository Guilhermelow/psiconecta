import { useState } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import StatusTag from '@/components/StatusTag';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { mensagemDeErro } from '@/services/api';
import { RECURSOS, SUPERVISOR_EXEMPLO } from '@/config/recursos';
import { fimDaConsulta, horaDe, inicioDaConsulta, salaDisponivel } from '@/utils/consultas';
import { podeConcluir, podeIniciar, podeMarcarFalta, precisaRegistro } from '@/utils/atendimentos';
import { dataLonga, ehHoje } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/estudante/atendimento/detalhes.styles';
import { colors } from '@/styles/colors';

type Acao = 'iniciar' | 'concluir' | 'falta';

// Textos da confirmação de cada ação que não tem volta
const CONFIRMACAO: Record<Exclude<Acao, 'iniciar'>, { titulo: string; texto: string; botao: string }> = {
  concluir: {
    titulo: 'Concluir o atendimento?',
    texto: 'O atendimento fica registrado como concluído. Isso não pode ser desfeito pelo app.',
    botao: 'Concluir',
  },
  falta: {
    titulo: 'O paciente não compareceu?',
    texto: 'O atendimento fica registrado como falta do paciente. Isso não pode ser desfeito pelo app.',
    botao: 'Registrar falta',
  },
};

// O que aparece no lugar das ações quando não há nada a fazer
const NOTA_FINAL: Partial<Record<string, string>> = {
  CONCLUIDA: 'Atendimento concluído.',
  NAO_COMPARECEU: 'Registrado: o paciente não compareceu.',
  CANCELADA: 'O paciente cancelou esta consulta. O horário ficou livre na sua agenda.',
  PENDENTE: 'Aguardando confirmação.',
};

export default function DetalhesAtendimento() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { consultas, iniciar, concluir, marcarNaoCompareceu } = useAtendimentos();
  const [confirmando, setConfirmando] = useState<Exclude<Acao, 'iniciar'> | null>(null);
  const [enviando, setEnviando] = useState<Acao | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const consulta = consultas.find((item) => item.id === Number(id));

  if (!consulta) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Detalhes do atendimento" />
          <Text style={styles.texto}>Atendimento não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const consultaId = consulta.id;
  const nome = primeiroNome(consulta.pacienteNome);
  const agora = new Date();
  const inicio = inicioDaConsulta(consulta);
  const fim = fimDaConsulta(consulta);
  const online = consulta.modalidade === 'ONLINE';
  const ativa = consulta.status === 'CONFIRMADA' || consulta.status === 'EM_ANDAMENTO';
  const aguardandoHorario = consulta.status === 'CONFIRMADA' && !podeIniciar(consulta, agora);

  async function executar(acao: Acao) {
    setEnviando(acao);
    setErro(null);
    try {
      if (acao === 'iniciar') await iniciar(consultaId);
      if (acao === 'concluir') await concluir(consultaId);
      if (acao === 'falta') await marcarNaoCompareceu(consultaId);
      setConfirmando(null);
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setEnviando(null);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Detalhes do atendimento" />

        {/* Status do backend */}
        <View style={styles.topo}>
          <StatusTag status={consulta.status} />
          {/* Escondido: o backend não tem supervisor (src/config/recursos.ts) */}
          {RECURSOS.supervisor && (
            <View style={styles.supervisionado}>
              <Ionicons name="shield-checkmark-outline" size={14} color={colors.primaria} />
              <Text style={styles.supervisionadoTexto}>Supervisionado</Text>
            </View>
          )}
        </View>

        {/* Paciente e horário */}
        <View style={styles.card}>
          <View style={styles.paciente}>
            <Image source={require('../../../../assets/avatar-padrao.png')} style={styles.foto} />
            <View style={styles.pacienteTextos}>
              <Text style={styles.pacienteNome}>{consulta.pacienteNome}</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <View style={styles.linhaIcone}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.linhaTextos}>
              <Text style={styles.rotulo}>Data e horário</Text>
              <Text style={styles.valor}>{ehHoje(inicio) ? 'Hoje' : dataLonga(inicio)}</Text>
              <Text style={styles.detalhe}>
                {horaDe(inicio)} às {horaDe(fim)} ({consulta.duracaoMinutos} min)
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

        {/* Sala online: depende do linkReuniao, que o backend ainda não preenche */}
        {online && ativa && !precisaRegistro(consulta, agora) && (
          <View style={styles.sala}>
            <Text style={styles.salaTitulo}>Sala do atendimento</Text>
            <Text style={styles.salaTexto}>
              {!consulta.linkReuniao
                ? 'O link da sala ainda não foi disponibilizado para esta consulta.'
                : salaDisponivel(consulta, agora)
                  ? `A sala está aberta. ${nome} pode entrar a qualquer momento.`
                  : 'A sala abre 15 minutos antes do horário.'}
            </Text>
            <AppButton
              titulo="Entrar na sala virtual"
              icone="videocam-outline"
              desabilitado={!salaDisponivel(consulta, agora)}
              onPress={() => consulta.linkReuniao && Linking.openURL(consulta.linkReuniao)}
            />
          </View>
        )}

        {/* Observação escrita pelo paciente no agendamento */}
        {consulta.observacao ? (
          <View style={styles.card}>
            <View style={styles.cardTitulo}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primaria} />
              <Text style={styles.cardTituloTexto}>Observação do paciente</Text>
            </View>
            <Text style={styles.observacao}>“{consulta.observacao}”</Text>
          </View>
        ) : null}

        {/* Escondido: o backend não tem supervisor (src/config/recursos.ts) */}
        {RECURSOS.supervisor && (
          <View style={styles.card}>
            <View style={styles.cardTitulo}>
              <Ionicons name="school-outline" size={18} color={colors.primaria} />
              <Text style={styles.cardTituloTexto}>Supervisão</Text>
            </View>
            <View style={styles.supervisor}>
              <Ionicons name="person-outline" size={16} color={colors.primaria} />
              <Text style={styles.supervisorTexto}>{SUPERVISOR_EXEMPLO}</Text>
            </View>
          </View>
        )}

        {/* Registro do atendimento */}
        <View style={styles.acoes}>
          <Text style={styles.acoesTitulo}>Registro do atendimento</Text>

          {confirmando ? (
            <>
              <Text style={styles.confirmacaoTitulo}>{CONFIRMACAO[confirmando].titulo}</Text>
              <Text style={styles.aviso}>{CONFIRMACAO[confirmando].texto}</Text>
              <View style={styles.botoes}>
                <View style={styles.botao}>
                  <AppButton
                    titulo="Voltar"
                    variante="secundario"
                    desabilitado={!!enviando}
                    onPress={() => setConfirmando(null)}
                  />
                </View>
                <View style={styles.botao}>
                  <AppButton
                    titulo={CONFIRMACAO[confirmando].botao}
                    variante={confirmando === 'falta' ? 'perigo' : 'primario'}
                    carregando={enviando === confirmando}
                    onPress={() => executar(confirmando)}
                  />
                </View>
              </View>
            </>
          ) : podeConcluir(consulta) ? (
            <>
              <Text style={styles.aviso}>
                {precisaRegistro(consulta, agora)
                  ? 'O horário já terminou. Conclua para fechar o registro.'
                  : 'Atendimento em andamento. Conclua ao terminar a sessão.'}
              </Text>
              <AppButton
                titulo="Concluir atendimento"
                icone="checkmark-done-outline"
                onPress={() => setConfirmando('concluir')}
              />
            </>
          ) : podeIniciar(consulta, agora) ? (
            <>
              <Text style={styles.aviso}>
                {precisaRegistro(consulta, agora)
                  ? 'O horário já terminou e nada foi registrado. O atendimento aconteceu?'
                  : `Quando ${nome} chegar, inicie o atendimento.`}
              </Text>
              <AppButton
                titulo="Iniciar atendimento"
                icone="play-outline"
                carregando={enviando === 'iniciar'}
                onPress={() => executar('iniciar')}
              />
              {podeMarcarFalta(consulta, agora) && (
                <AppButton
                  titulo="Paciente não compareceu"
                  variante="secundario"
                  icone="person-remove-outline"
                  desabilitado={!!enviando}
                  onPress={() => setConfirmando('falta')}
                />
              )}
            </>
          ) : aguardandoHorario ? (
            <>
              <Text style={styles.aviso}>
                Você poderá iniciar o atendimento ou registrar a falta a partir das {horaDe(inicio)}
                {ehHoje(inicio) ? '' : ` de ${dataLonga(inicio).toLowerCase()}`}.
              </Text>
              <AppButton titulo="Iniciar atendimento" icone="play-outline" desabilitado onPress={() => {}} />
            </>
          ) : (
            <Text style={styles.aviso}>{NOTA_FINAL[consulta.status]}</Text>
          )}

          {erro && <Text style={styles.erro}>{erro}</Text>}
        </View>

        {ativa && (
          <Text style={styles.nota}>
            Só o paciente pode cancelar a consulta. Se precisar desmarcar, fale com a clínica-escola.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
