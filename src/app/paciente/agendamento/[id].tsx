import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import StepHeader from '@/components/StepHeader';
import AppButton from '@/components/AppButton';
import StudentSummary from '@/components/StudentSummary';
import { ESTUDANTES, AGENDA_PADRAO } from '@/mocks/estudantes';
import {
  gerarDias,
  dataLonga,
  dataCurta,
  mesAno,
} from '@/utils/datas';
import { styles } from '@/styles/paciente/agendamento/escolherHorario.styles';
import { colors } from '@/styles/colors';
import DayStrip from '@/components/DayStrip';

export default function EscolherHorario() {
    const params = useLocalSearchParams<{
    id: string;
    data?: string;
    hora?: string;
    reagendarId?: string; // consulta antiga (quando é reagendamento)
  }>();
  const estudante = ESTUDANTES.find((item) => item.id === params.id);

  const dias = gerarDias(estudante?.agenda ?? AGENDA_PADRAO);

  // Dia inicial: o que veio do perfil ou o primeiro com vaga
  const diaInicial =
    dias.find((dia) => dia.chave === params.data && dia.horarios.length > 0) ??
    dias.find((dia) => dia.horarios.length > 0);

  const [diaEscolhido, setDiaEscolhido] = useState(diaInicial?.chave ?? null);
  const [hora, setHora] = useState(
    diaInicial && params.hora && diaInicial.horarios.includes(params.hora) ? params.hora : null
  );

  if (!estudante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Text style={styles.texto}>Estudante não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const estudanteId = estudante.id;
  const dia = dias.find((item) => item.chave === diaEscolhido);

  // Trocar de dia limpa o horário
  function escolherDia(chave: string) {
    setDiaEscolhido(chave);
    setHora(null);
  }

  function continuar() {
    if (!dia || !hora) return;
        router.push({
      pathname: '/paciente/agendamento/revisao',
      params: params.reagendarId
        ? { estudanteId, data: dia.chave, hora, reagendarId: params.reagendarId }
        : { estudanteId, data: dia.chave, hora },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StepHeader
          passoAtual={1}
          totalPassos={2}
          etiqueta="Agendamento"
          iconeEtiqueta="calendar"
        />

        <Text style={styles.titulo}>Escolha o melhor momento</Text>

        <StudentSummary estudante={estudante} />

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
              legenda: vagas === 0 ? 'Sem vagas' : `${vagas} ${vagas === 1 ? 'vaga' : 'vagas'}`,
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
              {dataLonga(dia.data)}
            </Text>
            <View style={styles.horarios}>
              {dia.horarios.map((item) => {
                const selecionado = item === hora;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.horario, selecionado && styles.horarioSelecionado]}
                    onPress={() => setHora(item)}
                    activeOpacity={0.8}
                  >
                    {selecionado && (
                      <Ionicons name="checkmark-circle" size={16} color={colors.branco} />
                    )}
                    <Text style={[styles.horarioTexto, selecionado && styles.textoBranco]}>
                      {item}
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
              Este estudante não tem vagas nas próximas duas semanas.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Rodapé fixo com o resumo */}
      <View style={styles.rodape}>
        {dia && hora && (
          <View style={styles.resumo}>
            <Ionicons name="calendar" size={16} color={colors.primaria} />
            <Text style={styles.resumoTexto}>
              {dataCurta(dia.data)} às {hora}
            </Text>
          </View>
        )}
        <AppButton
          titulo={hora ? 'Continuar para revisão' : 'Escolha um horário'}
          icone="arrow-forward"
          desabilitado={!hora}
          onPress={continuar}
        />
      </View>
    </SafeAreaView>
  );
}