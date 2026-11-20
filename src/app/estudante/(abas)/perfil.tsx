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
import { RECURSOS, SUPERVISOR_EXEMPLO } from '@/config/recursos';
import { horariosPorSemana } from '@/utils/atendimentos';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/estudante/perfil.styles';
import { colors } from '@/styles/colors';

export default function PerfilEstudante() {
  const { usuario, perfilEstudante, sair } = useAuth();
  const { disponibilidades } = useAtendimentos();
  const horariosSemana = horariosPorSemana(disponibilidades);

  const areas = perfilEstudante?.areasAtendimento ?? [];
  // Áreas e modalidade são obrigatórias no backend; só a apresentação pode faltar
  const perfilCompleto = !perfilEstudante || !!perfilEstudante.bio;

  const versao = Constants.expoConfig?.version ?? '1.0.0';

  async function handleSair() {
    await sair();
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
            {perfilEstudante ? ` • ${perfilEstudante.periodo}º período` : ''}
          </Text>
          <VerifiedBadge texto="Vínculo verificado pela instituição" style={styles.seloCentro} />
        </View>

        {/* Aviso de perfil incompleto */}
        {!perfilCompleto && (
          <View style={{ gap: 10 }}>
            <NoticeCard
              icone="sparkles-outline"
              titulo="Complete seu perfil"
              texto="Pacientes escolhem com mais confiança quando conhecem sua apresentação."
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
            titulo={perfilEstudante?.universidade || 'Universidade não informada'}
            subtitulo={perfilEstudante ? `Matrícula ${perfilEstudante.matricula}` : undefined}
          />
          {/* Escondido: o backend não tem supervisor (src/config/recursos.ts) */}
          {RECURSOS.supervisor && (
            <>
              <View style={styles.divisor} />
              <MenuItem
                icone="school-outline"
                titulo={SUPERVISOR_EXEMPLO}
                subtitulo="Supervisão clínica"
              />
            </>
          )}
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
          {perfilEstudante?.bio ? (
            <Text style={styles.texto}>{perfilEstudante.bio}</Text>
          ) : (
            <Text style={styles.vazioTexto}>Nenhuma apresentação ainda.</Text>
          )}

          <View style={styles.divisor} />

          <Text style={styles.rotulo}>Modalidade</Text>
          {perfilEstudante ? (
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.tagTexto}>{ROTULO_MODALIDADE[perfilEstudante.modalidade]}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.vazioTexto}>Não informada.</Text>
          )}

          <View style={styles.divisor} />

          <Text style={styles.rotulo}>Áreas de atendimento</Text>
          {areas.length > 0 ? (
            <View style={styles.tags}>
              {areas.map((area) => (
                <View key={area.id} style={styles.tag}>
                  <Text style={styles.tagTexto}>{area.nome}</Text>
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