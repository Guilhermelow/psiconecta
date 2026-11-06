import { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { validarNome, validarEmail } from '@/utils/validacoes';
import { ocultarCPF } from '@/utils/mascaras';
import { styles } from '@/styles/paciente/conta/dados.styles';

type Erros = {
  nome?: string;
  email?: string;
};

export default function DadosPessoais() {
  const { usuario, atualizarUsuario } = useAuth();
  const [nome, setNome] = useState(usuario?.nome ?? '');
  const [email, setEmail] = useState(usuario?.email ?? '');
  const [erros, setErros] = useState<Erros>({});

  // Só libera o botão se algo mudou
  const mudou =
    nome.trim() !== (usuario?.nome ?? '') || email.trim() !== (usuario?.email ?? '');

  function salvar() {
    const novosErros: Erros = {
      nome: validarNome(nome),
      email: validarEmail(email),
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    // Depois isso também vai para o servidor
    atualizarUsuario({ nome: nome.trim(), email: email.trim() });
    router.back();
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
          <AppHeader titulo="Dados pessoais" />

          <Text style={styles.secaoTitulo}>Você pode alterar</Text>
          <AppInput
            label="Nome completo"
            icone="person-outline"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            fundoBranco
            erro={erros.nome}
          />
          <AppInput
            label="E-mail"
            icone="mail-outline"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            fundoBranco
            erro={erros.email}
          />

          <Text style={styles.secaoTitulo}>Identificação</Text>
          <AppInput
            label="CPF"
            icone="id-card-outline"
            value={usuario?.cpf ? ocultarCPF(usuario.cpf) : 'Não informado'}
            editable={false}
          />
          <AppInput
            label="Data de nascimento"
            icone="calendar-outline"
            value={usuario?.nascimento ?? 'Não informada'}
            editable={false}
            dica="Para corrigir CPF ou data de nascimento, fale com o suporte."
          />

          <View style={styles.botao}>
            <AppButton
              titulo="Salvar alterações"
              icone="checkmark"
              desabilitado={!mudou}
              onPress={salvar}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}