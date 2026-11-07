import { useState } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import FilterChips from '@/components/FilterChips';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/estudante/perfilProfissional.styles';
import { colors } from '@/styles/colors';

const MAX_SOBRE = 400;
const MAX_FOCOS = 5;

const ABORDAGENS = [
  'TCC',
  'Psicanálise',
  'Humanista',
  'Sistêmica',
  'Gestalt-terapia',
  'Análise do Comportamento',
];

const FOCOS = [
  'Ansiedade',
  'Autoconhecimento',
  'Estresse',
  'Relacionamentos',
  'Luto',
  'Autoestima',
  'Foco acadêmico',
  'Transição de carreira',
  'Relações familiares',
];

export default function PerfilProfissional() {
  const { usuario, atualizarUsuario } = useAuth();

  const [sobre, setSobre] = useState(usuario?.sobre ?? '');
  const [abordagem, setAbordagem] = useState(usuario?.abordagem ?? '');
  const [focos, setFocos] = useState<string[]>(usuario?.focos ?? []);

  // Só libera o botão se algo mudou
  const mudou =
    sobre.trim() !== (usuario?.sobre ?? '') ||
    abordagem !== (usuario?.abordagem ?? '') ||
    JSON.stringify(focos) !== JSON.stringify(usuario?.focos ?? []);

  // Marca/desmarca um foco (no máximo 5)
  function alternarFoco(foco: string) {
    setFocos((atual) => {
      if (atual.includes(foco)) return atual.filter((item) => item !== foco);
      if (atual.length >= MAX_FOCOS) return atual;
      return [...atual, foco];
    });
  }

  function salvar() {
    atualizarUsuario({ sobre: sobre.trim(), abordagem, focos });
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
          <AppHeader titulo="Perfil profissional" />

          <NoticeCard
            icone="eye-outline"
            texto="Essas informações aparecem no seu perfil para os pacientes. Escreva de forma acolhedora e objetiva."
          />

          {/* Apresentação */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={styles.rotulo}>Apresentação</Text>
              <Text style={styles.contador}>
                {sobre.length}/{MAX_SOBRE}
              </Text>
            </View>
            <TextInput
              style={styles.textarea}
              value={sobre}
              onChangeText={setSobre}
              maxLength={MAX_SOBRE}
              multiline
              textAlignVertical="top"
              placeholder="Conte aos pacientes como você conduz os atendimentos e o que eles podem esperar."
              placeholderTextColor={colors.textoClaro}
            />
          </View>

          {/* Abordagem (uma escolha) */}
          <View style={styles.secao}>
            <Text style={[styles.rotulo, { marginBottom: 8 }]}>Abordagem</Text>
            <FilterChips
              opcoes={ABORDAGENS}
              selecionado={abordagem}
              onSelecionar={setAbordagem}
              quebrarLinha
            />
          </View>

          {/* Áreas de foco (várias escolhas) */}
          <View style={styles.secao}>
            <View style={styles.rotuloLinha}>
              <Text style={styles.rotulo}>Áreas de foco</Text>
              <Text style={styles.contador}>
                {focos.length} de {MAX_FOCOS}
              </Text>
            </View>
            <Text style={styles.ajuda}>Escolha até {MAX_FOCOS} áreas.</Text>
            <FilterChips
              opcoes={FOCOS}
              selecionado={focos}
              onSelecionar={alternarFoco}
              quebrarLinha
            />
          </View>
        </ScrollView>

        {/* Botão fixo */}
        <View style={styles.rodape}>
          <AppButton
            titulo="Salvar perfil"
            icone="checkmark"
            desabilitado={!mudou}
            onPress={salvar}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}