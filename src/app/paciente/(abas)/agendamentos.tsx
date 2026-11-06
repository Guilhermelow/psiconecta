import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import PatientHeader from '@/components/PatientHeader';
import FilterChips from '@/components/FilterChips';
import AppointmentCard from '@/components/AppointmentCard';
import NoticeCard from '@/components/NoticeCard';
import AppButton from '@/components/AppButton';
import { useConsultas } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { situacaoDaConsulta, SituacaoConsulta } from '@/utils/consultas';
import { styles } from '@/styles/paciente/agendamentos.styles';
import { colors } from '@/styles/colors';

const ABAS: {
  situacao: SituacaoConsulta;
  nome: string;
  vazioTitulo: string;
  vazioTexto: string;
}[] = [
  {
    situacao: 'proxima',
    nome: 'Próximos',
    vazioTitulo: 'Nenhuma consulta marcada',
    vazioTexto: 'Encontre um estudante e agende seu primeiro atendimento.',
  },
  {
    situacao: 'concluida',
    nome: 'Concluídos',
    vazioTitulo: 'Nenhuma consulta concluída',
    vazioTexto: 'Suas consultas realizadas aparecerão aqui.',
  },
  {
    situacao: 'cancelada',
    nome: 'Cancelados',
    vazioTitulo: 'Nenhuma consulta cancelada',
    vazioTexto: 'As consultas que você cancelar aparecerão aqui.',
  },
];

export default function Agendamentos() {
  const { consultas } = useConsultas();
  const [abaIndex, setAbaIndex] = useState(0);

  // Separa as consultas por situação
  const agora = new Date();
  const grupos: Record<SituacaoConsulta, typeof consultas> = {
    proxima: consultas.filter((c) => situacaoDaConsulta(c, agora) === 'proxima'),
    // Concluídas e canceladas: as mais recentes primeiro
    concluida: consultas.filter((c) => situacaoDaConsulta(c, agora) === 'concluida').reverse(),
    cancelada: consultas.filter((c) => situacaoDaConsulta(c, agora) === 'cancelada').reverse(),
  };

  // "Próximos (2)", "Concluídos (1)"...
  const nomesAbas = ABAS.map((aba) => `${aba.nome} (${grupos[aba.situacao].length})`);
  const aba = ABAS[abaIndex];
  const lista = grupos[aba.situacao];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <PatientHeader />

        <Text style={styles.titulo}>Meus agendamentos</Text>

        <FilterChips
          opcoes={nomesAbas}
          selecionado={nomesAbas[abaIndex]}
          onSelecionar={(nome) => setAbaIndex(nomesAbas.indexOf(nome))}
        />

        {lista.length > 0 ? (
          <View style={styles.lista}>
            {lista.map((consulta) => {
              const estudante = ESTUDANTES.find((item) => item.id === consulta.estudanteId);
              if (!estudante) return null;

              return (
                <AppointmentCard
                  key={consulta.id}
                  consulta={consulta}
                  estudante={estudante}
                  situacao={aba.situacao}
                />
              );
            })}
          </View>
        ) : (
          <View style={styles.vazio}>
            <Ionicons name="calendar-outline" size={28} color={colors.primaria} />
            <Text style={styles.vazioTitulo}>{aba.vazioTitulo}</Text>
            <Text style={styles.vazioTexto}>{aba.vazioTexto}</Text>
            {aba.situacao === 'proxima' && (
              <View style={styles.vazioBotao}>
                <AppButton
                  titulo="Encontrar um estudante"
                  icone="search"
                  onPress={() => router.navigate('/paciente/explorar')}
                />
              </View>
            )}
          </View>
        )}

        {aba.situacao === 'proxima' && (
          <View style={styles.aviso}>
            <NoticeCard
              icone="information-circle-outline"
              texto="Cancelamentos são permitidos até 4 horas antes da sessão."
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}