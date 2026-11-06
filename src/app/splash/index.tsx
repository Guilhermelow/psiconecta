import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/styles/splash/splash.styles';
import { colors } from '@/styles/colors';
import LoadingDots from '@/components/LoadingDots';

export default function Splash() {
  // Espera 3 segundos e vai para o login
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/boas-vindas'); // "replace" impede de voltar pra splash
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Selo do topo */}
      <View style={styles.badgeTopo}>
        <Ionicons name="shield-checkmark" size={14} color={colors.verde} />
        <Text style={styles.badgeTopoTexto}>
          Clínica <Text style={styles.negrito}>Escola Segura</Text>
        </Text>
      </View>

      {/* Conteúdo central */}
      <View style={styles.conteudo}>
        <Image
          source={require('../../../assets/psiconecta-logo.png')}
          style={styles.logo}
        />

        <Text style={styles.titulo}>Psiconecta</Text>
        <Text style={styles.subtitulo}>
          Conectando pessoas ao cuidado que importa.
        </Text>

        <View style={styles.selo}>
          <View style={styles.seloPonto} />
          <Text style={styles.seloTexto}>Ambiente Acadêmico Monitorado</Text>
        </View>

        <LoadingDots />
      </View>

      {/* Rodapé */}
      <Text style={styles.rodape}>
        Atendimento formativo sob supervisão acadêmica
      </Text>
    </SafeAreaView>
  );
}