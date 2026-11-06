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
import { useCadastro } from '@/contexts/CadastroContext';
import { styles } from '@/styles/cadastro/estudante/academico.styles';
import { colors } from '@/styles/colors';

const PERIODOS = ['5º', '6º', '7º', '8º', '9º', '10º'];

type Erros = {
    instituicao?: string;
    periodo?: string;
    matricula?: string;
};

export default function DadosAcademicos() {
    const [instituicao, setInstituicao] = useState('');
    const [periodo, setPeriodo] = useState<string | null>(null);
    const [matricula, setMatricula] = useState('');
    const [erros, setErros] = useState<Erros>({});
    const { atualizarDados } = useCadastro();

    function handleContinuar() {
        const novosErros: Erros = {
            instituicao:
                instituicao.trim().length < 3 ? 'Informe sua instituição de ensino.' : undefined,
            periodo: periodo ? undefined : 'Selecione o seu período atual.',
            matricula: matricula.trim().length < 4 ? 'Informe seu número de matrícula.' : undefined,
        };
        setErros(novosErros);

        if (Object.values(novosErros).some(Boolean)) return;

        atualizarDados({
            instituicao,
            curso: 'Psicologia (Bacharelado)',
            periodo: periodo ?? undefined,
            matricula,
        });
        router.push('/cadastro/estudante/comprovacao');
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

                    {/* Instituição */}
                    <AppInput
                        label="Instituição de Ensino Superior (IES)"
                        etiquetaDireita="Obrigatório"
                        icone="school-outline"
                        iconeDireita="search"
                        placeholder="Pontifícia Universidade Católica (PUC)"
                        value={instituicao}
                        onChangeText={setInstituicao}
                        fundoBranco
                        erro={erros.instituicao}
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
                                            {item} período
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
                        keyboardType="numeric"
                        fundoBranco
                        erro={erros.matricula}
                    />

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
                        titulo="Continuar para Comprovação"
                        icone="arrow-forward"
                        onPress={handleContinuar}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}