import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/styles/splash/splash.styles';
import { colors } from '@/styles/colors';
import LoadingDots from '@/components/LoadingDots';
import { rotaInicial, useAuth } from '@/contexts/AuthContext';

const TEMPO_MINIMO = 1500; // para a marca aparecer mesmo quando a sessão carrega rápido

export default function Splash() {
  const { usuario, perfilEstudante, carregando } = useAuth();
  const [tempoPassou, setTempoPassou] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTempoPassou(true), TEMPO_MINIMO);
    return () => clearTimeout(timer);
  }, []);

  // Com sessão salva vai direto para a área certa; sem sessão, para as boas-vindas
  useEffect(() => {
    if (!tempoPassou || carregando) return;
    router.replace(usuario ? rotaInicial(usuario, perfilEstudante) : '/boas-vindas');
  }, [tempoPassou, carregando, usuario, perfilEstudante]);

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