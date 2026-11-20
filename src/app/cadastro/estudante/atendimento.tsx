import { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import AreaChips from '@/components/AreaChips';
import ModalidadeOptions from '@/components/ModalidadeOptions';
import { useCadastro } from '@/contexts/CadastroContext';
import { useAuth } from '@/contexts/AuthContext';
import { useAreasAtendimento } from '@/hooks/useAreasAtendimento';
import { cadastrarEstudante } from '@/services/cadastro';
import { mensagemDeErro } from '@/services/api';
import type { ModalidadeAtendimento } from '@/types/api';
import { styles } from '@/styles/cadastro/estudante/atendimento.styles';
import { colors } from '@/styles/colors';

const MAX_BIO = 2000; // CadastroEstudanteDTO.bio

type Erros = {
  modalidade?: string;
  areas?: string;
};

// Passo 3: como o estudante atende. Envia o cadastro (POST /api/estudantes).
export default function AtendimentoEstudante() {
  const { dados, limparDados } = useCadastro();
  const { entrar } = useAuth();
  const areas = useAreasAtendimento();

  const [modalidade, setModalidade] = useState<ModalidadeAtendimento | null>(null);
  const [areasIds, setAreasIds] = useState<number[]>([]);
  const [bio, setBio] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);

  async function handleEnviar() {
    const novosErros: Erros = {
      modalidade: modalidade ? undefined : 'Escolha como você atende.',
      areas: areasIds.length > 0 ? undefined : 'Escolha pelo menos uma área de atendimento.',
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean) || !modalidade) return;

    const { nome, email, senha, universidade, matricula, periodo } = dados;
    if (!nome || !email || !senha || !universidade || !matricula || !periodo) {
      Alert.alert('Dados incompletos', 'Volte aos passos anteriores e preencha seus dados.');
      return;
    }

    setEnviando(true);
    try {
      await cadastrarEstudante({
        usuario: { nome, email, senha },
        universidade,
        matricula,
        periodo,
        estagioSupervisionado: dados.estagioSupervisionado === true,
        bio: bio.trim() || null,
        modalidade,
        areasAtendimentoIds: areasIds,
      });
      // O backend permite login de estudante pendente; a tela de análise mostra o status
      await entrar(email, senha);
      limparDados();
      if (router.canDismiss()) router.dismissAll();
      router.replace('/cadastro/estudante/analise');
    } catch (erro) {
      Alert.alert('Não foi possível enviar o cadastro', mensagemDeErro(erro));
    } finally {
      setEnviando(false);
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
          <StepHeader passoAtual={3} totalPassos={3} etiqueta="Formação em Psicologia" />

          <Text style={styles.titulo}>Como você vai atender</Text>
          <Text style={styles.subtitulo}>
            Essas informações aparecem para os pacientes e podem ser alteradas depois no seu
            perfil.
          </Text>

          {/* Modalidade */}
          <View style={styles.secao}>
            <Text style={styles.rotulo}>Modalidade de atendimento</Text>
            <ModalidadeOptions selecionada={modalidade} onSelecionar={setModalidade} />
            {erros.modalidade ? <Text style={styles.erroTexto}>{erros.modalidade}</Text> : null}
          </View>

          {/* Áreas */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={styles.rotulo}>Áreas de atendimento</Text>
              <Text style={styles.contador}>
                {areasIds.length} {areasIds.length === 1 ? 'escolhida' : 'escolhidas'}
              </Text>
            </View>
            <AreaChips
              areas={areas.areas}
              carregando={areas.carregando}
              erro={areas.erro}
              onTentarDeNovo={areas.tentarDeNovo}
              selecionadas={areasIds}
              onMudar={setAreasIds}
            />
            {erros.areas ? <Text style={styles.erroTexto}>{erros.areas}</Text> : null}
          </View>

          {/* Apresentação (opcional) */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={styles.rotulo}>Apresentação (opcional)</Text>
              <Text style={styles.contador}>
                {bio.length}/{MAX_BIO}
              </Text>
            </View>
            <TextInput
              style={styles.textarea}
              value={bio}
              onChangeText={setBio}
              maxLength={MAX_BIO}
              multiline
              textAlignVertical="top"
              placeholder="Conte aos pacientes como você conduz os atendimentos."
              placeholderTextColor={colors.textoClaro}
            />
          </View>

          <View style={styles.aviso}>
            <NoticeCard
              icone="shield-checkmark-outline"
              texto="Depois do envio, a coordenação analisa seu cadastro. Você só aparece para os pacientes após a aprovação."
            />
          </View>

          <AppButton
            titulo="Enviar para análise"
            icone="arrow-forward"
            carregando={enviando}
            onPress={handleEnviar}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
