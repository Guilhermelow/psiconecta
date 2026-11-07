import { View, Text, Image, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import StudentHeader from '@/components/StudentHeader';
import MenuItem from '@/components/MenuItem';
import NoticeCard from '@/components/NoticeCard';
import AppButton from '@/components/AppButton';
import VerifiedBadge from '@/components/VerifiedBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { SUPERVISOR_EXEMPLO } from '@/mocks/atendimentos';
import { horariosDoDia } from '@/utils/disponibilidade';
import { styles } from '@/styles/estudante/perfil.styles';
import { colors } from '@/styles/colors';

export default function PerfilEstudante() {
  const { usuario, sair } = useAuth();
  const { disponibilidade } = useAtendimentos();

  const horariosSemana = Object.values(disponibilidade).reduce(
    (total, dia) => total + horariosDoDia(dia).length,
    0
  );

  const focos = usuario?.focos ?? [];
  const perfilCompleto = !!usuario?.sobre && !!usuario?.abordagem && focos.length > 0;

  const versao = Constants.expoConfig?.version ?? '1.0.0';

  function handleSair() {
    sair();
    router.replace('/boas-vindas');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StudentHeader />

        <Text style={styles.titulo}>Meu perfil</Text>

        {/* Card principal */}
        <View style={styles.cardPerfil}>
          <Image
            source={require('../../../../assets/avatar-padrao.png')}
            style={styles.foto}
          />
          <Text style={styles.nome}>{usuario?.nome || 'Estudante'}</Text>
          <Text style={styles.curso}>
            Estudante de Psicologia
            {usuario?.periodo ? ` • ${usuario.periodo} período` : ''}
          </Text>
          <VerifiedBadge texto="Vínculo verificado pela instituição" style={styles.seloCentro} />
        </View>

        {/* Aviso de perfil incompleto */}
        {!perfilCompleto && (
          <View style={{ gap: 10 }}>
            <NoticeCard
              icone="sparkles-outline"
              titulo="Complete seu perfil"
              texto="Pacientes escolhem com mais confiança quando conhecem sua apresentação, abordagem e áreas de foco."
            />
            <AppButton
              titulo="Completar agora"
              icone="arrow-forward"
              onPress={() => router.push('/estudante/perfil-profissional')}
            />
          </View>
        )}

        {/* Vínculo acadêmico (só informação) */}
        <View style={styles.secaoLinha}>
          <Text style={styles.secaoTitulo}>Vínculo acadêmico</Text>
        </View>
        <View style={styles.grupo}>
          <MenuItem
            icone="business-outline"
            titulo={usuario?.instituicao || 'Instituição não informada'}
            subtitulo="Clínica-escola parceira"
          />
          <View style={styles.divisor} />
          <MenuItem
            icone="school-outline"
            titulo={SUPERVISOR_EXEMPLO}
            subtitulo="Supervisão clínica"
          />
        </View>

        {/* Perfil profissional */}
        <View style={styles.secaoLinha}>
          <Text style={styles.secaoTitulo}>Perfil profissional</Text>
          <TouchableOpacity onPress={() => router.push('/estudante/perfil-profissional')}>
            <Text style={styles.link}>Editar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.rotulo}>Apresentação</Text>
          {usuario?.sobre ? (
            <Text style={styles.texto}>{usuario.sobre}</Text>
          ) : (
            <Text style={styles.vazioTexto}>Nenhuma apresentação ainda.</Text>
          )}

          <View style={styles.divisor} />

          <Text style={styles.rotulo}>Abordagem</Text>
          {usuario?.abordagem ? (
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.tagTexto}>{usuario.abordagem}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.vazioTexto}>Não informada.</Text>
          )}

          <View style={styles.divisor} />

          <Text style={styles.rotulo}>Áreas de foco</Text>
          {focos.length > 0 ? (
            <View style={styles.tags}>
              {focos.map((foco) => (
                <View key={foco} style={styles.tag}>
                  <Text style={styles.tagTexto}>{foco}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.vazioTexto}>Nenhuma área escolhida.</Text>
          )}
        </View>

        {/* Atendimentos */}
        <View style={styles.secaoLinha}>
          <Text style={styles.secaoTitulo}>Atendimentos</Text>
        </View>
        <View style={styles.grupo}>
          <MenuItem
            icone="time-outline"
            titulo="Minha disponibilidade"
            subtitulo={`${horariosSemana} ${horariosSemana === 1 ? 'horário' : 'horários'} por semana`}
            onPress={() => router.push('/estudante/disponibilidade')}
          />
        </View>

        {/* Conta (mesmas telas do paciente) */}
        <View style={styles.secaoLinha}>
          <Text style={styles.secaoTitulo}>Conta e ajuda</Text>
        </View>
        <View style={styles.grupo}>
          <MenuItem
            icone="person-outline"
            titulo="Dados pessoais"
            subtitulo="Nome, e-mail e identificação"
            onPress={() => router.push('/conta/dados')}
          />
          <View style={styles.divisor} />
          <MenuItem
            icone="help-buoy-outline"
            titulo="Ajuda e suporte"
            subtitulo="Dúvidas frequentes e contato"
            onPress={() => router.push('/conta/ajuda')}
          />
          <View style={styles.divisor} />
          <MenuItem
            icone="shield-checkmark-outline"
            titulo="Termos e privacidade"
            subtitulo="Sigilo profissional e LGPD"
            onPress={() => router.push('/conta/termos')}
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