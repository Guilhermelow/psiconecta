import { View, Text, Image, ScrollView, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import StudentHeader from '@/components/StudentHeader';
import VerifiedBadge from '@/components/VerifiedBadge';
import AppButton from '@/components/AppButton';
import StatusTag from '@/components/StatusTag';
import LoadState from '@/components/LoadState';
import SessionItem from '@/components/SessionItem';
import { useAuth } from '@/contexts/AuthContext';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { RECURSOS, SUPERVISOR_EXEMPLO } from '@/config/recursos';
import { fimDaConsulta, horaDe, inicioDaConsulta, salaDisponivel } from '@/utils/consultas';
import { contaNaAgenda, estaPorVir, precisaRegistro } from '@/utils/atendimentos';
import { dataLonga, ehHoje, tempoAte } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/estudante/inicio.styles';
import { colors } from '@/styles/colors';

const AVATAR = require('../../../../assets/avatar-padrao.png');

export default function InicioEstudante() {
  const { usuario, perfilEstudante } = useAuth();
  const { consultas, carregando, erro, recarregar } = useAtendimentos();

  const agora = new Date();
  const nome = primeiroNome(usuario?.nome);

  // Consultas que ainda vão acontecer (ou estão acontecendo), já em ordem de horário
  const porVir = consultas.filter((consulta) => estaPorVir(consulta, agora));
  const proximo = porVir[0];
  const proximoInicio = proximo ? inicioDaConsulta(proximo) : null;

  // Horário passou e o estudante ainda não registrou (iniciar/concluir/não compareceu)
  const semRegistro = consultas.filter((consulta) => precisaRegistro(consulta, agora));

  const totalHoje = consultas.filter(
    (consulta) => contaNaAgenda(consulta) && ehHoje(inicioDaConsulta(consulta))
  ).length;
  const aindaHoje = porVir.filter(
    (consulta) => consulta.id !== proximo?.id && ehHoje(inicioDaConsulta(consulta))
  );

  const selo = perfilEstudante
    ? `Estudante verificado • ${perfilEstudante.periodo}º período`
    : 'Estudante verificado';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={recarregar} tintColor={colors.primaria} />
        }
      >
        <StudentHeader />

        {/* Saudação */}
        <VerifiedBadge texto={selo} />
        <Text style={styles.saudacao}>Olá{nome ? `, ${nome}` : ''}!</Text>
        <Text style={styles.data}>{dataLonga(agora)}</Text>

        <LoadState
          carregando={carregando && consultas.length === 0}
          erro={erro}
          onTentarDeNovo={recarregar}
          textoCarregando="Carregando seus atendimentos..."
        />

        {!carregando && !erro && (
          <>
            {/* Resumo do dia (só informação) */}
            <View style={styles.resumo}>
              <View style={styles.resumoCard}>
                <View style={styles.resumoIcone}>
                  <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
                </View>
                <Text style={styles.resumoNumero}>{totalHoje}</Text>
                <Text style={styles.resumoTexto}>
                  {totalHoje === 1 ? 'Atendimento hoje' : 'Atendimentos hoje'}
                </Text>
              </View>
              <View style={styles.resumoCard}>
                <View style={styles.resumoIcone}>
                  <Ionicons name="create-outline" size={18} color={colors.primaria} />
                </View>
                <Text style={styles.resumoNumero}>{semRegistro.length}</Text>
                <Text style={styles.resumoTexto}>
                  Aguardando registro
                </Text>
              </View>
            </View>

            {/* Próximo atendimento */}
            {proximo && proximoInicio ? (
              <>
                <View style={styles.secaoLinha}>
                  <Text style={styles.secaoTitulo}>
                    {proximo.status === 'EM_ANDAMENTO' ? 'Atendimento em andamento' : 'Próximo atendimento'}
                  </Text>
                  <View style={styles.tempo}>
                    <Ionicons name="time-outline" size={13} color={colors.primaria} />
                    <Text style={styles.tempoTexto}>{tempoAte(proximoInicio, agora)}</Text>
                  </View>
                </View>

                <View style={styles.card}>
                  <View style={styles.paciente}>
                    <Image source={AVATAR} style={styles.foto} />
                    <View style={styles.pacienteTextos}>
                      <Text style={styles.pacienteNome}>{proximo.pacienteNome}</Text>
                      <StatusTag status={proximo.status} />
                    </View>
                  </View>

                  <View style={styles.infos}>
                    <View style={styles.info}>
                      <Text style={styles.infoRotulo}>Horário</Text>
                      <Text style={styles.infoValor}>
                        {ehHoje(proximoInicio) ? 'Hoje, ' : ''}
                        {horaDe(proximoInicio)} – {horaDe(fimDaConsulta(proximo))}
                      </Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={styles.infoRotulo}>Modalidade</Text>
                      <Text style={styles.infoValor}>{ROTULO_MODALIDADE[proximo.modalidade]}</Text>
                    </View>
                  </View>

                  {/* Escondido: o backend não tem supervisor (src/config/recursos.ts) */}
                  {RECURSOS.supervisor && (
                    <View style={styles.supervisao}>
                      <Ionicons name="school-outline" size={14} color={colors.primaria} />
                      <Text style={styles.supervisaoTexto} numberOfLines={1}>
                        Supervisão: {SUPERVISOR_EXEMPLO}
                      </Text>
                    </View>
                  )}

                  {/* Sala online: só quando o backend enviar o linkReuniao */}
                  {proximo.modalidade === 'ONLINE' && (
                    <AppButton
                      titulo={
                        salaDisponivel(proximo, agora)
                          ? 'Entrar na sala virtual'
                          : proximo.linkReuniao
                            ? 'Sala abre 15 min antes'
                            : 'Link da sala ainda não disponível'
                      }
                      icone="videocam-outline"
                      desabilitado={!salaDisponivel(proximo, agora)}
                      onPress={() => proximo.linkReuniao && Linking.openURL(proximo.linkReuniao)}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.linkCentro}
                    onPress={() => router.push(`/estudante/atendimento/${proximo.id}`)}
                  >
                    <Text style={styles.link}>Ver detalhes do atendimento</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={[styles.vazio, { marginBottom: 24 }]}>
                <Ionicons name="calendar-clear-outline" size={28} color={colors.primaria} />
                <Text style={styles.vazioTitulo}>Nenhum atendimento agendado</Text>
                <Text style={styles.vazioTexto}>
                  Os pacientes agendam nos horários da sua disponibilidade. Os atendimentos
                  aparecerão aqui.
                </Text>
              </View>
            )}

            {/* Atendimentos sem registro */}
            {semRegistro.length > 0 && (
              <View style={styles.registro}>
                <View style={styles.registroTopo}>
                  <View style={styles.registroIcone}>
                    <Ionicons name="create-outline" size={20} color={colors.primaria} />
                  </View>
                  <View style={styles.registroTextos}>
                    <Text style={styles.registroTitulo}>
                      {semRegistro.length === 1
                        ? '1 atendimento sem registro'
                        : `${semRegistro.length} atendimentos sem registro`}
                    </Text>
                    <Text style={styles.registroTexto}>
                      O horário já passou. Abra cada um e registre se foi concluído ou se o
                      paciente não compareceu.
                    </Text>
                  </View>
                </View>
                <View style={styles.lista}>
                  {semRegistro.map((consulta) => (
                    <SessionItem key={consulta.id} consulta={consulta} />
                  ))}
                </View>
              </View>
            )}

            {/* Ainda hoje */}
            <View style={styles.secaoLinha}>
              <Text style={styles.secaoTitulo}>Ainda hoje</Text>
              <TouchableOpacity onPress={() => router.navigate('/estudante/agenda')}>
                <Text style={styles.link}>Ver agenda completa</Text>
              </TouchableOpacity>
            </View>

            {aindaHoje.length > 0 ? (
              <View style={styles.lista}>
                {aindaHoje.map((consulta) => (
                  <SessionItem key={consulta.id} consulta={consulta} />
                ))}
              </View>
            ) : (
              <View style={styles.vazio}>
                <Text style={styles.vazioTexto}>Sem outros atendimentos hoje.</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
