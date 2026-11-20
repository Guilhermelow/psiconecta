import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import AppButton from '@/components/AppButton';
import CheckboxCard from '@/components/CheckboxCard';
import { useCadastro } from '@/contexts/CadastroContext';
import { styles } from '@/styles/cadastro/paciente/termos/termos.styles';
import { colors } from '@/styles/colors';
import { useAuth } from '@/contexts/AuthContext';
import { mensagemDeErro } from '@/services/api';
import { cadastrarPaciente } from '@/services/cadastro';
import { registrarConsentimento, VERSAO_TERMOS } from '@/services/consentimentos';
import { dataBrParaIso, somenteNumeros } from '@/utils/conversoes';

export default function TermosPaciente() {
  const { dados, limparDados } = useCadastro();
  const { entrar } = useAuth();
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  // Se a conta já foi criada e só o aceite falhou, não tenta cadastrar de novo
  const [contaCriada, setContaCriada] = useState(false);

  async function handleCriarConta() {
    if (!dados.nome || !dados.email || !dados.senha) {
      Alert.alert('Dados incompletos', 'Volte ao passo anterior e preencha seus dados.');
      return;
    }

    setEnviando(true);
    try {
      if (!contaCriada) {
        // 1. POST /api/pacientes (não devolve token)
        await cadastrarPaciente({
          usuario: { nome: dados.nome, email: dados.email, senha: dados.senha },
          cpf: dados.cpf ? somenteNumeros(dados.cpf) : null,
          dataNascimento: dados.nascimento ? dataBrParaIso(dados.nascimento) : null,
          telefone: dados.telefone || null,
        });
        // 2. Login para obter o token
        await entrar(dados.email, dados.senha);
        setContaCriada(true);
      }

      // 3. POST /api/consentimentos para cada documento aceito
      for (const tipo of ['TERMOS_USO', 'POLITICA_PRIVACIDADE'] as const) {
        await registrarConsentimento({ tipo, versao: VERSAO_TERMOS, aceito: true });
      }

      limparDados();
      if (router.canDismiss()) router.dismissAll();
      router.replace('/paciente/inicio');
    } catch (erro) {
      Alert.alert(
        contaCriada ? 'Não registramos seu aceite' : 'Não foi possível criar a conta',
        contaCriada
          ? `Sua conta foi criada, mas o aceite dos termos não foi salvo. Toque em continuar para tentar de novo.\n\n${mensagemDeErro(erro)}`
          : mensagemDeErro(erro)
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StepHeader passoAtual={3} totalPassos={3} />

        <Text style={styles.titulo}>Termos de Uso e Privacidade</Text>
        <Text style={styles.subtitulo}>
          Sua privacidade e o sigilo de seus dados são nossas maiores prioridades.
        </Text>

        {/* Card Garantias Éticas */}
        <View style={styles.cardGarantias}>
          <View style={styles.garantiasTopo}>
            <View style={styles.garantiasIcone}>
              <Ionicons name="shield" size={20} color={colors.primaria} />
            </View>
            <View style={styles.garantiasTextos}>
              <Text style={styles.garantiasTitulo}>Garantias Éticas</Text>
              <Text style={styles.garantiasSubtitulo}>Protocolo Universitário Integrado</Text>
            </View>
            <View style={styles.sigilo}>
              <Ionicons name="lock-closed" size={12} color={colors.branco} />
              <Text style={styles.sigiloTexto}>Sigilo Profissional</Text>
            </View>
          </View>

          <View style={styles.garantiasCorpo}>
            <View style={styles.item}>
              <View style={styles.itemIcone}>
                <Ionicons name="school-outline" size={16} color={colors.primaria} />
              </View>
              <View style={styles.itemTextos}>
                <Text style={styles.itemTitulo}>1. Supervisão Acadêmica</Text>
                <Text style={styles.itemTexto}>
                  Os atendimentos são realizados por estudantes do curso de Psicologia
                  em formação prática, sob supervisão e orientação contínua de
                  professores docentes habilitados e registrados no Conselho de Psicologia.
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.itemIcone}>
                <Ionicons name="lock-closed-outline" size={16} color={colors.primaria} />
              </View>
              <View style={styles.itemTextos}>
                <Text style={styles.itemTitulo}>2. Confidencialidade e LGPD</Text>
                <Text style={styles.itemTexto}>
                  Suas informações pessoais, dados de contato e relatos são protegidos
                  e tratados com total confidencialidade, respeito à LGPD e observância
                  estrita ao Código de Ética Profissional do Psicólogo.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Checkboxes */}
        <View style={styles.checks}>
          <CheckboxCard marcado={aceitaTermos} onPress={() => setAceitaTermos(!aceitaTermos)}>
            Li e concordo com os <Text style={styles.link}>Termos de Uso</Text> e a{' '}
            <Text style={styles.link}>Política de Privacidade</Text> do Psiconecta.
          </CheckboxCard>

        </View>

        {/* Só libera se aceitar os termos */}
        <AppButton
          titulo={contaCriada ? 'Continuar' : 'Criar minha conta'}
          icone="person-add-outline"
          desabilitado={!aceitaTermos}
          carregando={enviando}
          onPress={handleCriarConta}
        />
      </ScrollView>
    </SafeAreaView>
  );
}