import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import FilterChips from '@/components/FilterChips';
import RadioOption from '@/components/RadioOption';
import HourStepper, { formatarHoraCheia } from '@/components/HourStepper';
import LoadState from '@/components/LoadState';
import { useAuth } from '@/contexts/AuthContext';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { mensagemDeErro } from '@/services/api';
import type { DisponibilidadeResponseDTO, ModalidadeSessao } from '@/types/api';
import { faixaSobreposta, horariosDaFaixa, horariosPorSemana } from '@/utils/atendimentos';
import { horaCurta } from '@/utils/conversoes';
import { NOME_DIA_SEMANA, ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/estudante/disponibilidade.styles';
import { colors } from '@/styles/colors';

// 1 = segunda ... 7 = domingo (igual ao backend)
const DIAS_CURTOS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const HORA_MINIMA = 6;
const HORA_MAXIMA = 23;

function textoHorarios(quantidade: number) {
  return `${quantidade} ${quantidade === 1 ? 'horário' : 'horários'}`;
}

export default function MinhaDisponibilidade() {
  const { perfilEstudante } = useAuth();
  const { disponibilidades, carregando, erro, recarregar, cadastrarFaixa, desativarFaixa } =
    useAtendimentos();

  // Formulário da nova faixa
  const [diaSemana, setDiaSemana] = useState(1);
  const [inicio, setInicio] = useState(8);
  const [fim, setFim] = useState(12);
  const modalidadeDoPerfil = perfilEstudante?.modalidade ?? 'AMBOS';
  const [modalidade, setModalidade] = useState<ModalidadeSessao>(
    modalidadeDoPerfil === 'PRESENCIAL' ? 'PRESENCIAL' : 'ONLINE'
  );
  const [salvando, setSalvando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Desativação (confirmada na própria linha)
  const [confirmarId, setConfirmarId] = useState<number | null>(null);
  const [desativandoId, setDesativandoId] = useState<number | null>(null);
  const [erroDesativar, setErroDesativar] = useState<string | null>(null);

  const ativas = disponibilidades.filter((faixa) => faixa.ativo);
  const desativadas = disponibilidades.length - ativas.length;
  const totalSemana = horariosPorSemana(disponibilidades);

  const horaInicio = formatarHoraCheia(inicio);
  const horaFim = formatarHoraCheia(fim);
  const quantidadeNova = horariosDaFaixa({ horaInicio, horaFim });

  function mudarInicio(novo: number) {
    setInicio(novo);
    if (fim <= novo) setFim(novo + 1);
    setErroFormulario(null);
  }

  function mudarFim(novo: number) {
    setFim(novo);
    if (inicio >= novo) setInicio(novo - 1);
    setErroFormulario(null);
  }

  async function adicionar() {
    setErroFormulario(null);
    setMensagem(null);
    const conflito = faixaSobreposta(disponibilidades, { diaSemana, horaInicio, horaFim });
    if (conflito) {
      setErroFormulario(
        `Já existe uma faixa ativa de ${horaCurta(conflito.horaInicio)} às ${horaCurta(conflito.horaFim)} nesse dia. Escolha outro horário ou desative a outra faixa.`
      );
      return;
    }

    setSalvando(true);
    try {
      await cadastrarFaixa({ diaSemana, horaInicio, horaFim, modalidade });
      setMensagem(`Faixa adicionada: ${NOME_DIA_SEMANA[diaSemana]}, ${horaInicio} às ${horaFim}.`);
    } catch (e) {
      setErroFormulario(mensagemDeErro(e));
    } finally {
      setSalvando(false);
    }
  }

  async function desativar(faixa: DisponibilidadeResponseDTO) {
    setDesativandoId(faixa.id);
    setErroDesativar(null);
    try {
      await desativarFaixa(faixa.id);
      setConfirmarId(null);
    } catch (e) {
      setErroDesativar(mensagemDeErro(e));
    } finally {
      setDesativandoId(null);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Minha disponibilidade" />

        <Text style={styles.intro}>
          Cadastre as faixas de horário em que você atende. Os pacientes só conseguem agendar
          dentro delas, na modalidade de cada faixa.
        </Text>

        <NoticeCard
          icone="time-outline"
          titulo="Sessões de 50 minutos"
          texto="Cada faixa vira horários de hora em hora: 50 min de sessão + 10 min de intervalo. Ex.: 08:00 às 12:00 gera 4 horários. Os horários seguem o horário de Brasília."
        />

        <LoadState
          carregando={carregando && disponibilidades.length === 0}
          erro={erro}
          onTentarDeNovo={recarregar}
          textoCarregando="Carregando sua disponibilidade..."
        />

        {!carregando && !erro && (
          <>
            <View style={styles.resumo}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
              <Text style={styles.resumoTexto}>{textoHorarios(totalSemana)} por semana</Text>
            </View>

            {/* Faixas ativas, por dia */}
            {ativas.length === 0 ? (
              <View style={styles.vazio}>
                <Text style={styles.vazioTexto}>
                  Você ainda não tem faixas ativas. Sem elas, nenhum paciente consegue agendar.
                </Text>
              </View>
            ) : (
              <View style={styles.lista}>
                {[1, 2, 3, 4, 5, 6, 7].map((dia) => {
                  const doDia = ativas.filter((faixa) => faixa.diaSemana === dia);
                  if (doDia.length === 0) return null;
                  return (
                    <View key={dia} style={styles.dia}>
                      <Text style={styles.diaNome}>{NOME_DIA_SEMANA[dia]}</Text>
                      {doDia.map((faixa) => (
                        <View key={faixa.id}>
                          <View style={styles.faixa}>
                            <View style={styles.faixaTextos}>
                              <Text style={styles.faixaHorario}>
                                {horaCurta(faixa.horaInicio)} às {horaCurta(faixa.horaFim)}
                              </Text>
                              <Text style={styles.faixaSub}>
                                {ROTULO_MODALIDADE[faixa.modalidade]} • {textoHorarios(horariosDaFaixa(faixa))}
                              </Text>
                            </View>
                            {confirmarId !== faixa.id && (
                              <TouchableOpacity
                                style={styles.faixaRemover}
                                onPress={() => {
                                  setConfirmarId(faixa.id);
                                  setErroDesativar(null);
                                }}
                                accessibilityLabel="Desativar faixa"
                              >
                                <Ionicons name="trash-outline" size={18} color={colors.erro} />
                              </TouchableOpacity>
                            )}
                          </View>

                          {confirmarId === faixa.id && (
                            <View style={styles.confirmacao}>
                              <Text style={styles.confirmacaoTexto}>
                                Desativar esta faixa? Ela deixa de aparecer para os pacientes.
                                Consultas já marcadas não mudam.
                              </Text>
                              <View style={styles.botoes}>
                                <View style={styles.botao}>
                                  <AppButton
                                    titulo="Voltar"
                                    variante="secundario"
                                    desabilitado={desativandoId === faixa.id}
                                    onPress={() => setConfirmarId(null)}
                                  />
                                </View>
                                <View style={styles.botao}>
                                  <AppButton
                                    titulo="Desativar"
                                    variante="perigo"
                                    carregando={desativandoId === faixa.id}
                                    onPress={() => desativar(faixa)}
                                  />
                                </View>
                              </View>
                              {erroDesativar && <Text style={styles.erro}>{erroDesativar}</Text>}
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            )}

            {desativadas > 0 && (
              <Text style={styles.nota}>
                {desativadas === 1
                  ? '1 faixa desativada não aparece para os pacientes.'
                  : `${desativadas} faixas desativadas não aparecem para os pacientes.`}
              </Text>
            )}

            {/* Nova faixa */}
            <Text style={styles.secaoTitulo}>Adicionar faixa</Text>
            <View style={styles.formulario}>
              <Text style={styles.rotulo}>Dia da semana</Text>
              <FilterChips
                opcoes={DIAS_CURTOS}
                selecionado={DIAS_CURTOS[diaSemana - 1]}
                onSelecionar={(nome) => {
                  setDiaSemana(DIAS_CURTOS.indexOf(nome) + 1);
                  setErroFormulario(null);
                }}
                quebrarLinha
              />

              <View style={styles.steppers}>
                <HourStepper
                  rotulo="Início"
                  valor={inicio}
                  minimo={HORA_MINIMA}
                  maximo={HORA_MAXIMA - 1}
                  onMudar={mudarInicio}
                />
                <HourStepper
                  rotulo="Fim"
                  valor={fim}
                  minimo={HORA_MINIMA + 1}
                  maximo={HORA_MAXIMA}
                  onMudar={mudarFim}
                />
              </View>

              <Text style={styles.rotulo}>Modalidade</Text>
              {modalidadeDoPerfil === 'AMBOS' ? (
                <View style={styles.opcoes}>
                  <RadioOption
                    icone="videocam-outline"
                    texto="Online"
                    selecionado={modalidade === 'ONLINE'}
                    onPress={() => setModalidade('ONLINE')}
                  />
                  <RadioOption
                    icone="business-outline"
                    texto="Presencial"
                    selecionado={modalidade === 'PRESENCIAL'}
                    onPress={() => setModalidade('PRESENCIAL')}
                  />
                </View>
              ) : (
                <Text style={styles.texto}>
                  {ROTULO_MODALIDADE[modalidade]}: é a modalidade do seu perfil profissional.
                </Text>
              )}

              <Text style={styles.previa}>
                {NOME_DIA_SEMANA[diaSemana]}, {horaInicio} às {horaFim} •{' '}
                {textoHorarios(quantidadeNova)}
              </Text>

              {erroFormulario && <Text style={styles.erro}>{erroFormulario}</Text>}
              {mensagem && <Text style={styles.sucesso}>{mensagem}</Text>}

              <AppButton
                titulo="Adicionar faixa"
                icone="add"
                carregando={salvando}
                onPress={adicionar}
              />
            </View>

            <Text style={styles.nota}>
              Não é possível editar uma faixa: para mudar, desative e adicione outra.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
