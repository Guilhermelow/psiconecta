import { View, Text, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '@/components/AppButton';
import { useCadastro } from '@/contexts/CadastroContext';
import { nomeCurto, iniciais } from '@/utils/nomes';
import { styles } from '@/styles/cadastro/estudante/aprovado.styles';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const PROXIMOS_PASSOS = [
  {
    titulo: 'Identidade Acolhedora',
    texto: 'Personalize seu perfil profissional com sua foto e biografia.',
  },
  {
    titulo: 'Áreas de Foco',
    texto: 'Selecione suas áreas de interesse (ex: Ansiedade, Estresse).',
  },
  {
    titulo: 'Agenda Segura',
    texto: 'Defina seus dias e horários livres para atendimento.',
  },
];

export default function CadastroAprovado() {
    const { dados, limparDados } = useCadastro();
  const { entrar } = useAuth();

    function entrarComoEstudante() {
    entrar({
      nome: dados.nome,
      email: dados.email ?? '',
      tipo: 'estudante',
      cpf: dados.cpf,
      nascimento: dados.nascimento,
      periodo: dados.periodo,
      instituicao: dados.instituicao,
    });
    limparDados();

    if (router.canDismiss()) router.dismissAll();
    router.replace('/estudante/inicio');
  }

  function irParaInicio() {
    entrarComoEstudante();
  }

  // Entra e já abre a edição do perfil por cima da Home
  function configurarPerfil() {
    entrarComoEstudante();
    router.push('/estudante/perfil-profissional');
  }

  // Depois esses dados virão do servidor. Por enquanto, da "mochila".
  const nome = nomeCurto(dados.nome) || 'Seu nome';
  const curso = [
    'Estudante de Psicologia',
    dados.periodo ? `${dados.periodo} período` : null,
  ]
    .filter(Boolean)
    .join(' — ');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Topo */}
        <View style={styles.topo}>
          <View style={styles.iconeCirculo}>
            <MaterialCommunityIcons name="check-decagram" size={48} color={colors.verde} />
          </View>

          <View style={styles.status}>
            <View style={styles.statusPonto} />
            <Text style={styles.statusTexto}>Vínculo confirmado</Text>
          </View>

          <Text style={styles.titulo}>Cadastro aprovado!</Text>
          <Text style={styles.subtitulo}>
            Seu vínculo acadêmico foi confirmado. Agora você pode configurar seu perfil e
            sua disponibilidade para começar seus atendimentos supervisionados.
          </Text>
        </View>

        {/* Prévia do perfil */}
        <View style={styles.cardPreview}>
          <View style={styles.previewTopo}>
            <Text style={styles.previewLabel}>Como você aparecerá para pacientes</Text>
            <Ionicons name="eye-outline" size={16} color={colors.textoClaro} />
          </View>

          <View style={styles.perfil}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>{iniciais(dados.nome) || '?'}</Text>
              <View style={styles.avatarSelo}>
                <Ionicons name="checkmark" size={12} color={colors.branco} />
              </View>
            </View>

            <View style={styles.perfilTextos}>
              <Text style={styles.perfilNome}>{nome}</Text>

              <View style={styles.verificado}>
                <Ionicons name="checkmark" size={12} color={colors.verde} />
                <Text style={styles.verificadoTexto}>Estudante verificado</Text>
              </View>

              <Text style={styles.perfilCurso} numberOfLines={2}>
                {curso}
                {dados.instituicao ? ` • ${dados.instituicao}` : ''}
              </Text>

              <View style={styles.supervisao}>
                <Ionicons name="shield-checkmark" size={12} color={colors.verde} />
                <Text style={styles.supervisaoTexto}>Supervisão Clínica Ativa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Próximos passos */}
        <Text style={styles.secaoTitulo}>Próximos passos</Text>
        <View style={styles.passos}>
          {PROXIMOS_PASSOS.map((passo, index) => (
            <View key={passo.titulo} style={styles.passo}>
              <View style={styles.passoNumero}>
                <Text style={styles.passoNumeroTexto}>{index + 1}</Text>
              </View>
              <View style={styles.passoTextos}>
                <Text style={styles.passoTitulo}>{passo.titulo}</Text>
                <Text style={styles.passoTexto}>{passo.texto}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botões (as telas de destino ainda serão criadas) */}
        <View style={styles.botoes}>
          <AppButton
            titulo="Configurar meu perfil"
            icone="arrow-forward"
            onPress={configurarPerfil}
          />
          <AppButton
            titulo="Ir para a tela inicial"
            variante="secundario"
            onPress={irParaInicio}
          />
        </View>

        <View style={styles.rodape}>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.textoClaro} />
          <Text style={styles.rodapeTexto}>
            Atendimentos conduzidos sob diretrizes de ética e sigilo profissional.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}