import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import StudentSummary from '@/components/StudentSummary';
import { useConsultas } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import {
    situacaoDaConsulta,
    salaAberta,
    podeCancelar,
    DURACAO_MINUTOS,
} from '@/utils/consultas';
import { dataDaChave, dataLonga, somarMinutos } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/paciente/consulta/detalhes.styles';
import { colors } from '@/styles/colors';

const ORIENTACOES = [
    { icone: 'headset-outline', texto: 'Use fones de ouvido' },
    { icone: 'home-outline', texto: 'Escolha um ambiente privativo e silencioso' },
    { icone: 'shield-checkmark-outline', texto: 'Sessão protegida por sigilo ético' },
] as const;

export default function DetalhesConsulta() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { consultas } = useConsultas();

    const consulta = consultas.find((item) => item.id === id);
    const estudante = consulta
        ? ESTUDANTES.find((item) => item.id === consulta.estudanteId)
        : undefined;

    if (!consulta || !estudante) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.scroll}>
                    <AppHeader titulo="Detalhes da consulta" />
                    <Text style={styles.texto}>Consulta não encontrada.</Text>
                </View>
            </SafeAreaView>
        );
    }

    const consultaId = consulta.id;
    const estudanteId = estudante.id;

    const situacao = situacaoDaConsulta(consulta);
    const proxima = situacao === 'proxima';
    const aberta = salaAberta(consulta);
    const alteravel = podeCancelar(consulta); // mais de 4h antes

    // Aparência da etiqueta de status
    const status = {
        proxima: { texto: 'Confirmada', fundo: styles.statusVerde, cor: colors.verde },
        concluida: { texto: 'Concluída', fundo: styles.statusCinza, cor: colors.texto },
        cancelada: { texto: 'Cancelada', fundo: styles.statusVermelho, cor: colors.erro },
    }[situacao];

    function reagendar() {
        router.push({
            pathname: '/paciente/agendamento/[id]',
            params: { id: estudanteId, reagendarId: consultaId },
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <AppHeader titulo="Detalhes da consulta" />

                {/* Status + protocolo */}
                <View style={styles.topo}>
                    <View style={[styles.status, status.fundo]}>
                        <View style={[styles.statusPonto, { backgroundColor: status.cor }]} />
                        <Text style={[styles.statusTexto, { color: status.cor }]}>{status.texto}</Text>
                    </View>
                    <Text style={styles.protocolo}>#{consulta.protocolo}</Text>
                </View>

                <StudentSummary estudante={estudante} />

                {/* Data e modalidade */}
                <View style={styles.card}>
                    <View style={styles.linha}>
                        <View style={styles.linhaIcone}>
                            <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
                        </View>
                        <View style={styles.linhaTextos}>
                            <Text style={styles.rotulo}>Data e horário</Text>
                            <Text style={styles.valor}>{dataLonga(dataDaChave(consulta.data))}</Text>
                            <Text style={styles.texto}>
                                {consulta.hora} às {somarMinutos(consulta.hora, DURACAO_MINUTOS)} (
                                {DURACAO_MINUTOS} min)
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divisor} />

                    <View style={styles.linha}>
                        <View style={styles.linhaIcone}>
                            <Ionicons name="videocam-outline" size={18} color={colors.primaria} />
                        </View>
                        <View style={styles.linhaTextos}>
                            <Text style={styles.rotulo}>Modalidade</Text>
                            <Text style={styles.valor}>Online • Sala segura Psiconecta</Text>
                        </View>
                    </View>
                    {consulta.motivoCancelamento ? (
                        <>
                            <View style={styles.divisor} />
                            <View style={styles.linha}>
                                <View style={styles.linhaIcone}>
                                    <Ionicons name="close-circle-outline" size={18} color={colors.erro} />
                                </View>
                                <View style={styles.linhaTextos}>
                                    <Text style={styles.rotulo}>Motivo do cancelamento</Text>
                                    <Text style={styles.valor}>{consulta.motivoCancelamento}</Text>
                                </View>
                            </View>
                        </>
                    ) : null}
                </View>

                {/* Sala (só para consultas futuras) */}
                {proxima && (
                    <View style={styles.sala}>
                        <Text style={styles.salaTitulo}>
                            {aberta ? 'A sala está aberta!' : 'Pronto para o atendimento?'}
                        </Text>
                        <View style={styles.salaTextoLinha}>
                            <Ionicons name="time-outline" size={14} color={colors.texto} />
                            <Text style={styles.salaTexto}>
                                {aberta
                                    ? `${primeiroNome(estudante.nome)} vai te receber em instantes.`
                                    : `A sala abre 15 minutos antes, às ${somarMinutos(consulta.hora, -15)}.`}
                            </Text>
                        </View>
                        <AppButton
                            titulo="Entrar na sala virtual"
                            icone="videocam-outline"
                            desabilitado={!aberta}
                            onPress={() => Alert.alert('Em breve', 'Sala de atendimento online.')}
                        />
                    </View>
                )}

                {/* Orientações */}
                <View style={styles.card}>
                    <Text style={styles.rotulo}>Orientações rápidas</Text>
                    {ORIENTACOES.map((item) => (
                        <View key={item.texto} style={styles.orientacao}>
                            <View style={styles.linhaIcone}>
                                <Ionicons name={item.icone} size={18} color={colors.primaria} />
                            </View>
                            <Text style={styles.orientacaoTexto}>{item.texto}</Text>
                        </View>
                    ))}
                </View>

                {/* Ações */}
                <View style={styles.acoes}>
                    {proxima ? (
                        alteravel ? (
                            <>
                                <AppButton
                                    titulo="Reagendar consulta"
                                    variante="secundario"
                                    icone="calendar-outline"
                                    onPress={reagendar}
                                />

                                <TouchableOpacity
                                    style={styles.cancelarLink}
                                    onPress={() =>
                                        router.push({
                                            pathname: '/paciente/consulta/cancelar',
                                            params: { id: consultaId },
                                        })
                                    }
                                >
                                    <Ionicons name="close-circle-outline" size={18} color={colors.erro} />
                                    <Text style={styles.cancelarTexto}>Cancelar consulta</Text>
                                </TouchableOpacity>

                                <Text style={styles.nota}>
                                    Reagendamento e cancelamento gratuitos até 4h antes da sessão.
                                </Text>
                            </>
                        ) : (
                            <Text style={styles.nota}>
                                Faltam menos de 4 horas: esta consulta não pode mais ser reagendada ou
                                cancelada pelo app.
                            </Text>
                        )
                    ) : (
                        <AppButton
                            titulo="Agendar novamente"
                            variante="secundario"
                            icone="refresh"
                            onPress={() => router.push(`/paciente/estudante/${estudanteId}`)}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}