import { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import CheckboxCard from '@/components/CheckboxCard';
import { useCadastro } from '@/contexts/CadastroContext';
import { RECURSOS } from '@/config/recursos';
import { styles } from '@/styles/cadastro/estudante/academico.styles';
import { colors } from '@/styles/colors';

// O backend aceita 1 a 12; o app só abre o cadastro a partir do 5º período
const PERIODOS = [5, 6, 7, 8, 9, 10, 11, 12];

type Erros = {
    universidade?: string;
    periodo?: string;
    matricula?: string;
    estagio?: string;
};

export default function DadosAcademicos() {
    const { dados, atualizarDados } = useCadastro();
    const [universidade, setUniversidade] = useState(dados.universidade ?? '');
    const [periodo, setPeriodo] = useState<number | null>(dados.periodo ?? null);
    const [matricula, setMatricula] = useState(dados.matricula ?? '');
    const [estagio, setEstagio] = useState(dados.estagioSupervisionado ?? false);
    const [erros, setErros] = useState<Erros>({});

    function handleContinuar() {
        // Limites do CadastroEstudanteDTO
        const novosErros: Erros = {
            universidade: !universidade.trim()
                ? 'Informe sua universidade.'
                : universidade.trim().length > 200
                ? 'A universidade deve ter no máximo 200 caracteres.'
                : undefined,
            periodo: periodo ? undefined : 'Selecione o seu período atual.',
            matricula: !matricula.trim()
                ? 'Informe seu número de matrícula.'
                : matricula.trim().length > 50
                ? 'A matrícula deve ter no máximo 50 caracteres.'
                : undefined,
            estagio: estagio ? undefined : 'É necessário estar em estágio supervisionado.',
        };
        setErros(novosErros);

        if (Object.values(novosErros).some(Boolean)) return;

        atualizarDados({
            universidade: universidade.trim(),
            periodo: periodo ?? undefined,
            matricula: matricula.trim(),
            estagioSupervisionado: estagio,
        });
        // Comprovante escondido enquanto o backend não aceita upload
        router.push(
            RECURSOS.comprovanteMatricula
                ? '/cadastro/estudante/comprovacao'
                : '/cadastro/estudante/atendimento'
        );
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
                    <StepHeader passoAtual={2} totalPassos={3} etiqueta="Formação em Psicologia" />

                    <View style={styles.selo}>
                        <Ionicons name="business-outline" size={14} color={colors.primaria} />
                        <Text style={styles.seloTexto}>Vínculo Universitário</Text>
                    </View>

                    <Text style={styles.titulo}>Dados acadêmicos</Text>
                    <Text style={styles.subtitulo}>
                        Essas informações serão utilizadas para confirmar seu vínculo acadêmico e
                        habilitar seus futuros atendimentos supervisionados.
                    </Text>

                    {/* Card Credenciamento */}
                    <View style={styles.cardCredenciamento}>
                        <View style={styles.credenciamentoImagem}>
                            <Ionicons name="school" size={28} color={colors.primaria} />
                        </View>
                        <View style={styles.credenciamentoTextos}>
                            <View style={styles.credenciamentoTituloLinha}>
                                <Ionicons name="checkmark-circle-outline" size={14} color={colors.verde} />
                                <Text style={styles.credenciamentoTitulo}>Credenciamento Acadêmico</Text>
                            </View>
                            <Text style={styles.credenciamentoTexto}>
                                Conexão direta com a sua universidade para validação oficial de horas
                                de estágio
                            </Text>
                        </View>
                    </View>

                    {/* Universidade */}
                    <AppInput
                        label="Universidade"
                        etiquetaDireita="Obrigatório"
                        icone="school-outline"
                        placeholder="Pontifícia Universidade Católica (PUC)"
                        value={universidade}
                        onChangeText={setUniversidade}
                        maxLength={200}
                        fundoBranco
                        erro={erros.universidade}
                    />

                    {/* Curso (fixo) */}
                    <Text style={[styles.label, { marginBottom: 8 }]}>Curso de Graduação</Text>
                    <View style={styles.cardCurso}>
                        <View style={styles.cursoIcone}>
                            <Ionicons name="happy-outline" size={20} color={colors.primaria} />
                        </View>
                        <View style={styles.cursoTextos}>
                            <Text style={styles.cursoTitulo}>Psicologia (Bacharelado)</Text>
                            <Text style={styles.cursoSubtitulo}>Grade Curricular Nacional</Text>
                        </View>
                        <View style={styles.ativo}>
                            <Ionicons name="checkmark" size={12} color={colors.branco} />
                            <Text style={styles.ativoTexto}>Ativo</Text>
                        </View>
                    </View>

                    {/* Período */}
                    <View style={styles.espacoPeriodo}>
                        <View style={styles.labelLinha}>
                            <Text style={styles.label}>Período atual da graduação</Text>
                            <Text style={styles.labelDireita}>A partir do 5º período</Text>
                        </View>

                        <View style={styles.periodos}>
                            {PERIODOS.map((item) => {
                                const selecionado = periodo === item;
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        style={[styles.periodo, selecionado && styles.periodoSelecionado]}
                                        onPress={() => setPeriodo(item)}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[styles.periodoTexto, selecionado && styles.periodoTextoSelecionado]}
                                        >
                                            {item}º período
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <Text style={styles.periodoDica}>
                            Estágios clínicos regulares iniciam-se predominantemente entre o 7º e 10º
                            semestre.
                        </Text>
                        {erros.periodo ? <Text style={styles.erroTexto}>{erros.periodo}</Text> : null}
                    </View>

                    {/* Matrícula */}
                    <AppInput
                        label="Número de Matrícula / RA"
                        etiquetaDireita="Identificador único"
                        icone="id-card-outline"
                        placeholder="2022041189"
                        value={matricula}
                        onChangeText={setMatricula}
                        maxLength={50}
                        fundoBranco
                        erro={erros.matricula}
                    />

                    {/* Estágio supervisionado (obrigatório no backend) */}
                    <View style={styles.espacoPeriodo}>
                        <CheckboxCard marcado={estagio} onPress={() => setEstagio(!estagio)}>
                            Estou em estágio supervisionado, com acompanhamento de um docente
                            orientador.
                        </CheckboxCard>
                        {erros.estagio ? <Text style={styles.erroTexto}>{erros.estagio}</Text> : null}
                    </View>

                    {/* Card informativo */}
                    <View style={styles.cardInfo}>
                        <View style={styles.infoTopo}>
                            <View style={styles.infoIcone}>
                                <Ionicons name="shield-checkmark-outline" size={18} color={colors.primaria} />
                            </View>
                            <Text style={styles.infoTitulo}>Por que solicitamos esses dados?</Text>
                        </View>
                        <Text style={styles.infoTexto}>
                            Para garantir a segurança dos pacientes e a conformidade ética dos
                            atendimentos, apenas estudantes regularmente matriculados e sob orientação
                            direta de docentes supervisores podem atuar na plataforma Psiconecta.
                        </Text>
                        <View style={styles.resolucao}>
                            <Ionicons name="document-text-outline" size={12} color={colors.primaria} />
                            <Text style={styles.resolucaoTexto}>
                                Resolução CFP nº 011/2018 & Diretrizes Curriculares
                            </Text>
                        </View>
                    </View>

                    <AppButton
                        titulo="Continuar para Atendimento"
                        icone="arrow-forward"
                        onPress={handleContinuar}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}