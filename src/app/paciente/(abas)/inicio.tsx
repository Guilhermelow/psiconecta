import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import FilterChips from '@/components/FilterChips';
import StudentCard from '@/components/StudentCard';
import VerifiedBadge from '@/components/VerifiedBadge';
import StatusTag from '@/components/StatusTag';
import LoadState from '@/components/LoadState';
import PatientHeader from '@/components/PatientHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { useAreasAtendimento } from '@/hooks/useAreasAtendimento';
import { filtrarEstudantes } from '@/utils/filtrarEstudantes';
import { inicioDaConsulta, horaDe } from '@/utils/consultas';
import { dataLonga } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/inicio.styles';
import { colors } from '@/styles/colors';

const TODAS = 'Todas';

export default function InicioPaciente() {
  const { usuario } = useAuth();
  const consultas = useConsultas();
  const estudantes = useEstudantes();
  const { areas } = useAreasAtendimento();
  const [busca, setBusca] = useState('');
  const [area, setArea] = useState(TODAS);

  const nome = primeiroNome(usuario?.nome);
  const { proxima } = consultas;
  const estudanteConsulta = proxima ? estudantes.buscarPorId(proxima.estudanteId) : undefined;

  const areaId = areas.find((item) => item.nome === area)?.id ?? null;
  const estudantesFiltrados = filtrarEstudantes(estudantes.estudantes, { busca, areaId }).slice(0, 3);

  function atualizar() {
    consultas.recarregar();
    estudantes.recarregar();
  }

  return (
    // edges={['top']}: as abas de baixo já cuidam do espaço inferior
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={atualizar} tintColor={colors.primaria} />
        }
      >
        <PatientHeader />
        {/* Saudação */}
        <Text style={styles.saudacao}>Olá{nome ? `, ${nome}` : ''}!</Text>
        <Text style={styles.saudacaoTexto}>Que bom ter você por aqui.</Text>

        {/* Próxima consulta */}
        <LoadState
          carregando={consultas.carregando && consultas.consultas.length === 0}
          erro={consultas.erro}
          onTentarDeNovo={consultas.recarregar}
          textoCarregando="Carregando suas consultas..."
        />
        {!consultas.carregando && !consultas.erro && (
          <View style={styles.card}>
            {proxima ? (
              <>
                <View style={styles.cardTopo}>
                  <View style={styles.cardTituloLinha}>
                    <Ionicons name="calendar" size={18} color={colors.primaria} />
                    <Text style={styles.cardTitulo}>Sua próxima consulta</Text>
                  </View>
                  <StatusTag status={proxima.status} />
                </View>

                <View style={styles.consultaEstudante}>
                  <Image
                    source={
                      estudanteConsulta?.fotoUrl
                        ? { uri: estudanteConsulta.fotoUrl }
                        : require('../../../../assets/avatar-padrao.png')
                    }
                    style={styles.consultaFoto}
                  />
                  <View style={styles.consultaTextos}>
                    <Text style={styles.consultaNome}>{proxima.estudanteNome}</Text>
                    <VerifiedBadge texto="Estudante verificado" />
                    {estudanteConsulta ? (
                      <Text style={styles.consultaCurso}>
                        Estudante de Psicologia — {estudanteConsulta.periodo}º período
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.infoLinha}>
                  <Ionicons name="calendar-outline" size={16} color={colors.primaria} />
                  <Text style={styles.infoTextoForte}>
                    {dataLonga(inicioDaConsulta(proxima))} às {horaDe(inicioDaConsulta(proxima))}
                  </Text>
                </View>
                <View style={styles.infoLinha}>
                  <Ionicons
                    name={proxima.modalidade === 'PRESENCIAL' ? 'business-outline' : 'videocam-outline'}
                    size={16}
                    color={colors.primaria}
                  />
                  <Text style={styles.infoTexto}>
                    Atendimento {ROTULO_MODALIDADE[proxima.modalidade].toLowerCase()} supervisionado
                  </Text>
                </View>

                <View style={styles.espacoBotao}>
                  <AppButton
                    titulo="Ver detalhes da sessão"
                    icone="arrow-forward"
                    onPress={() => router.push(`/paciente/consulta/${proxima.id}`)}
                  />
                </View>
              </>
            ) : (
              <View style={styles.semConsulta}>
                <Ionicons name="calendar-outline" size={32} color={colors.primaria} />
                <Text style={styles.vazioTitulo}>Nenhuma consulta agendada</Text>
                <Text style={styles.vazioTexto}>
                  Escolha um estudante abaixo para marcar seu atendimento.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Busca */}
        <Text style={styles.secaoTitulo}>Encontre um estudante</Text>
        <AppInput
          icone="search"
          placeholder="Buscar por nome, universidade ou área..."
          value={busca}
          onChangeText={setBusca}
          fundoBranco
        />
        <FilterChips
          opcoes={[TODAS, ...areas.map((item) => item.nome)]}
          selecionado={area}
          onSelecionar={setArea}
        />

        {/* Lista */}
        <View style={styles.secaoLinha}>
          <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>Estudantes disponíveis</Text>
          <TouchableOpacity onPress={() => router.navigate('/paciente/explorar')}>
            <Text style={styles.verTodos}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <LoadState
          carregando={estudantes.carregando && estudantes.estudantes.length === 0}
          erro={estudantes.erro}
          onTentarDeNovo={estudantes.recarregar}
          textoCarregando="Carregando estudantes..."
        />
        {!estudantes.carregando && !estudantes.erro &&
          (estudantesFiltrados.length > 0 ? (
            <View style={styles.lista}>
              {estudantesFiltrados.map((estudante) => (
                <StudentCard key={estudante.id} estudante={estudante} />
              ))}
            </View>
          ) : (
            <View style={styles.vazio}>
              <Ionicons name="search-outline" size={28} color={colors.primaria} />
              <Text style={styles.vazioTitulo}>Nenhum estudante encontrado</Text>
              <Text style={styles.vazioTexto}>Tente outra área ou outra palavra.</Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
