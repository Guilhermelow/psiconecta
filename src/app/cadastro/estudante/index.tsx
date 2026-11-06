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
import { router } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import { useCadastro } from '@/contexts/CadastroContext';
import { mascaraCPF, mascaraData } from '@/utils/mascaras';
import {
  validarNome,
  validarCPF,
  validarData,
  validarEmail,
  validarSenha,
  validarConfirmacao,
} from '@/utils/validacoes';
import { styles } from '@/styles/cadastro/estudante/estudante.styles';

type Erros = {
  nome?: string;
  cpf?: string;
  nascimento?: string;
  email?: string;
  senha?: string;
  confirmar?: string;
};

export default function CadastroEstudante() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const { atualizarDados } = useCadastro();

  function handleContinuar() {
    const novosErros: Erros = {
      nome: validarNome(nome),
      cpf: validarCPF(cpf),
      nascimento: validarData(nascimento),
      email: validarEmail(email),
      senha: validarSenha(senha),
      confirmar: validarConfirmacao(senha, confirmar),
    };
    setErros(novosErros);

    // Se algum campo tiver mensagem de erro, para aqui
    const temErro = Object.values(novosErros).some(Boolean);
    if (temErro) return;

    atualizarDados({ tipo: 'estudante', nome, cpf, nascimento, email, senha });
    router.push('/cadastro/estudante/academico');
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
          <StepHeader passoAtual={1} totalPassos={3} etiqueta="Formação em Psicologia" />

          <Text style={styles.titulo}>Seus dados de acesso</Text>
          <Text style={styles.subtitulo}>
            Informe seus dados cadastrais para iniciar sua jornada de atendimentos
            supervisionados no Psiconecta.
          </Text>

          <View style={styles.cardTopo}>
            <NoticeCard
              icone="heart-circle-outline"
              titulo="Clínica-Escola Digital"
              texto="Prática ética supervisionada por docentes"
            />
          </View>

          <AppInput
            label="Nome completo"
            icone="person-outline"
            placeholder="Ex: Lucas Ferreira dos Santos"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            fundoBranco
            erro={erros.nome}
          />

          <AppInput
            label="CPF"
            icone="id-card-outline"
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={(texto) => setCpf(mascaraCPF(texto))}
            keyboardType="numeric"
            maxLength={14}
            fundoBranco
            erro={erros.cpf}
          />

          <AppInput
            label="Data de nascimento"
            icone="calendar-outline"
            placeholder="DD/MM/AAAA"
            value={nascimento}
            onChangeText={(texto) => setNascimento(mascaraData(texto))}
            keyboardType="numeric"
            maxLength={10}
            fundoBranco
            erro={erros.nascimento}
          />

          <AppInput
            label="E-mail institucional ou principal"
            etiquetaDireita="Recomendado"
            icone="mail-outline"
            placeholder="lucas.ferreira@universidade.edu.br"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            dica="Preferencialmente seu e-mail universitário para validação rápida."
            fundoBranco
            erro={erros.email}
          />

          <AppInput
            label="Senha"
            icone="lock-closed-outline"
            placeholder="Mínimo 8 dígitos"
            value={senha}
            onChangeText={setSenha}
            senha
            fundoBranco
            erro={erros.senha}
          />

          <AppInput
            label="Confirmar senha"
            icone="shield-checkmark-outline"
            placeholder="Repita sua senha"
            value={confirmar}
            onChangeText={setConfirmar}
            senha
            fundoBranco
            erro={erros.confirmar}
          />

          <View style={styles.cardFinal}>
            <NoticeCard
              icone="shield-checkmark"
              titulo="Cadastro acadêmico protegido"
              texto="Seus dados cadastrais serão validados junto à sua instituição de ensino superior e respeitam as diretrizes do Código de Ética Profissional do Psicólogo e da LGPD."
            />
          </View>

          <AppButton
            titulo="Continuar para Dados Acadêmicos"
            icone="arrow-forward"
            onPress={handleContinuar}
          />

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.rodapeLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}