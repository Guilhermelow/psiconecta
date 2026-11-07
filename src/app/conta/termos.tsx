import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';
import { styles } from '@/styles/conta/termos.styles';
import { colors } from '@/styles/colors';

// ⚠️ Textos de exemplo: precisam ser revisados pela instituição antes de publicar
const SECOES = [
  {
    icone: 'school-outline',
    titulo: 'Supervisão acadêmica',
    texto:
      'Os atendimentos são realizados por estudantes de Psicologia em formação prática, sob supervisão e orientação contínua de professores habilitados e registrados no Conselho de Psicologia.',
  },
  {
    icone: 'lock-closed-outline',
    titulo: 'Confidencialidade e sigilo',
    texto:
      'Seus relatos e informações são tratados com total confidencialidade, conforme o Código de Ética Profissional do Psicólogo.',
  },
  {
    icone: 'document-text-outline',
    titulo: 'Uso dos seus dados',
    texto:
      'Usamos seus dados apenas para organizar seus atendimentos, enviar avisos e cumprir obrigações legais. Eles não são vendidos nem usados para publicidade.',
  },
  {
    icone: 'calendar-outline',
    titulo: 'Agendamentos e cancelamentos',
    texto:
      'Consultas podem ser canceladas ou reagendadas pelo app até 4 horas antes do horário marcado.',
  },
  {
    icone: 'person-circle-outline',
    titulo: 'Seus direitos (LGPD)',
    texto:
      'Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento, pela área de Ajuda e suporte.',
  },
] as const;

export default function Termos() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Termos e privacidade" />

        <Text style={styles.intro}>
          Sua privacidade e o sigilo dos seus atendimentos são nossas maiores prioridades.
          Veja como cuidamos disso.
        </Text>

        <View style={styles.lista}>
          {SECOES.map((secao) => (
            <View key={secao.titulo} style={styles.card}>
              <View style={styles.icone}>
                <Ionicons name={secao.icone} size={18} color={colors.primaria} />
              </View>
              <View style={styles.textos}>
                <Text style={styles.titulo}>{secao.titulo}</Text>
                <Text style={styles.texto}>{secao.texto}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.atualizacao}>Última atualização: novembro de 2026</Text>
      </ScrollView>
    </SafeAreaView>
  );
}