import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
import InfoCard from '@/components/InfoCard';
import { styles } from '@/styles/boas-vindas/boasVindas.styles';
import { colors } from '@/styles/colors';

export default function BoasVindas() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Image
            source={require('../../../assets/psiconecta-logo.png')}
            style={styles.cabecalhoLogo}
          />
          <Text style={styles.cabecalhoTexto}>Psiconecta</Text>
        </View>

        {/* Imagem com faixa */}
        <View style={styles.imagemCaixa}>
          <Image
            source={require('../../../assets/boas-vindas.png')}
            style={styles.imagem}
            resizeMode="cover"
          />
          <View style={styles.imagemFaixa}>
            <View style={styles.faixaEsquerda}>
              <Ionicons name="ear-outline" size={14} color={colors.primaria} />
              <Text style={styles.faixaTextoForte}>Escuta ativa & ética</Text>
            </View>
            <Text style={styles.faixaTexto}>Rede Universitária</Text>
          </View>
        </View>

        {/* Textos */}
        <Text style={styles.titulo}>Seu cuidado começa aqui.</Text>
        <Text style={styles.subtitulo}>
          Encontre estudantes de Psicologia verificados e organize seus
          atendimentos de forma simples e acolhedora.
        </Text>

        {/* Cards */}
        {/* Cards */}
        <View style={styles.cards}>
          <InfoCard
            icone="school"
            titulo="100% Supervisionado"
            descricao="Estudantes vinculados a instituições de ensino superior com respaldo docente contínuo."
            verificado
          />
          <InfoCard
            icone="heart"
            titulo="Acolhimento e Acessibilidade"
            descricao="Atendimentos organizados, sigilosos e estruturados para você iniciar sem barreiras."
          />
        </View>

        {/* Botões */}
        <View style={styles.botoes}>
          <AppButton
            titulo="Criar conta"
            icone="arrow-forward"
            onPress={() => router.push('/cadastro')}
          />
          <AppButton
            titulo="Entrar"
            variante="secundario"
            onPress={() => router.push('/login')}
          />
        </View>

        {/* Termos */}
        <Text style={styles.termos}>
          Ao continuar você concorda com nossos{' '}
          <Text style={styles.link}>Termos de Uso</Text> e{' '}
          <Text style={styles.link}>Privacidade</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}