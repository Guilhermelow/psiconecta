import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { styles } from '@/styles/components/loadingDots.styles';

export default function LoadingDots() {
  // Cada bolinha começa apagada (opacidade 0.3)
  const [pontos] = useState(() => [
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]);

  useEffect(() => {
    // Para cada bolinha: acende e depois apaga
    const animacoes = pontos.map((ponto) =>
      Animated.sequence([
        Animated.timing(ponto, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(ponto, { toValue: 0.3, duration: 300, useNativeDriver: true }),
      ])
    );

    // Uma depois da outra (200ms de diferença), repetindo pra sempre
    const loop = Animated.loop(Animated.stagger(200, animacoes));
    loop.start();

    return () => loop.stop(); // para a animação quando sair da tela
  }, [pontos]);

  return (
    <View style={styles.container}>
      {pontos.map((ponto, index) => (
        <Animated.View
          key={index}
          style={[
            styles.ponto,
            {
              opacity: ponto,
              transform: [
                {
                  scale: ponto.interpolate({
                    inputRange: [0.3, 1],
                    outputRange: [0.8, 1.2], // cresce um pouquinho quando acende
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}