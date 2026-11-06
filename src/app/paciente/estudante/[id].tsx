import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import VerifiedBadge from '@/components/VerifiedBadge';
import { ESTUDANTES, AGENDA_PADRAO } from '@/mocks/estudantes';
import { gerarDias, rotuloDia } from '@/utils/datas';
import { styles } from '@/styles/paciente/estudante/perfilEstudante.styles';
import { colors } from '@/styles/colors';

export default function PerfilEstudante() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const estudante = ESTUDANTES.find((item) => item.id === id);

  if (!estudante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Perfil do estudante" />
          <Text style={styles.texto}>Estudante não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const estudanteId = estudante.id;
  const sobre =
    estudante.sobre ??
    `Olá! Sou estudante do ${estudante.periodo} período de Psicologia e realizo atendimentos com orientação e supervisão de professores. Meu foco é oferecer um espaço seguro, livre de julgamentos e acolhedor para trabalharmos juntos as suas questões.`;

  // Os 3 próximos dias que têm horário livre
  const proximosDias = gerarDias(estudante.agenda ?? AGENDA_PADRAO)
    .filter((dia) => dia.horarios.length > 0)
    .slice(0, 3);

  // Abre a tela de agendamento (com ou sem horário já marcado)
  function abrirAgendamento(data?: string, hora?: string) {
    router.push({
      pathname: '/paciente/agendamento/[id]',
      params: data && hora ? { id: estudanteId, data, hora } : { id: estudanteId },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Perfil do estudante" />

        {/* Apresentação */}
        <View style={[styles.card, styles.apresentacao]}>
          <Image
            source={
              estudante.foto
                ? { uri: estudante.foto }
                : require('../../../../assets/avatar-padrao.png')
            }
            style={styles.foto}
          />
          <VerifiedBadge texto="Estudante verificado" style={styles.seloCentro} />

          <Text style={styles.nome}>{estudante.nome}</Text>
          <Text style={styles.curso}>
            Estudante de Psicologia — {estudante.periodo} período
          </Text>

          <View style={styles.instituicao}>
            <Ionicons name="business-outline" size={16} color={colors.textoClaro} />
            <Text style={styles.instituicaoTexto}>{estudante.instituicaoCompleta}</Text>
          </View>

          <View style={styles.supervisao}>
            <Ionicons name="school-outline" size={14} color={colors.primaria} />
            <Text style={styles.supervisaoTexto}>Supervisão: {estudante.supervisor}</Text>
          </View>
        </View>

        {/* Sobre mim */}
        <View style={styles.card}>
          <View style={styles.cardTituloLinha}>
            <Ionicons name="person-outline" size={18} color={colors.primaria} />
            <Text style={styles.cardTitulo}>Sobre mim</Text>
          </View>
          <Text style={styles.texto}>{sobre}</Text>
          <View style={styles.abordagem}>
            <Text style={styles.abordagemTexto}>Abordagem: {estudante.abordagem}</Text>
          </View>
        </View>

        {/* Áreas de interesse */}
        <View style={styles.card}>
          <View style={styles.cardTituloLinha}>
            <Ionicons name="pricetags-outline" size={18} color={colors.primaria} />
            <Text style={styles.cardTitulo}>Áreas de interesse</Text>
          </View>
          <View style={styles.tags}>
            {estudante.focos.map((foco) => (
              <View key={foco} style={styles.tag}>
                <Text style={styles.tagTexto}>{foco}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Próximos horários (atalhos) */}
        <View style={styles.card}>
          <View style={styles.cardTopoLinha}>
            <View style={[styles.cardTituloLinha, { marginBottom: 0 }]}>
              <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
              <Text style={styles.cardTitulo}>Próximos horários</Text>
            </View>
            <View style={styles.abertos}>
              <View style={styles.abertosPonto} />
              <Text style={styles.abertosTexto}>Horários abertos</Text>
            </View>
          </View>
          <Text style={styles.dicaHorarios}>Toque em um horário para agendar.</Text>

          {proximosDias.map((dia) => (
            <View key={dia.chave} style={styles.dia}>
              <View style={styles.diaLinha}>
                <Text style={styles.diaTitulo}>{rotuloDia(dia.data)}</Text>
                <Text style={styles.vagas}>
                  {dia.horarios.length} {dia.horarios.length === 1 ? 'vaga' : 'vagas'}
                </Text>
              </View>

              <View style={styles.horarios}>
                {dia.horarios.map((hora) => (
                  <TouchableOpacity
                    key={hora}
                    style={styles.horario}
                    onPress={() => abrirAgendamento(dia.chave, hora)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.horarioTexto}>{hora}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        <NoticeCard
          icone="information-circle-outline"
          texto="Sessões online de 50 minutos. O acesso à sala privativa e segura é liberado após a confirmação."
        />
      </ScrollView>

      {/* Botão fixo: abre o calendário completo */}
      <View style={styles.rodape}>
        <AppButton
          titulo="Agendar atendimento"
          icone="arrow-forward"
          onPress={() => abrirAgendamento()}
        />
      </View>
    </SafeAreaView>
  );
}