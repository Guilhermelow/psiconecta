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
import NoticeCard from '@/components/NoticeCard';
import { mascaraCPF, mascaraData } from '@/utils/mascaras';
import { styles } from '@/styles/cadastro/paciente/paciente.styles';
import { colors } from '@/styles/colors';
import { useCadastro } from '@/contexts/CadastroContext';

// Lista dos campos que podem ter erro
type Erros = {
  nome?: string;
  cpf?: string;
  nascimento?: string;
  email?: string;
  senha?: string;
  confirmar?: string;
};

export default function CadastroPaciente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const { atualizarDados } = useCadastro();

  function validar(): Erros {
    const e: Erros = {};

    if (nome.trim().split(/\s+/).length < 2) {
      e.nome = 'Digite seu nome completo.';
    }
    if (cpf.replace(/\D/g, '').length !== 11) {
      e.cpf = 'O CPF precisa ter 11 números.';
    }
    if (nascimento.length !== 10) {
      e.nascimento = 'Use o formato DD/MM/AAAA.';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      e.email = 'Digite um e-mail válido.';
    }
    if (senha.length < 8 || !/[\d\W_]/.test(senha)) {
      e.senha = 'Mínimo 8 caracteres e 1 número ou caractere especial.';
    }
    if (!confirmar || confirmar !== senha) {
      e.confirmar = 'As senhas não conferem.';
    }

    return e;
  }

  function handleContinuar() {
    const novosErros = validar();
    setErros(novosErros);

    // Se tiver algum erro, para aqui
    if (Object.keys(novosErros).length > 0) return;

        // Guarda os dados na "mochila" e vai pro passo 3
    atualizarDados({ tipo: 'paciente', nome, cpf, nascimento, email, senha });
    router.push('/cadastro/paciente/termos');
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
          <StepHeader passoAtual={2} totalPassos={3} />

          <View style={styles.selo}>
            <Ionicons name="shield-checkmark" size={14} color={colors.verde} />
            <Text style={styles.seloTexto}>Ambiente confidencial e seguro</Text>
          </View>

          <Text style={styles.titulo}>Seus dados pessoais</Text>
          <Text style={styles.subtitulo}>
            Preencha suas informações para organizarmos seus atendimentos
            psicológicos sob sigilo e acolhimento.
          </Text>

          <AppInput
            label="Nome completo"
            icone="person-outline"
            placeholder="Seu nome completo"
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
            label="E-mail institucional ou pessoal"
            icone="at-outline"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            fundoBranco
            erro={erros.email}
          />

          <AppInput
            label="Crie sua senha"
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
            icone="refresh-outline"
            placeholder="Repita sua senha"
            value={confirmar}
            onChangeText={setConfirmar}
            senha
            fundoBranco
            erro={erros.confirmar}
          />

          <View style={styles.avisos}>
            <NoticeCard
              icone="information-circle-outline"
              titulo="Requisitos de segurança:"
              texto="Mínimo de 8 caracteres • 1 número ou caractere especial para proteger seu prontuário ético."
            />
            <NoticeCard
              icone="school-outline"
              titulo="Supervisão Acadêmica Ativa"
              texto="Seus dados são protegidos sob a Resolução CFP nº 011/2018."
            />
          </View>

          <AppButton titulo="Continuar" icone="arrow-forward" onPress={handleContinuar} />

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