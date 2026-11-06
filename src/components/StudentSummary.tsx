import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VerifiedBadge from '@/components/VerifiedBadge';
import { Estudante } from '@/mocks/estudantes';
import { styles } from '@/styles/components/studentSummary.styles';
import { colors } from '@/styles/colors';

type Props = {
  estudante: Estudante;
};

export default function StudentSummary({ estudante }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Image
          source={
            estudante.foto
              ? { uri: estudante.foto }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />
        <View style={styles.textos}>
          <Text style={styles.nome}>{estudante.nome}</Text>
          <VerifiedBadge />
          <Text style={styles.curso}>
            Estudante de Psicologia — {estudante.periodo} período • {estudante.instituicao}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <Ionicons name="time-outline" size={14} color={colors.primaria} />
        <Text style={styles.infoTexto}>50 min • Online supervisionado</Text>
      </View>

      <View style={styles.supervisao}>
        <Ionicons name="school-outline" size={14} color={colors.primaria} />
        <Text style={styles.supervisaoTexto} numberOfLines={1}>
          Supervisão: {estudante.supervisor}
        </Text>
      </View>
    </View>
  );
}