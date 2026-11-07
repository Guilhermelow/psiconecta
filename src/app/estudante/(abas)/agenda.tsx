import { useState } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StudentHeader from '@/components/StudentHeader';
import DayStrip from '@/components/DayStrip';
import SessionItem from '@/components/SessionItem';
import AppButton from '@/components/AppButton';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { DURACAO_MINUTOS } from '@/utils/consultas';
import {
  chaveData,
  dataDaChave,
  dataEHora,
  dataLonga,
  ehHoje,
  formatarDuracao,
  mesAno,
  proximosDias,
} from '@/utils/datas';
import { styles } from '@/styles/estudante/agenda.styles';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';

const SETE_DIAS = 7 * 24 * 60 * 60 * 1000;

export default function Agenda() {
  const { atendimentos } = useAtendimentos();
  const agora = new Date();
  const [diaEscolhido, setDiaEscolhido] = useState(chaveData(agora));

  // Próximos 14 dias com a quantidade de sessões de cada um
  const dias = proximosDias(14, agora).map((data) => {
    const chave = chaveData(data);
    const quantidade = atendimentos.filter((item) => item.data === chave).length;
    return {
      chave,
      data,
      legenda:
        quantidade === 0 ? 'Livre' : `${quantidade} ${quantidade === 1 ? 'sessão' : 'sessões'}`,
      destaque: quantidade > 0,
    };
  });

  const dataEscolhida = dataDaChave(diaEscolhido);
  const doDia = atendimentos.filter((item) => item.data === diaEscolhido);

  // Horas de atendimento nos próximos 7 dias
  const sessoesSemana = atendimentos.filter((item) => {
    const inicio = dataEHora(item.data, item.hora).getTime();
    return inicio >= agora.getTime() && inicio < agora.getTime() + SETE_DIAS;
  }).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StudentHeader />

        <Text style={styles.titulo}>Minha agenda</Text>

        {/* Faixa de dias */}
        <View style={styles.linha}>
          <Text style={styles.secaoTitulo}>Próximos dias</Text>
          <Text style={styles.mes}>{mesAno(dataEscolhida)}</Text>
        </View>
        <DayStrip dias={dias} selecionado={diaEscolhido} onSelecionar={setDiaEscolhido} />

        {/* Resumo (só informação) */}
        <View style={styles.resumo}>
          <View style={styles.resumoCard}>
            <View style={styles.resumoIcone}>
              <Ionicons name="people-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.resumoTextos}>
              <Text style={styles.resumoRotulo}>No dia</Text>
              <Text style={styles.resumoValor}>
                {doDia.length} {doDia.length === 1 ? 'sessão' : 'sessões'}
              </Text>
            </View>
          </View>
          <View style={styles.resumoCard}>
            <View style={styles.resumoIcone}>
              <Ionicons name="timer-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.resumoTextos}>
              <Text style={styles.resumoRotulo}>Próximos 7 dias</Text>
              <Text style={styles.resumoValor}>
                {formatarDuracao(sessoesSemana * DURACAO_MINUTOS)}
              </Text>
            </View>
          </View>
        </View>

        {/* Sessões do dia escolhido */}
        <Text style={styles.diaTitulo}>
          {ehHoje(dataEscolhida) ? 'Hoje' : dataLonga(dataEscolhida)}
        </Text>

        {doDia.length > 0 ? (
          <View style={styles.lista}>
            {doDia.map((item) => (
              <SessionItem key={item.id} atendimento={item} />
            ))}
          </View>
        ) : (
          <View style={styles.vazio}>
            <Ionicons name="calendar-clear-outline" size={28} color={colors.primaria} />
            <Text style={styles.vazioTitulo}>Nenhuma sessão neste dia</Text>
            <Text style={styles.vazioTexto}>
              Os atendimentos que você aceitar aparecerão aqui.
            </Text>
          </View>
        )}

        <View style={styles.botao}>
          <AppButton
            titulo="Gerenciar disponibilidade"
            variante="secundario"
            icone="time-outline"
            onPress={() => router.push('/estudante/disponibilidade')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}