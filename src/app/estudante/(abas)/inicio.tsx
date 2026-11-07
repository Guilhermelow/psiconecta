import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import StudentHeader from '@/components/StudentHeader';
import VerifiedBadge from '@/components/VerifiedBadge';
import AppButton from '@/components/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { SUPERVISOR_EXEMPLO } from '@/mocks/atendimentos';
import { salaAberta, DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, dataLonga, ehHoje, somarMinutos, tempoAte } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/estudante/inicio.styles';
import { colors } from '@/styles/colors';
import SessionItem from '@/components/SessionItem';

const AVATAR = require('../../../../assets/avatar-padrao.png');

export default function InicioEstudante() {
    const { usuario } = useAuth();
    const { atendimentos, solicitacoes } = useAtendimentos();

    const agora = new Date();
    const nome = primeiroNome(usuario?.nome);

    // Atendimentos que ainda não terminaram
    const futuros = atendimentos.filter(
        (item) =>
            dataEHora(item.data, item.hora).getTime() + DURACAO_MINUTOS * 60000 > agora.getTime()
    );
    const proximo = futuros[0];

    // Todos de hoje (para o número) e os que ainda faltam hoje (para a lista)
    const totalHoje = atendimentos.filter((item) => ehHoje(dataEHora(item.data, item.hora))).length;
    const aindaHoje = futuros.filter(
        (item) => item.id !== proximo?.id && ehHoje(dataEHora(item.data, item.hora))
    );

    const selo = usuario?.periodo
        ? `Estudante verificado • ${usuario.periodo} período`
        : 'Estudante verificado';

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <StudentHeader />

                {/* Saudação */}
                <VerifiedBadge texto={selo} />
                <Text style={styles.saudacao}>Olá{nome ? `, ${nome}` : ''}!</Text>
                <Text style={styles.data}>{dataLonga(agora)}</Text>

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
                            <Ionicons name="file-tray-outline" size={18} color={colors.primaria} />
                        </View>
                        <Text style={styles.resumoNumero}>{solicitacoes.length}</Text>
                        <Text style={styles.resumoTexto}>
                            {solicitacoes.length === 1 ? 'Solicitação pendente' : 'Solicitações pendentes'}
                        </Text>
                    </View>
                </View>

                {/* Próximo atendimento */}
                {proximo ? (
                    <>
                        <View style={styles.secaoLinha}>
                            <Text style={styles.secaoTitulo}>Próximo atendimento</Text>
                            <View style={styles.tempo}>
                                <Ionicons name="time-outline" size={13} color={colors.primaria} />
                                <Text style={styles.tempoTexto}>
                                    {tempoAte(dataEHora(proximo.data, proximo.hora), agora)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.paciente}>
                                <Image
                                    source={proximo.pacienteFoto ? { uri: proximo.pacienteFoto } : AVATAR}
                                    style={styles.foto}
                                />
                                <View style={styles.pacienteTextos}>
                                    <Text style={styles.pacienteNome}>{proximo.pacienteNome}</Text>
                                    <Text style={styles.pacienteSub}>Sessão nº {proximo.sessao}</Text>
                                </View>
                            </View>

                            <View style={styles.infos}>
                                <View style={styles.info}>
                                    <Text style={styles.infoRotulo}>Horário</Text>
                                    <Text style={styles.infoValor}>
                                        {ehHoje(dataEHora(proximo.data, proximo.hora)) ? 'Hoje, ' : ''}
                                        {proximo.hora} – {somarMinutos(proximo.hora, DURACAO_MINUTOS)}
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoRotulo}>Modalidade</Text>
                                    <Text style={styles.infoValor}>Online</Text>
                                </View>
                            </View>

                            <View style={styles.supervisao}>
                                <Ionicons name="school-outline" size={14} color={colors.primaria} />
                                <Text style={styles.supervisaoTexto} numberOfLines={1}>
                                    Supervisão: {SUPERVISOR_EXEMPLO}
                                </Text>
                            </View>

                            <AppButton
                                titulo={salaAberta(proximo) ? 'Entrar na sala virtual' : 'Sala abre 15 min antes'}
                                icone="videocam-outline"
                                desabilitado={!salaAberta(proximo)}
                                onPress={() => Alert.alert('Em breve', 'Sala de atendimento online.')}
                            />

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
                            Quando você aceitar solicitações, seus atendimentos aparecerão aqui.
                        </Text>
                    </View>
                )}

                {/* Solicitações pendentes */}
                {solicitacoes.length > 0 && (
                    <View style={styles.solicitacoes}>
                        <View style={styles.solicitacoesTopo}>
                            <View style={styles.solicitacoesIcone}>
                                <Ionicons name="mail-unread-outline" size={20} color={colors.primaria} />
                            </View>
                            <View style={styles.solicitacoesTextos}>
                                <Text style={styles.solicitacoesTitulo}>
                                    {solicitacoes.length === 1
                                        ? '1 solicitação aguardando resposta'
                                        : `${solicitacoes.length} solicitações aguardando resposta`}
                                </Text>
                                <Text style={styles.solicitacoesTexto}>
                                    Pacientes triados pela clínica-escola aguardam sua confirmação.
                                </Text>
                            </View>
                        </View>
                        <AppButton
                            titulo="Revisar solicitações"
                            icone="arrow-forward"
                            onPress={() => router.navigate('/estudante/solicitacoes')}
                        />
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
                        {aindaHoje.map((item) => (
                                          <SessionItem key={item.id} atendimento={item} />
                        ))}
                    </View>
                ) : (
                    <View style={styles.vazio}>
                        <Text style={styles.vazioTexto}>Sem outros atendimentos hoje.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}