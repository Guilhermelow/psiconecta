import { useState } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import FilterChips from '@/components/FilterChips';
import AreaChips from '@/components/AreaChips';
import ModalidadeOptions from '@/components/ModalidadeOptions';
import { useAuth } from '@/contexts/AuthContext';
import { useAreasAtendimento } from '@/hooks/useAreasAtendimento';
import { atualizarPerfil } from '@/services/estudante';
import { mensagemDeErro } from '@/services/api';
import type { ModalidadeAtendimento } from '@/types/api';
import { styles } from '@/styles/estudante/perfilProfissional.styles';
import { colors } from '@/styles/colors';

const MAX_BIO = 2000; // AtualizacaoEstudanteDTO.bio
const PERIODOS = [5, 6, 7, 8, 9, 10, 11, 12]; // backend aceita 1 a 12
const rotuloPeriodo = (periodo: number) => `${periodo}º`;

// PUT /api/estudante/perfil: o backend exige nome, período, modalidade e áreas em toda atualização
export default function PerfilProfissional() {
  const { usuario, perfilEstudante, atualizarPerfilEstudante } = useAuth();
  const areas = useAreasAtendimento();

  const idsIniciais = perfilEstudante?.areasAtendimento.map((area) => area.id) ?? [];
  const [bio, setBio] = useState(perfilEstudante?.bio ?? '');
  const [periodo, setPeriodo] = useState(perfilEstudante?.periodo ?? 5);
  const [modalidade, setModalidade] = useState<ModalidadeAtendimento | null>(
    perfilEstudante?.modalidade ?? null
  );
  const [areasIds, setAreasIds] = useState<number[]>(idsIniciais);
  const [salvando, setSalvando] = useState(false);

  if (!usuario || !perfilEstudante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Perfil profissional" />
          <Text style={styles.ajuda}>Não foi possível carregar seu perfil. Volte e tente de novo.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const ordenar = (ids: number[]) => [...ids].sort((a, b) => a - b).join(',');
  const mudou =
    bio.trim() !== (perfilEstudante.bio ?? '') ||
    periodo !== perfilEstudante.periodo ||
    modalidade !== perfilEstudante.modalidade ||
    ordenar(areasIds) !== ordenar(idsIniciais);

  async function salvar() {
    if (!usuario || !modalidade) return;
    if (areasIds.length === 0) {
      Alert.alert('Áreas de atendimento', 'Escolha pelo menos uma área de atendimento.');
      return;
    }

    setSalvando(true);
    try {
      atualizarPerfilEstudante(
        await atualizarPerfil({
          nome: usuario.nome,
          periodo,
          bio: bio.trim() || null,
          modalidade,
          areasAtendimentoIds: areasIds,
        })
      );
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
          <AppHeader titulo="Perfil profissional" />

          <NoticeCard
            icone="eye-outline"
            texto="Essas informações aparecem no seu perfil para os pacientes. Escreva de forma acolhedora e objetiva."
          />

          {/* Apresentação (bio) */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={styles.rotulo}>Apresentação</Text>
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
              placeholder="Conte aos pacientes como você conduz os atendimentos e o que eles podem esperar."
              placeholderTextColor={colors.textoClaro}
            />
          </View>

          {/* Período */}
          <View style={styles.secao}>
            <Text style={[styles.rotulo, { marginBottom: 8 }]}>Período atual</Text>
            <FilterChips
              opcoes={PERIODOS.map(rotuloPeriodo)}
              selecionado={rotuloPeriodo(periodo)}
              onSelecionar={(texto) => setPeriodo(parseInt(texto, 10))}
              quebrarLinha
            />
          </View>

          {/* Modalidade */}
          <View style={styles.secao}>
            <Text style={[styles.rotulo, { marginBottom: 8 }]}>Modalidade de atendimento</Text>
            <ModalidadeOptions selecionada={modalidade} onSelecionar={setModalidade} />
          </View>

          {/* Áreas de atendimento */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={styles.rotulo}>Áreas de atendimento</Text>
              <Text style={styles.contador}>
                {areasIds.length} {areasIds.length === 1 ? 'escolhida' : 'escolhidas'}
              </Text>
            </View>
            <Text style={styles.ajuda}>Escolha pelo menos uma área.</Text>
            <AreaChips
              areas={areas.areas}
              carregando={areas.carregando}
              erro={areas.erro}
              onTentarDeNovo={areas.tentarDeNovo}
              selecionadas={areasIds}
              onMudar={setAreasIds}
            />
          </View>
        </ScrollView>

        {/* Botão fixo */}
        <View style={styles.rodape}>
          <AppButton
            titulo="Salvar perfil"
            icone="checkmark"
            desabilitado={!mudou}
            carregando={salvando}
            onPress={salvar}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
