import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import VerifiedBadge from '@/components/VerifiedBadge';
import LoadState from '@/components/LoadState';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { useHorariosLivres } from '@/hooks/useHorariosLivres';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { rotuloDia } from '@/utils/datas';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/estudante/perfilEstudante.styles';
import { colors } from '@/styles/colors';

export default function PerfilEstudante() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const estudanteId = Number(id);
  const { buscarPorId, carregando: carregandoLista } = useEstudantes();
  const estudante = buscarPorId(estudanteId);
  const horarios = useHorariosLivres(estudanteId);

  if (!estudante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Perfil do estudante" />
          <Text style={styles.texto}>
            {carregandoLista ? 'Carregando...' : 'Estudante não encontrado ou indisponível.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Os 3 próximos dias que têm horário livre
  const proximosDias = horarios.dias.filter((dia) => dia.horarios.length > 0).slice(0, 3);

  // Abre a tela de agendamento (com ou sem horário já marcado)
  function abrirAgendamento(data?: string, hora?: string) {
    router.push({
      pathname: '/paciente/agendamento/[id]',
      params: data && hora ? { id: String(estudanteId), data, hora } : { id: String(estudanteId) },
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
              estudante.fotoUrl
                ? { uri: estudante.fotoUrl }
                : require('../../../../assets/avatar-padrao.png')
            }
            style={styles.foto}
          />
          <VerifiedBadge texto="Estudante verificado" style={styles.seloCentro} />

          <Text style={styles.nome}>{estudante.usuario.nome}</Text>
          <Text style={styles.curso}>Estudante de Psicologia — {estudante.periodo}º período</Text>

          <View style={styles.instituicao}>
            <Ionicons name="business-outline" size={16} color={colors.textoClaro} />
            <Text style={styles.instituicaoTexto}>{estudante.universidade}</Text>
          </View>

          <View style={styles.supervisao}>
            <Ionicons
              name={estudante.modalidade === 'PRESENCIAL' ? 'business-outline' : 'videocam-outline'}
              size={14}
              color={colors.primaria}
            />
            <Text style={styles.supervisaoTexto}>
              Atende: {ROTULO_MODALIDADE[estudante.modalidade].toLowerCase()}
            </Text>
          </View>

          {/* Supervisor: escondido até o backend ter esse dado (RECURSOS.supervisor) */}
        </View>

        {/* Sobre mim */}
        <View style={styles.card}>
          <View style={styles.cardTituloLinha}>
            <Ionicons name="person-outline" size={18} color={colors.primaria} />
            <Text style={styles.cardTitulo}>Sobre mim</Text>
          </View>
          <Text style={styles.texto}>
            {estudante.bio || 'Este estudante ainda não escreveu uma apresentação.'}
          </Text>
        </View>

        {/* Áreas de atendimento */}
        <View style={styles.card}>
          <View style={styles.cardTituloLinha}>
            <Ionicons name="pricetags-outline" size={18} color={colors.primaria} />
            <Text style={styles.cardTitulo}>Áreas de atendimento</Text>
          </View>
          <View style={styles.tags}>
            {estudante.areasAtendimento.map((area) => (
              <View key={area.id} style={styles.tag}>
                <Text style={styles.tagTexto}>{area.nome}</Text>
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
            {proximosDias.length > 0 && (
              <View style={styles.abertos}>
                <View style={styles.abertosPonto} />
                <Text style={styles.abertosTexto}>Horários abertos</Text>
              </View>
            )}
          </View>

          <LoadState
            carregando={horarios.carregando}
            erro={horarios.erro}
            onTentarDeNovo={horarios.tentarDeNovo}
            textoCarregando="Carregando horários..."
          />

          {!horarios.carregando && !horarios.erro && (
            proximosDias.length > 0 ? (
              <>
                <Text style={styles.dicaHorarios}>
                  Toque em um horário para agendar (horário de Brasília).
                </Text>
                {proximosDias.map((dia) => (
                  <View key={dia.chave} style={styles.dia}>
                    <View style={styles.diaLinha}>
                      <Text style={styles.diaTitulo}>{rotuloDia(dia.data)}</Text>
                      <Text style={styles.vagas}>
                        {dia.horarios.length} {dia.horarios.length === 1 ? 'horário' : 'horários'}
                      </Text>
                    </View>

                    <View style={styles.horarios}>
                      {dia.horarios.map((item) => (
                        <TouchableOpacity
                          key={item.hora}
                          style={styles.horario}
                          onPress={() => abrirAgendamento(dia.chave, item.hora)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.horarioTexto}>{item.hora}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.dicaHorarios}>
                Sem horários disponíveis nas próximas duas semanas.
              </Text>
            )
          )}
        </View>

        <NoticeCard
          icone="information-circle-outline"
          texto={`Sessões de ${DURACAO_CONSULTA_MINUTOS} minutos, com supervisão de docentes da clínica-escola.`}
        />
      </ScrollView>

      {/* Botão fixo: abre o calendário completo */}
      <View style={styles.rodape}>
        <AppButton
          titulo="Agendar atendimento"
          icone="arrow-forward"
          desabilitado={!horarios.carregando && proximosDias.length === 0}
          onPress={() => abrirAgendamento()}
        />
      </View>
    </SafeAreaView>
  );
}
