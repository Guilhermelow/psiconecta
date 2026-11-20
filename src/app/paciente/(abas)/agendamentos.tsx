import { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import PatientHeader from '@/components/PatientHeader';
import FilterChips from '@/components/FilterChips';
import AppointmentCard from '@/components/AppointmentCard';
import NoticeCard from '@/components/NoticeCard';
import AppButton from '@/components/AppButton';
import LoadState from '@/components/LoadState';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { situacaoDaConsulta, ordenarPorInicio, SituacaoConsulta } from '@/utils/consultas';
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
    vazioTexto: 'Encontre um estudante e agende seu atendimento.',
  },
  {
    situacao: 'anterior',
    nome: 'Anteriores',
    vazioTitulo: 'Nenhuma consulta anterior',
    vazioTexto: 'Suas consultas realizadas aparecerão aqui.',
  },
  {
    situacao: 'cancelada',
    nome: 'Cancelados',
    vazioTitulo: 'Nenhuma consulta cancelada',
    vazioTexto: 'As consultas canceladas aparecerão aqui.',
  },
];

export default function Agendamentos() {
  const { consultas, carregando, erro, recarregar } = useConsultas();
  const { buscarPorId } = useEstudantes();
  const [abaIndex, setAbaIndex] = useState(0);

  // Separa as consultas por situação
  const agora = new Date();
  const da = (situacao: SituacaoConsulta) =>
    consultas.filter((consulta) => situacaoDaConsulta(consulta, agora) === situacao);
  const grupos: Record<SituacaoConsulta, typeof consultas> = {
    proxima: da('proxima'),
    // Anteriores e canceladas: as mais recentes primeiro
    anterior: ordenarPorInicio(da('anterior'), true),
    cancelada: ordenarPorInicio(da('cancelada'), true),
  };

  // "Próximos (2)", "Anteriores (1)"...
  const nomesAbas = ABAS.map((aba) => `${aba.nome} (${grupos[aba.situacao].length})`);
  const aba = ABAS[abaIndex];
  const lista = grupos[aba.situacao];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={recarregar} tintColor={colors.primaria} />
        }
      >
        <PatientHeader />

        <Text style={styles.titulo}>Meus agendamentos</Text>

        <FilterChips
          opcoes={nomesAbas}
          selecionado={nomesAbas[abaIndex]}
          onSelecionar={(nome) => setAbaIndex(nomesAbas.indexOf(nome))}
        />

        <LoadState
          carregando={carregando && consultas.length === 0}
          erro={erro}
          onTentarDeNovo={recarregar}
          textoCarregando="Carregando suas consultas..."
        />

        {!carregando && !erro &&
          (lista.length > 0 ? (
            <View style={styles.lista}>
              {lista.map((consulta) => (
                <AppointmentCard
                  key={consulta.id}
                  consulta={consulta}
                  estudante={buscarPorId(consulta.estudanteId)}
                  situacao={aba.situacao}
                />
              ))}
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
          ))}

        {aba.situacao === 'proxima' && (
          <View style={styles.aviso}>
            <NoticeCard
              icone="information-circle-outline"
              texto="Você pode cancelar uma consulta até o horário de início."
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
