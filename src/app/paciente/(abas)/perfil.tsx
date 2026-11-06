import { View, Text, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import PatientHeader from '@/components/PatientHeader';
import MenuItem from '@/components/MenuItem';
import { useAuth } from '@/contexts/AuthContext';
import { useConsultas } from '@/contexts/ConsultasContext';
import { situacaoDaConsulta } from '@/utils/consultas';
import { styles } from '@/styles/paciente/perfil.styles';
import { colors } from '@/styles/colors';

export default function PerfilPaciente() {
  const { usuario, sair, atualizarUsuario } = useAuth();
  const { consultas } = useConsultas();

  const realizadas = consultas.filter((c) => situacaoDaConsulta(c) === 'concluida').length;
  const proximas = consultas.filter((c) => situacaoDaConsulta(c) === 'proxima').length;

  // Versão lida do app.json
  const versao = Constants.expoConfig?.version ?? '1.0.0';

  function handleSair() {
    sair();
    router.replace('/boas-vindas');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <PatientHeader />

        <Text style={styles.titulo}>Meu perfil</Text>

        {/* Card do perfil */}
        <View style={styles.cardPerfil}>
          <Image
            source={require('../../../../assets/avatar-padrao.png')}
            style={styles.foto}
          />
          <Text style={styles.nome}>{usuario?.nome || 'Paciente'}</Text>
          <Text style={styles.email}>{usuario?.email}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>Paciente</Text>
          </View>

                   {/* Números (só informação) */}
          <View style={styles.estatisticas}>
            <View style={styles.estatistica}>
              <Text style={styles.estatisticaNumero}>{realizadas}</Text>
              <Text style={styles.estatisticaTexto}>Consultas realizadas</Text>
            </View>
            <View style={styles.estatistica}>
              <Text style={[styles.estatisticaNumero, styles.estatisticaNumeroVerde]}>
                {proximas}
              </Text>
              <Text style={styles.estatisticaTexto}>Próximas sessões</Text>
            </View>
          </View>
        </View>

        {/* Minha conta */}
        <Text style={styles.secaoTitulo}>Minha conta</Text>
        <View style={styles.grupo}>
          <MenuItem
            icone="person-outline"
            titulo="Dados pessoais"
            subtitulo="Nome, e-mail e identificação"
            onPress={() => router.push('/paciente/conta/dados')}
          />
          <View style={styles.divisor} />
          <MenuItem
            icone="mail-outline"
            titulo="Lembretes por e-mail"
            subtitulo="Avisos sobre suas sessões"
            direita={
              <Switch
                value={!!usuario?.aceitaLembretes}
                onValueChange={(valor) => atualizarUsuario({ aceitaLembretes: valor })}
                trackColor={{ true: colors.primaria, false: colors.borda }}
                thumbColor={colors.branco}
              />
            }
          />
        </View>

        {/* Ajuda e informações */}
        <Text style={styles.secaoTitulo}>Ajuda e informações</Text>
        <View style={styles.grupo}>
          <MenuItem
            icone="help-buoy-outline"
            titulo="Ajuda e suporte"
            subtitulo="Dúvidas frequentes, contato e sobre o projeto"
            onPress={() => router.push('/paciente/conta/ajuda')}
          />
          <View style={styles.divisor} />
          <MenuItem
            icone="shield-checkmark-outline"
            titulo="Termos e privacidade"
            subtitulo="Sigilo profissional e LGPD"
            onPress={() => router.push('/paciente/conta/termos')}
          />
        </View>

        {/* Sair */}
        <TouchableOpacity style={styles.botaoSair} onPress={handleSair} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={colors.erro} />
          <Text style={styles.botaoSairTexto}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>
          Psiconecta v{versao} • Clínica-escola de Psicologia
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}