import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import StudentHeader from '@/components/StudentHeader';
import NoticeCard from '@/components/NoticeCard';
import RequestCard from '@/components/RequestCard';
import { useAtendimentos, Solicitacao } from '@/contexts/AtendimentosContext';
import { DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/estudante/solicitacoes.styles';
import { colors } from '@/styles/colors';

type Aviso = {
  texto: string;
  tipo: 'sucesso' | 'neutro';
};

export default function Solicitacoes() {
  const { atendimentos, solicitacoes, aceitarSolicitacao, recusarSolicitacao } =
    useAtendimentos();
  const [aviso, setAviso] = useState<Aviso | null>(null);

  // As mais próximas primeiro
  const pendentes = [...solicitacoes].sort(
    (a, b) => dataEHora(a.data, a.hora).getTime() - dataEHora(b.data, b.hora).getTime()
  );

  // Procura um atendimento que ocupe o mesmo horário
  function conflitoCom(solicitacao: Solicitacao) {
    const inicio = dataEHora(solicitacao.data, solicitacao.hora).getTime();
    return atendimentos.find(
      (item) =>
        Math.abs(dataEHora(item.data, item.hora).getTime() - inicio) <
        DURACAO_MINUTOS * 60 * 1000
    );
  }

  function aceitar(solicitacao: Solicitacao) {
    aceitarSolicitacao(solicitacao.id);
    setAviso({
      texto: `Atendimento com ${primeiroNome(solicitacao.pacienteNome)} adicionado à sua agenda.`,
      tipo: 'sucesso',
    });
  }

  function recusar(solicitacao: Solicitacao, motivo: string) {
    recusarSolicitacao(solicitacao.id, motivo);
    setAviso({
      texto: `Solicitação de ${primeiroNome(solicitacao.pacienteNome)} recusada. O paciente volta para a triagem.`,
      tipo: 'neutro',
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StudentHeader />

        <View style={styles.tituloLinha}>
          <Text style={styles.titulo}>Solicitações</Text>
          {pendentes.length > 0 && (
            <View style={styles.contador}>
              <Text style={styles.contadorTexto}>{pendentes.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitulo}>Pacientes aguardando sua confirmação.</Text>

        {/* Aviso depois de aceitar ou recusar */}
        {aviso && (
          <View style={[styles.aviso, aviso.tipo === 'neutro' && styles.avisoNeutro]}>
            <Ionicons
              name={aviso.tipo === 'sucesso' ? 'checkmark-circle' : 'information-circle'}
              size={20}
              color={aviso.tipo === 'sucesso' ? colors.verde : colors.primaria}
            />
            <Text style={styles.avisoTexto}>{aviso.texto}</Text>
            {aviso.tipo === 'sucesso' ? (
              <TouchableOpacity onPress={() => router.navigate('/estudante/agenda')}>
                <Text style={styles.avisoLink}>Ver agenda</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setAviso(null)} hitSlop={10}>
                <Ionicons name="close" size={18} color={colors.textoClaro} />
              </TouchableOpacity>
            )}
          </View>
        )}

        <NoticeCard
          icone="shield-checkmark-outline"
          texto="Ao aceitar, o atendimento entra na sua agenda e o paciente é avisado. Todas as sessões contam com supervisão docente."
        />

        {pendentes.length > 0 ? (
          <View style={styles.lista}>
            {pendentes.map((solicitacao) => (
              <RequestCard
                key={solicitacao.id}
                solicitacao={solicitacao}
                conflito={conflitoCom(solicitacao)}
                onAceitar={() => aceitar(solicitacao)}
                onRecusar={(motivo) => recusar(solicitacao, motivo)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.vazio}>
            <Ionicons name="file-tray-outline" size={28} color={colors.primaria} />
            <Text style={styles.vazioTitulo}>Nenhuma solicitação pendente</Text>
            <Text style={styles.vazioTexto}>
              Novos pacientes triados pela clínica-escola aparecerão aqui.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}