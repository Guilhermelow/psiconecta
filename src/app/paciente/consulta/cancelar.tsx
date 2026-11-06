import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import RadioOption from '@/components/RadioOption';
import { useConsultas } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { situacaoDaConsulta, podeCancelar, DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, dataLonga, ehHoje } from '@/utils/datas';
import { styles } from '@/styles/paciente/consulta/cancelar.styles';
import { colors } from '@/styles/colors';

const MOTIVOS = [
    { icone: 'medkit-outline', texto: 'Imprevisto pessoal ou de saúde' },
    { icone: 'briefcase-outline', texto: 'Conflito com trabalho ou estudos' },
    { icone: 'wifi-outline', texto: 'Problemas de conexão ou técnicos' },
    { icone: 'ellipsis-horizontal', texto: 'Outro motivo' },
] as const;

export default function CancelarConsulta() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { consultas, cancelar } = useConsultas();
    const [motivo, setMotivo] = useState<string | null>(null);

    const consulta = consultas.find((item) => item.id === id);
    const estudante = consulta
        ? ESTUDANTES.find((item) => item.id === consulta.estudanteId)
        : undefined;

    // Só dá para cancelar consultas futuras com mais de 4h de antecedência
    const permitido =
        consulta && situacaoDaConsulta(consulta) === 'proxima' && podeCancelar(consulta);

    if (!consulta || !estudante || !permitido) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.scroll}>
                    <AppHeader titulo="Cancelar consulta" />
                    <Text style={styles.texto}>Esta consulta não pode mais ser cancelada pelo app.</Text>
                    <AppButton titulo="Voltar" variante="secundario" onPress={() => router.back()} />
                </View>
            </SafeAreaView>
        );
    }

    const consultaId = consulta.id;
    const estudanteId = estudante.id;

    const inicio = dataEHora(consulta.data, consulta.hora);
    const textoData = ehHoje(inicio)
        ? `Hoje às ${consulta.hora}`
        : `${dataLonga(inicio)} às ${consulta.hora}`;

    function confirmar() {
        if (!motivo) return;
        cancelar(consultaId, motivo);

        // Fecha as telas da consulta e abre a confirmação do cancelamento
        // (assim o "voltar" não retorna para o formulário de cancelar)
        if (router.canDismiss()) router.dismissAll();
        router.push({
            pathname: '/paciente/consulta/cancelada',
            params: { id: consultaId },
        });
    }

    function reagendar() {
        // replace: o "voltar" do calendário leva aos detalhes, e não a esta tela
        router.replace({
            pathname: '/paciente/agendamento/[id]',
            params: { id: estudanteId, reagendarId: consultaId },
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <AppHeader titulo="Cancelar consulta" />

                <NoticeCard
                    icone="leaf-outline"
                    titulo="Tudo bem mudar de planos"
                    texto="Acolhemos sua decisão com respeito ao seu tempo e bem-estar."
                />

                {/* Resumo da consulta */}
                <View style={styles.card}>
                    <Text style={styles.rotulo}>Consulta a cancelar</Text>

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
                            <Text style={styles.nome}>{estudante.nome}</Text>
                            <Text style={styles.curso}>
                                Estudante de Psicologia • {estudante.periodo} período
                            </Text>
                        </View>
                    </View>

                    <View style={styles.dataLinha}>
                        <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
                        <View style={styles.dataTextos}>
                            <Text style={styles.dataTexto}>{textoData}</Text>
                            <Text style={styles.dataSub}>
                                Sessão online supervisionada ({DURACAO_MINUTOS} min)
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Atalho: reagendar em vez de cancelar */}
                <TouchableOpacity style={styles.reagendar} onPress={reagendar} activeOpacity={0.8}>
                    <Ionicons name="swap-horizontal-outline" size={20} color={colors.primaria} />
                    <Text style={styles.reagendarTexto}>Prefere outro horário?</Text>
                    <Text style={styles.reagendarLink}>Reagendar</Text>
                </TouchableOpacity>

                {/* Motivo */}
                <Text style={styles.titulo}>Qual o motivo do cancelamento?</Text>
                <Text style={styles.subtitulo}>
                    Sua resposta ajuda a clínica-escola a organizar a agenda dos atendimentos e da
                    supervisão.
                </Text>

                <View style={styles.motivos}>
                    {MOTIVOS.map((item) => (
                        <RadioOption
                            key={item.texto}
                            icone={item.icone}
                            texto={item.texto}
                            selecionado={motivo === item.texto}
                            onPress={() => setMotivo(item.texto)}
                        />
                    ))}
                </View>

                <NoticeCard
                    icone="people-outline"
                    texto="Ao cancelar, o horário fica disponível para outros pacientes que aguardam atendimento."
                />

                {/* Botões */}
                <View style={styles.botoes}>
                    <AppButton
                        titulo="Confirmar cancelamento"
                        variante="perigo"
                        icone="close-circle-outline"
                        desabilitado={!motivo}
                        onPress={confirmar}
                    />
                    <AppButton
                        titulo="Manter meu agendamento"
                        variante="secundario"
                        onPress={() => router.back()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}