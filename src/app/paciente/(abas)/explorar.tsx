import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PatientHeader from '@/components/PatientHeader';
import AppInput from '@/components/AppInput';
import FilterChips from '@/components/FilterChips';
import StudentCard from '@/components/StudentCard';
import {
  ESTUDANTES,
  AREAS,
  FILTROS_DISPONIBILIDADE,
  FILTROS_PERIODO,
} from '@/mocks/estudantes';
import { filtrarEstudantes } from '@/utils/filtrarEstudantes';
import { styles } from '@/styles/paciente/explorar.styles';
import { colors } from '@/styles/colors';

export default function Explorar() {
  const [busca, setBusca] = useState('');
  const [area, setArea] = useState('Todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState('Qualquer dia');
  const [periodo, setPeriodo] = useState('Todos');

  const resultado = filtrarEstudantes(ESTUDANTES, { busca, area, disponibilidade, periodo });

  // Tem algum filtro diferente do padrão?
  const temFiltro =
    busca.trim() !== '' ||
    area !== 'Todos' ||
    disponibilidade !== 'Qualquer dia' ||
    periodo !== 'Todos';

  function limparFiltros() {
    setBusca('');
    setArea('Todos');
    setDisponibilidade('Qualquer dia');
    setPeriodo('Todos');
  }

  const total = resultado.length;
  const textoContador = `${total} ${total === 1 ? 'estudante encontrado' : 'estudantes encontrados'}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PatientHeader />

        <Text style={styles.titulo}>Estudantes disponíveis</Text>
        <Text style={styles.subtitulo}>
          Encontre estudantes de Psicologia para atendimentos supervisionados.
        </Text>

        {/* Busca com botão de filtros */}
        <AppInput
          icone="search"
          placeholder="Buscar por nome, abordagem ou tema..."
          value={busca}
          onChangeText={setBusca}
          iconeDireita={mostrarFiltros ? 'close' : 'options-outline'}
          onPressIconeDireita={() => setMostrarFiltros(!mostrarFiltros)}
          fundoBranco
        />

        <FilterChips opcoes={AREAS} selecionado={area} onSelecionar={setArea} />

        {/* Painel de filtros extras */}
        {mostrarFiltros && (
          <View style={styles.painel}>
            <Text style={styles.painelTitulo}>Disponibilidade</Text>
            <FilterChips
              opcoes={FILTROS_DISPONIBILIDADE}
              selecionado={disponibilidade}
              onSelecionar={setDisponibilidade}
            />

            <Text style={styles.painelTitulo}>Período</Text>
            <FilterChips
              opcoes={FILTROS_PERIODO}
              selecionado={periodo}
              onSelecionar={setPeriodo}
            />
          </View>
        )}

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
              <StudentCard
                key={estudante.id}
                estudante={estudante}
                detalhado
              />
            ))}
          </View>
        ) : (
          <View style={styles.vazio}>
            <Ionicons name="search-outline" size={28} color={colors.primaria} />
            <Text style={styles.vazioTitulo}>Nenhum estudante encontrado</Text>
            <Text style={styles.vazioTexto}>
              Tente outra palavra ou toque em "Limpar filtros".
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}