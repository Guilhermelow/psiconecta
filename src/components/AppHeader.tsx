import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/styles/components/appHeader.styles';
import { colors } from '@/styles/colors';

type Props = {
  mostrarVoltar?: boolean;
  mostrarLogo?: boolean;
  titulo?: string; // se tiver, mostra o título no lugar da logo
};

export default function AppHeader({ mostrarVoltar = true, mostrarLogo = true, titulo }: Props) {
  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/boas-vindas');
    }
  }

  const botaoVoltar = mostrarVoltar ? (
    <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
      <Ionicons name="arrow-back" size={20} color={colors.titulo} />
    </TouchableOpacity>
  ) : (
    <View style={styles.espaco} />
  );

  // ===== Modelo com título =====
  if (titulo) {
    return (
      <View style={styles.container}>
        <View style={styles.tituloLinha}>
          {botaoVoltar}
          <Text style={styles.titulo}>{titulo}</Text>
        </View>
      </View>
    );
  }

  // ===== Modelo com logo (padrão) =====
  return (
    <View style={styles.container}>
      {botaoVoltar}

      {mostrarLogo && (
        <>
          <View style={styles.marca}>
            <Image
              source={require('../../assets/psiconecta-logo.png')}
              style={styles.logo}
            />
            <Text style={styles.marcaTexto}>Psiconecta</Text>
          </View>
          <View style={styles.espaco} />
        </>
      )}
    </View>
  );
}