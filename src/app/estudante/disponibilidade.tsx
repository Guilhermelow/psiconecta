import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import AvailabilityDay from '@/components/AvailabilityDay';
import { useAtendimentos } from '@/contexts/AtendimentosContext';
import { DiaDisponivel, Disponibilidade, horariosDoDia } from '@/utils/disponibilidade';
import { styles } from '@/styles/estudante/disponibilidade.styles';
import { colors } from '@/styles/colors';

const DIAS_DA_SEMANA = [
  { numero: 1, nome: 'Segunda-feira' },
  { numero: 2, nome: 'Terça-feira' },
  { numero: 3, nome: 'Quarta-feira' },
  { numero: 4, nome: 'Quinta-feira' },
  { numero: 5, nome: 'Sexta-feira' },
  { numero: 6, nome: 'Sábado' },
];

export default function MinhaDisponibilidade() {
  const { disponibilidade, salvarDisponibilidade } = useAtendimentos();

  // Rascunho: as mudanças só valem quando tocar em "Salvar"
  const [rascunho, setRascunho] = useState<Disponibilidade>(disponibilidade);

  const mudou = JSON.stringify(rascunho) !== JSON.stringify(disponibilidade);

  const totalSemana = Object.values(rascunho).reduce(
    (total, dia) => total + horariosDoDia(dia).length,
    0
  );

  function atualizarDia(numero: number, novo: DiaDisponivel) {
    setRascunho((anterior) => ({ ...anterior, [numero]: novo }));
  }

  function salvar() {
    salvarDisponibilidade(rascunho);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Minha disponibilidade" />

        <Text style={styles.intro}>
          Defina os dias e as faixas em que você atende. Os pacientes só conseguem marcar
          nesses horários.
        </Text>

        <NoticeCard
          icone="time-outline"
          titulo="Sessões de 50 minutos"
          texto="Cada faixa vira horários de hora em hora: 50 min de sessão + 10 min de intervalo. Ex.: 08:00 – 12:00 gera 4 horários."
        />

        <View style={styles.resumo}>
          <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
          <Text style={styles.resumoTexto}>
            {totalSemana} {totalSemana === 1 ? 'horário' : 'horários'} por semana
          </Text>
        </View>

        <View style={styles.lista}>
          {DIAS_DA_SEMANA.map((dia) => (
            <AvailabilityDay
              key={dia.numero}
              nome={dia.nome}
              dia={rascunho[dia.numero] ?? { ativo: false, faixas: [] }}
              onMudar={(novo) => atualizarDia(dia.numero, novo)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Botão fixo */}
      <View style={styles.rodape}>
        <AppButton
          titulo="Salvar disponibilidade"
          icone="checkmark"
          desabilitado={!mudou}
          onPress={salvar}
        />
        <Text style={styles.rodapeTexto}>
          Atendimentos já marcados não são alterados.
        </Text>
      </View>
    </SafeAreaView>
  );
}