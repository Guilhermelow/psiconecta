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
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const { entrar } = useAuth();

  function handleEntrar() {
    if (!usuario.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha seu e-mail ou CPF e sua senha.');
      return;
    }

    if (senha.length < 8) {
      Alert.alert('Senha inválida', 'Sua senha tem no mínimo 8 caracteres.');
      return;
    }
    // Provisório: sem servidor, todo login entra como paciente.
    // Depois o servidor vai dizer o nome e se é paciente ou estudante.
    entrar({ email: usuario, tipo: 'paciente' });

    // Fecha as telas anteriores e abre a Home
    if (router.canDismiss()) router.dismissAll();
    router.replace('/paciente/inicio');
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
              label="E-mail ou CPF"
              icone="mail-outline"
              placeholder="seu.email@exemplo.com ou 000.000.000-00"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <AppInput
              label="Senha"
              icone="lock-closed-outline"
              placeholder="Digite sua senha de acesso"
              value={senha}
              onChangeText={setSenha}
              senha
            />

            <View style={styles.linhaOpcoes}>
              <Checkbox
                label="Lembrar de mim"
                marcado={lembrar}
                onPress={() => setLembrar(!lembrar)}
              />
              <TouchableOpacity onPress={() => Alert.alert('Em breve', 'Recuperação de senha.')}>
                <Text style={styles.link}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>

            <AppButton titulo="Entrar" icone="log-in-outline" onPress={handleEntrar} />
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