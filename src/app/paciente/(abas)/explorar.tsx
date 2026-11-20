import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PatientHeader from '@/components/PatientHeader';
import AppInput from '@/components/AppInput';
import FilterChips from '@/components/FilterChips';
import StudentCard from '@/components/StudentCard';
import LoadState from '@/components/LoadState';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { useAreasAtendimento } from '@/hooks/useAreasAtendimento';
import { filtrarEstudantes, FILTROS_MODALIDADE, FILTROS_PERIODO } from '@/utils/filtrarEstudantes';
import { styles } from '@/styles/paciente/explorar.styles';
import { colors } from '@/styles/colors';

const TODAS = 'Todas';

export default function Explorar() {
  const { estudantes, carregando, erro, recarregar } = useEstudantes();
  const { areas } = useAreasAtendimento();
  const [busca, setBusca] = useState('');
  const [area, setArea] = useState(TODAS);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalidade, setModalidade] = useState<string>(FILTROS_MODALIDADE[0]);
  const [periodo, setPeriodo] = useState<string>(FILTROS_PERIODO[0]);

  const areaId = areas.find((item) => item.nome === area)?.id ?? null;
  const resultado = filtrarEstudantes(estudantes, { busca, areaId, modalidade, periodo });

  // Tem algum filtro diferente do padrão?
  const temFiltro =
    busca.trim() !== '' ||
    area !== TODAS ||
    modalidade !== FILTROS_MODALIDADE[0] ||
    periodo !== FILTROS_PERIODO[0];

  function limparFiltros() {
    setBusca('');
    setArea(TODAS);
    setModalidade(FILTROS_MODALIDADE[0]);
    setPeriodo(FILTROS_PERIODO[0]);
  }

  const total = resultado.length;
  const textoContador = `${total} ${total === 1 ? 'estudante encontrado' : 'estudantes encontrados'}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={recarregar} tintColor={colors.primaria} />
        }
      >
        <PatientHeader />

        <Text style={styles.titulo}>Estudantes disponíveis</Text>
        <Text style={styles.subtitulo}>
          Estudantes de Psicologia aprovados pela clínica-escola para atendimentos supervisionados.
        </Text>

        {/* Busca com botão de filtros */}
        <AppInput
          icone="search"
          placeholder="Buscar por nome, universidade ou área..."
          value={busca}
          onChangeText={setBusca}
          iconeDireita={mostrarFiltros ? 'close' : 'options-outline'}
          onPressIconeDireita={() => setMostrarFiltros(!mostrarFiltros)}
          fundoBranco
        />

        <FilterChips
          opcoes={[TODAS, ...areas.map((item) => item.nome)]}
          selecionado={area}
          onSelecionar={setArea}
        />

        {/* Painel de filtros extras */}
        {mostrarFiltros && (
          <View style={styles.painel}>
            <Text style={styles.painelTitulo}>Modalidade</Text>
            <FilterChips
              opcoes={[...FILTROS_MODALIDADE]}
              selecionado={modalidade}
              onSelecionar={setModalidade}
            />

            <Text style={styles.painelTitulo}>Período</Text>
            <FilterChips
              opcoes={[...FILTROS_PERIODO]}
              selecionado={periodo}
              onSelecionar={setPeriodo}
            />
          </View>
        )}

        <LoadState
          carregando={carregando && estudantes.length === 0}
          erro={erro}
          onTentarDeNovo={recarregar}
          textoCarregando="Carregando estudantes..."
        />

        {!carregando && !erro && (
          <>
            {/* Contador */}
            <View style={styles.contadorLinha}>
              <View style={styles.contador}>
                <View style={styles.contadorPonto} />
                <Text style={styles.contadorTexto}>{textoContador}</Text>
              </View>

              {temFiltro && (
                <TouchableOpacity onPress={limparFiltros}>
                  <Text style={styles.limpar}>Limpar filtros</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Lista */}
            {total > 0 ? (
              <View style={styles.lista}>
                {resultado.map((estudante) => (
                  <StudentCard key={estudante.id} estudante={estudante} detalhado />
                ))}
              </View>
            ) : (
              <View style={styles.vazio}>
                <Ionicons name="search-outline" size={28} color={colors.primaria} />
                <Text style={styles.vazioTitulo}>Nenhum estudante encontrado</Text>
                <Text style={styles.vazioTexto}>
                  Tente outra palavra ou toque em &quot;Limpar filtros&quot;.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
