import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import Checkbox from '@/components/Checkbox';
import { styles } from '@/styles/login/login.styles';
import { colors } from '@/styles/colors';
import { rotaInicial, useAuth } from '@/contexts/AuthContext';
import { mensagemDeErro } from '@/services/api';
import { validarEmail } from '@/utils/validacoes';

type Erros = {
  email?: string;
  senha?: string;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(true);
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const { entrar } = useAuth();

  async function handleEntrar() {
    // Mesmas regras do LoginRequestDTO: e-mail válido e senha preenchida
    const novosErros: Erros = {
      email: validarEmail(email),
      senha: senha ? undefined : 'Digite sua senha.',
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    setEnviando(true);
    try {
      const { usuario, estudante } = await entrar(email, senha, lembrar);
      // Fecha as telas anteriores e abre a área certa (o perfil vem do backend)
      if (router.canDismiss()) router.dismissAll();
      router.replace(rotaInicial(usuario, estudante));
    } catch (erro) {
      Alert.alert('Não foi possível entrar', mensagemDeErro(erro));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Faz a tela subir quando o teclado abre */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AppHeader />

          {/* Card de boas-vindas */}
          <View style={styles.cardBoasVindas}>
            <View style={styles.selo}>
              <Ionicons name="shield-checkmark" size={14} color={colors.primaria} />
              <Text style={styles.seloTexto}>Acolhimento Supervisionado</Text>
            </View>
            <Text style={styles.titulo}>Bem-vindo de volta</Text>
            <Text style={styles.subtitulo}>
              Acesse sua conta para continuar seus atendimentos com serenidade e
              privacidade.
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.cardForm}>
            <AppInput
              label="E-mail"
              icone="mail-outline"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              erro={erros.email}
            />

            <AppInput
              label="Senha"
              icone="lock-closed-outline"
              placeholder="Digite sua senha de acesso"
              value={senha}
              onChangeText={setSenha}
              senha
              erro={erros.senha}
            />

            <View style={styles.linhaOpcoes}>
              <Checkbox
                label="Manter conectado"
                marcado={lembrar}
                onPress={() => setLembrar(!lembrar)}
              />
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Esqueci minha senha',
                    'A redefinição de senha ainda não está disponível no app. Fale com a equipe da clínica-escola pela área de Ajuda.'
                  )
                }
              >
                <Text style={styles.link}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>

            <AppButton
              titulo="Entrar"
              icone="log-in-outline"
              carregando={enviando}
              onPress={handleEntrar}
            />
          </View>

          {/* Divisor */}
          <View style={styles.divisor}>
            <View style={styles.divisorLinha} />
            <Text style={styles.divisorTexto}>ou</Text>
            <View style={styles.divisorLinha} />
          </View>

          {/* Criar conta */}
          <View style={styles.cardCadastro}>
            <Text style={styles.cadastroTexto}>Ainda não tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
              <Text style={styles.cadastroLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
