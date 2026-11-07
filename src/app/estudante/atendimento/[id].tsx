import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import RadioOption from '@/components/RadioOption';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { SUPERVISOR_EXEMPLO } from '@/mocks/atendimentos';
import { salaAberta, podeCancelar, DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, dataLonga, ehHoje, somarMinutos } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/estudante/atendimento/detalhes.styles';
import { colors } from '@/styles/colors';

const MOTIVOS_CANCELAMENTO = [
  { icone: 'medkit-outline', texto: 'Imprevisto pessoal ou de saúde' },
  { icone: 'school-outline', texto: 'Conflito com atividade acadêmica' },
  { icone: 'people-outline', texto: 'Orientação da supervisão' },
  { icone: 'ellipsis-horizontal', texto: 'Outro motivo' },
] as const;

export default function DetalhesAtendimento() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { atendimentos, cancelarAtendimento } = useAtendimentos();
  const [cancelando, setCancelando] = useState(false);
  const [motivo, setMotivo] = useState<string | null>(null);

  const atendimento = atendimentos.find((item) => item.id === id);

  if (!atendimento) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Detalhes do atendimento" />
          <Text style={styles.texto}>Atendimento não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const atendimentoId = atendimento.id;
  const nome = primeiroNome(atendimento.pacienteNome);

  const inicio = dataEHora(atendimento.data, atendimento.hora);
  const concluido = inicio.getTime() + DURACAO_MINUTOS * 60 * 1000 < Date.now();
  const aberta = salaAberta(atendimento);
  const cancelavel = !concluido && podeCancelar(atendimento);

  const contato = atendimento.contatoEmergencia;

  function confirmarCancelamento() {
    if (!motivo) return;
    cancelarAtendimento(atendimentoId, motivo);
    router.back();
  }

  function voltar() {
    setCancelando(false);
    setMotivo(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Detalhes do atendimento" />

        {/* Status */}
        <View style={styles.topo}>
          <View style={[styles.status, concluido ? styles.statusCinza : styles.statusVerde]}>
            <View
              style={[
                styles.statusPonto,
                { backgroundColor: concluido ? colors.texto : colors.verde },
              ]}
            />
            <Text style={[styles.statusTexto, { color: concluido ? colors.texto : colors.verde }]}>
              {concluido ? 'Concluído' : 'Confirmado'}
            </Text>
          </View>
          <View style={styles.supervisionado}>
            <Ionicons name="shield-checkmark-outline" size={14} color={colors.primaria} />
            <Text style={styles.supervisionadoTexto}>Supervisionado</Text>
          </View>
        </View>

        {/* Paciente e horário */}
        <View style={styles.card}>
          <View style={styles.paciente}>
            <Image
              source={
                atendimento.pacienteFoto
                  ? { uri: atendimento.pacienteFoto }
                  : require('../../../../assets/avatar-padrao.png')
              }
              style={styles.foto}
            />
            <View style={styles.pacienteTextos}>
              <Text style={styles.pacienteNome}>{atendimento.pacienteNome}</Text>
              <View style={styles.sessao}>
                <Text style={styles.sessaoTexto}>
                  {atendimento.sessao === 1 ? 'Primeira consulta' : `Sessão nº ${atendimento.sessao}`}
                </Text>
              </View>
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
                {atendimento.hora} às {somarMinutos(atendimento.hora, DURACAO_MINUTOS)} (
                {DURACAO_MINUTOS} min)
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

        {/* Sala */}
        {!concluido && (
          <View style={styles.sala}>
            <Text style={styles.salaTitulo}>
              {aberta ? 'A sala está aberta!' : 'Sala do atendimento'}
            </Text>
            <Text style={styles.salaTexto}>
              {aberta
                ? `${nome} pode entrar a qualquer momento.`
                : `Abre 15 minutos antes, às ${somarMinutos(atendimento.hora, -15)}.`}
            </Text>
            <AppButton
              titulo="Entrar na sala virtual"
              icone="videocam-outline"
              desabilitado={!aberta}
              onPress={() => Alert.alert('Em breve', 'Sala de atendimento online.')}
            />
          </View>
        )}

        {/* Motivo da busca */}
        {atendimento.queixa ? (
          <View style={styles.card}>
            <View style={styles.cardTitulo}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primaria} />
              <Text style={styles.cardTituloTexto}>Motivo da busca</Text>
            </View>
            <Text style={styles.queixa}>“{atendimento.queixa}”</Text>
          </View>
        ) : null}

        {/* Contato de emergência */}
        {contato ? (
          <View style={styles.card}>
            <View style={styles.cardTitulo}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.primaria} />
              <Text style={styles.cardTituloTexto}>Contato de emergência</Text>
            </View>

            <View style={styles.contato}>
              <View style={styles.contatoTextos}>
                <Text style={styles.contatoNome}>{contato.nome}</Text>
                <Text style={styles.contatoSub}>
                  {contato.relacao} • {contato.telefone}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.botaoLigar}
                onPress={() => Linking.openURL(`tel:${contato.telefone.replace(/\D/g, '')}`)}
              >
                <Ionicons name="call" size={18} color={colors.branco} />
              </TouchableOpacity>
            </View>

            <Text style={styles.aviso}>
              Use apenas em situação de risco, seguindo o protocolo da clínica-escola e
              acionando sua supervisão.
            </Text>
          </View>
        ) : null}

        {/* Supervisão */}
        <View style={styles.card}>
          <View style={styles.cardTitulo}>
            <Ionicons name="school-outline" size={18} color={colors.primaria} />
            <Text style={styles.cardTituloTexto}>Supervisão</Text>
          </View>
          <View style={styles.supervisor}>
            <Ionicons name="person-outline" size={16} color={colors.primaria} />
            <Text style={styles.supervisorTexto}>{SUPERVISOR_EXEMPLO}</Text>
          </View>
          <Text style={styles.aviso}>
            Registre e discuta este atendimento na supervisão, conforme o protocolo da
            clínica-escola.
          </Text>
        </View>

        {/* Cancelamento */}
        {cancelavel ? (
          cancelando ? (
            <View style={styles.cancelamento}>
              <Text style={styles.cancelamentoTitulo}>Por que você vai cancelar?</Text>
              <Text style={styles.aviso}>{nome} será avisado(a) e o horário ficará livre.</Text>

              {MOTIVOS_CANCELAMENTO.map((item) => (
                <RadioOption
                  key={item.texto}
                  icone={item.icone}
                  texto={item.texto}
                  selecionado={motivo === item.texto}
                  onPress={() => setMotivo(item.texto)}
                />
              ))}

              <View style={styles.botoes}>
                <View style={styles.botao}>
                  <AppButton titulo="Voltar" variante="secundario" onPress={voltar} />
                </View>
                <View style={styles.botao}>
                  <AppButton
                    titulo="Cancelar"
                    variante="perigo"
                    desabilitado={!motivo}
                    onPress={confirmarCancelamento}
                  />
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.cancelarLink} onPress={() => setCancelando(true)}>
              <Ionicons name="close-circle-outline" size={18} color={colors.erro} />
              <Text style={styles.cancelarTexto}>Cancelar atendimento</Text>
            </TouchableOpacity>
          )
        ) : !concluido ? (
          <Text style={styles.nota}>
            Faltam menos de 4 horas: para cancelar, fale com sua supervisão.
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}