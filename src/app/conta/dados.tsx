import { useState } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, Platform, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { mensagemDeErro } from '@/services/api';
import * as servicoPaciente from '@/services/paciente';
import * as servicoEstudante from '@/services/estudante';
import {
  validarNome,
  validarNascimentoOpcional,
  validarTelefoneOpcional,
} from '@/utils/validacoes';
import { mascaraData, mascaraTelefone, ocultarCPF } from '@/utils/mascaras';
import { dataBrParaIso, dataIsoParaBr } from '@/utils/conversoes';
import { styles } from '@/styles/conta/dados.styles';

type Erros = {
  nome?: string;
  nascimento?: string;
  telefone?: string;
};

// Paciente: PUT /api/paciente/perfil (nome, dataNascimento, telefone)
// Estudante: PUT /api/estudante/perfil (aqui só o nome; o resto fica no perfil profissional)
// E-mail, CPF, universidade e matrícula não podem ser alterados pela API.
export default function DadosPessoais() {
  const { usuario, perfilPaciente, perfilEstudante, atualizarPerfilPaciente, atualizarPerfilEstudante } =
    useAuth();
  const ehPaciente = usuario?.perfil === 'PACIENTE';

  const nascimentoInicial = dataIsoParaBr(perfilPaciente?.dataNascimento);
  const telefoneInicial = perfilPaciente?.telefone ?? '';

  const [nome, setNome] = useState(usuario?.nome ?? '');
  const [nascimento, setNascimento] = useState(nascimentoInicial);
  const [telefone, setTelefone] = useState(telefoneInicial);
  const [erros, setErros] = useState<Erros>({});
  const [salvando, setSalvando] = useState(false);

  if (!usuario) return <Redirect href="/boas-vindas" />;

  const perfilCarregado = ehPaciente ? !!perfilPaciente : !!perfilEstudante;

  // Só libera o botão se algo mudou
  const mudou =
    nome.trim() !== usuario.nome ||
    (ehPaciente && (nascimento !== nascimentoInicial || telefone !== telefoneInicial));

  async function salvar() {
    const novosErros: Erros = {
      nome: validarNome(nome),
      nascimento: ehPaciente ? validarNascimentoOpcional(nascimento) : undefined,
      telefone: ehPaciente ? validarTelefoneOpcional(telefone) : undefined,
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    setSalvando(true);
    try {
      if (ehPaciente) {
        atualizarPerfilPaciente(
          await servicoPaciente.atualizarPerfil({
            nome: nome.trim(),
            dataNascimento: nascimento ? dataBrParaIso(nascimento) : null,
            telefone: telefone || null,
          })
        );
      } else if (perfilEstudante) {
        // O PUT do estudante exige todos os campos: reenvia os atuais
        atualizarPerfilEstudante(
          await servicoEstudante.atualizarPerfil({
            nome: nome.trim(),
            periodo: perfilEstudante.periodo,
            bio: perfilEstudante.bio,
            modalidade: perfilEstudante.modalidade,
            areasAtendimentoIds: perfilEstudante.areasAtendimento.map((area) => area.id),
          })
        );
      }
      router.back();
    } catch (erro) {
      Alert.alert('Não foi possível salvar', mensagemDeErro(erro));
    } finally {
      setSalvando(false);
    }
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
            maxLength={150}
            fundoBranco
            erro={erros.nome}
          />

          {ehPaciente && (
            <>
              <AppInput
                label="Data de nascimento"
                etiquetaDireita="Opcional"
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
                label="Telefone"
                etiquetaDireita="Opcional"
                icone="call-outline"
                placeholder="(81) 90000-0000"
                value={telefone}
                onChangeText={(texto) => setTelefone(mascaraTelefone(texto))}
                keyboardType="phone-pad"
                maxLength={15}
                fundoBranco
                erro={erros.telefone}
              />
            </>
          )}

          <Text style={styles.secaoTitulo}>Identificação</Text>
          <AppInput label="E-mail" icone="mail-outline" value={usuario.email} editable={false} />

          {ehPaciente ? (
            <AppInput
              label="CPF"
              icone="id-card-outline"
              value={perfilPaciente?.cpf ? ocultarCPF(perfilPaciente.cpf) : 'Não informado'}
              editable={false}
              dica="Para corrigir o e-mail ou o CPF, fale com o suporte."
            />
          ) : (
            <>
              <AppInput
                label="Universidade"
                icone="school-outline"
                value={perfilEstudante?.universidade ?? ''}
                editable={false}
              />
              <AppInput
                label="Matrícula"
                icone="id-card-outline"
                value={perfilEstudante?.matricula ?? ''}
                editable={false}
                dica="Para corrigir o e-mail, a universidade ou a matrícula, fale com o suporte."
              />
            </>
          )}

          <View style={styles.botao}>
            <AppButton
              titulo="Salvar alterações"
              icone="checkmark"
              desabilitado={!mudou || !perfilCarregado}
              carregando={salvando}
              onPress={salvar}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
