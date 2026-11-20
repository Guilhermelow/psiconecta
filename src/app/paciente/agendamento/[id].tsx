import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import AppButton from '@/components/AppButton';
import StudentSummary from '@/components/StudentSummary';
import DayStrip from '@/components/DayStrip';
import LoadState from '@/components/LoadState';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { useHorariosLivres } from '@/hooks/useHorariosLivres';
import { dataLonga, dataCurta, mesAno } from '@/utils/datas';
import { styles } from '@/styles/paciente/agendamento/escolherHorario.styles';
import { colors } from '@/styles/colors';

export default function EscolherHorario() {
  const params = useLocalSearchParams<{ id: string; data?: string; hora?: string }>();
  const estudanteId = Number(params.id);
  const { buscarPorId } = useEstudantes();
  const estudante = buscarPorId(estudanteId);
  const { dias, carregando, erro, tentarDeNovo } = useHorariosLivres(estudanteId);

  const [diaEscolhido, setDiaEscolhido] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  // Quando os horários chegam: abre no dia/horário vindo do perfil ou no primeiro dia com vaga
  useEffect(() => {
    if (carregando || diaEscolhido) return;
    const doPerfil = dias.find((dia) => dia.chave === params.data && dia.horarios.length > 0);
    const inicial = doPerfil ?? dias.find((dia) => dia.horarios.length > 0);
    if (!inicial) return;
    setDiaEscolhido(inicial.chave);
    if (doPerfil && doPerfil.horarios.some((item) => item.hora === params.hora)) {
      setHora(params.hora ?? null);
    }
  }, [carregando, dias, diaEscolhido, params.data, params.hora]);

  if (!estudante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Estudante não encontrado ou indisponível.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const dia = dias.find((item) => item.chave === diaEscolhido);
  const horarioEscolhido = dia?.horarios.find((item) => item.hora === hora);

  // Trocar de dia limpa o horário
  function escolherDia(chave: string) {
    setDiaEscolhido(chave);
    setHora(null);
  }

  function continuar() {
    if (!dia || !horarioEscolhido) return;
    router.push({
      pathname: '/paciente/agendamento/revisao',
      params: {
        estudanteId: String(estudanteId),
        data: dia.chave,
        hora: horarioEscolhido.hora,
        modalidades: horarioEscolhido.modalidades.join(','),
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StepHeader passoAtual={1} totalPassos={2} etiqueta="Agendamento" iconeEtiqueta="calendar" />

        <Text style={styles.titulo}>Escolha o melhor momento</Text>

        <StudentSummary nome={estudante.usuario.nome} estudante={estudante} />

        <LoadState
          carregando={carregando}
          erro={erro}
          onTentarDeNovo={tentarDeNovo}
          textoCarregando="Carregando horários..."
        />

        {!carregando && !erro && (
          <>
            {/* Dias */}
            <View style={styles.secaoLinha}>
              <Text style={styles.secaoTitulo}>Escolha o dia</Text>
              {dia && <Text style={styles.mes}>{mesAno(dia.data)}</Text>}
            </View>

            <DayStrip
              dias={dias.map((item) => {
                const vagas = item.horarios.length;
                return {
                  chave: item.chave,
                  data: item.data,
                  legenda:
                    vagas === 0 ? 'Sem horários' : `${vagas} ${vagas === 1 ? 'horário' : 'horários'}`,
                  desabilitado: vagas === 0,
                  destaque: vagas > 0,
                };
              })}
              selecionado={diaEscolhido}
              onSelecionar={escolherDia}
            />

            {/* Horários do dia escolhido */}
            {dia ? (
              <>
                <Text style={[styles.secaoTitulo, styles.tituloHorarios]}>
                  {dataLonga(dia.data)} (horário de Brasília)
                </Text>
                <View style={styles.horarios}>
                  {dia.horarios.map((item) => {
                    const selecionado = item.hora === hora;
                    return (
                      <TouchableOpacity
                        key={item.hora}
                        style={[styles.horario, selecionado && styles.horarioSelecionado]}
                        onPress={() => setHora(item.hora)}
                        activeOpacity={0.8}
                      >
                        {selecionado && (
                          <Ionicons name="checkmark-circle" size={16} color={colors.branco} />
                        )}
                        <Text style={[styles.horarioTexto, selecionado && styles.textoBranco]}>
                          {item.hora}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            ) : (
              <View style={styles.vazio}>
                <Ionicons name="calendar-outline" size={28} color={colors.primaria} />
                <Text style={styles.vazioTitulo}>Sem horários disponíveis</Text>
                <Text style={styles.vazioTexto}>
                  Este estudante não tem horários livres nas próximas duas semanas.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Rodapé fixo com o resumo */}
      <View style={styles.rodape}>
        {dia && horarioEscolhido && (
          <View style={styles.resumo}>
            <Ionicons name="calendar" size={16} color={colors.primaria} />
            <Text style={styles.resumoTexto}>
              {dataCurta(dia.data)} às {horarioEscolhido.hora}
            </Text>
          </View>
        )}
        <AppButton
          titulo={horarioEscolhido ? 'Continuar para revisão' : 'Escolha um horário'}
          icone="arrow-forward"
          desabilitado={!horarioEscolhido}
          onPress={continuar}
        />
      </View>
    </SafeAreaView>
  );
}
