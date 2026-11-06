import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import FilterChips from '@/components/FilterChips';
import StudentCard from '@/components/StudentCard';
import VerifiedBadge from '@/components/VerifiedBadge';
import { useAuth } from '@/contexts/AuthContext';
import { ESTUDANTES, AREAS } from '@/mocks/estudantes';
import { useConsultas } from '@/contexts/ConsultasContext';
import { dataDaChave, dataLonga } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/paciente/inicio.styles';
import { colors } from '@/styles/colors';
import PatientHeader from '@/components/PatientHeader';
import { filtrarEstudantes } from '@/utils/filtrarEstudantes';

export default function InicioPaciente() {
    const { usuario } = useAuth();
    const [busca, setBusca] = useState('');
    const [area, setArea] = useState('Todos');

    const nome = primeiroNome(usuario?.nome);
    const { proxima } = useConsultas();
    const estudanteConsulta = proxima
        ? ESTUDANTES.find((item) => item.id === proxima.estudanteId)
        : undefined;

    const estudantesFiltrados = filtrarEstudantes(ESTUDANTES, { busca, area }).slice(0, 3);

    return (
        // edges={['top']}: as abas de baixo já cuidam do espaço inferior
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <PatientHeader />
                {/* Saudação */}
                <Text style={styles.saudacao}>Olá{nome ? `, ${nome}` : ''}!</Text>
                <Text style={styles.saudacaoTexto}>Que bom ter você por aqui.</Text>

                        {/* Próxima consulta */}
        <View style={styles.card}>
          {proxima && estudanteConsulta ? (
            <>
              <View style={styles.cardTopo}>
                <View style={styles.cardTituloLinha}>
                  <Ionicons name="calendar" size={18} color={colors.primaria} />
                  <Text style={styles.cardTitulo}>Sua próxima consulta</Text>
                </View>
                <View style={styles.confirmada}>
                  <View style={styles.confirmadaPonto} />
                  <Text style={styles.confirmadaTexto}>Confirmada</Text>
                </View>
              </View>

              <View style={styles.consultaEstudante}>
                <Image
                  source={
                    estudanteConsulta.foto
                      ? { uri: estudanteConsulta.foto }
                      : require('../../../../assets/avatar-padrao.png')
                  }
                  style={styles.consultaFoto}
                />
                <View style={styles.consultaTextos}>
                  <Text style={styles.consultaNome}>{estudanteConsulta.nome}</Text>
                  <VerifiedBadge texto="Estudante verificado" />
                  <Text style={styles.consultaCurso}>
                    Estudante de Psicologia — {estudanteConsulta.periodo} período
                  </Text>
                </View>
              </View>

              <View style={styles.infoLinha}>
                <Ionicons name="calendar-outline" size={16} color={colors.primaria} />
                <Text style={styles.infoTextoForte}>
                  {dataLonga(dataDaChave(proxima.data))} às {proxima.hora}
                </Text>
              </View>
              <View style={styles.infoLinha}>
                <Ionicons name="videocam-outline" size={16} color={colors.primaria} />
                <Text style={styles.infoTexto}>Atendimento online supervisionado</Text>
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
                Escolha um estudante abaixo para marcar seu primeiro atendimento.
              </Text>
            </View>
          )}
        </View>

                {/* Busca */}
                <Text style={styles.secaoTitulo}>Encontre um estudante</Text>
                <AppInput
                    icone="search"
                    placeholder="Buscar por nome ou área (ex: ansiedade)..."
                    value={busca}
                    onChangeText={setBusca}
                    fundoBranco
                />
                <FilterChips opcoes={AREAS} selecionado={area} onSelecionar={setArea} />

                {/* Lista */}
                <View style={styles.secaoLinha}>
                    <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>Estudantes disponíveis</Text>
                    <TouchableOpacity onPress={() => router.navigate('/paciente/explorar')}>
                        <Text style={styles.verTodos}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                {estudantesFiltrados.length > 0 ? (
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
                )}
            </ScrollView>
        </SafeAreaView>
    );
}