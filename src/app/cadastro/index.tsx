import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import AccountTypeCard from '@/components/AccountTypeCard';
import { styles } from '@/styles/cadastro/cadastro.styles';
import { colors } from '@/styles/colors';

type TipoConta = 'paciente' | 'estudante';

export default function EscolhaTipoConta() {
  // Começa sem nada escolhido
  const [tipo, setTipo] = useState<TipoConta | null>(null);

  function handleContinuar() {
    if (tipo === 'paciente') {
      router.push('/cadastro/paciente');
    } else if (tipo === 'estudante') {
      router.push('/cadastro/estudante');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader mostrarLogo={false} />

        <Text style={styles.titulo}>Como você deseja utilizar o Psiconecta?</Text>
        <Text style={styles.subtitulo}>
          Selecione o seu perfil para personalizarmos sua experiência com segurança.
        </Text>

        <View style={styles.cards}>
          <AccountTypeCard
            icone="hand-heart"
            titulo="Paciente"
            tag="Cuidado"
            descricao="Encontre estudantes de Psicologia e agende seu atendimento com facilidade."
            iconeDestaque="check-circle-outline"
            destaque="Consultas acessíveis • Horários flexíveis"
            selecionado={tipo === 'paciente'}
            onPress={() => setTipo('paciente')}
          />

          <AccountTypeCard
            icone="school"
            titulo="Estudante de Psicologia"
            tag="Formação"
            descricao="Organize sua agenda e realize atendimentos durante sua formação universitária."
            iconeDestaque="shield-check-outline"
            destaque="Requer verificação de matrícula acadêmica"
            selecionado={tipo === 'estudante'}
            onPress={() => setTipo('estudante')}
          />
        </View>

        <View style={styles.aviso}>
          <MaterialCommunityIcons name="shield-check-outline" size={20} color={colors.primaria} />
          <Text style={styles.avisoTexto}>
            Os atendimentos são supervisionados academicamente por instituições conveniadas.
          </Text>
        </View>

        <AppButton
          titulo="Continuar"
          icone="arrow-forward"
          desabilitado={tipo === null}
          onPress={handleContinuar}
        />
      </ScrollView>
    </SafeAreaView>
  );
}