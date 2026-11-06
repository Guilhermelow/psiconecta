import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
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

export default function TermosPaciente() {
  const { dados, limparDados } = useCadastro();
  const { entrar } = useAuth();
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaLembretes, setAceitaLembretes] = useState(false);

    function handleCriarConta() {
    const cadastroCompleto = { ...dados, aceitaLembretes };

        entrar({
      nome: cadastroCompleto.nome,
      email: cadastroCompleto.email ?? '',
      cpf: cadastroCompleto.cpf,
      nascimento: cadastroCompleto.nascimento,
      aceitaLembretes,
      tipo: 'paciente',
    });
    limparDados();

    if (router.canDismiss()) router.dismissAll();
    router.replace('/paciente/inicio');
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

          <CheckboxCard
            marcado={aceitaLembretes}
            onPress={() => setAceitaLembretes(!aceitaLembretes)}
          >
            Aceito receber lembretes de consultas, avisos de sessões e orientações
            informativas por e-mail.
          </CheckboxCard>
        </View>

        {/* Só libera se aceitar os termos (o segundo é opcional) */}
        <AppButton
          titulo="Criar minha conta"
          icone="person-add-outline"
          desabilitado={!aceitaTermos}
          onPress={handleCriarConta}
        />
      </ScrollView>
    </SafeAreaView>
  );
}