import { View, Text } from 'react-native';
import { styles } from '@/styles/components/nextSteps.styles';

type Passo = {
  titulo: string;
  texto: string;
};

type Props = {
  passos: Passo[];
};

export default function NextSteps({ passos }: Props) {
  return (
    <View style={styles.lista}>
      {passos.map((passo, index) => (
        <View key={passo.titulo} style={styles.passo}>
          <View style={styles.numero}>
            <Text style={styles.numeroTexto}>{index + 1}</Text>
          </View>
          <View style={styles.textos}>
            <Text style={styles.titulo}>{passo.titulo}</Text>
            <Text style={styles.texto}>{passo.texto}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}