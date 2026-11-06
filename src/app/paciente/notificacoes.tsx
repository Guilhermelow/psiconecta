import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import NotificationCard from '@/components/NotificationCard';
import { useNotificacoes, NotificacaoComLeitura } from '@/contexts/NotificacoesContext';
import { ehHoje } from '@/utils/datas';
import { styles } from '@/styles/paciente/notificacoes.styles';
import { colors } from '@/styles/colors';

const SETE_DIAS = 7 * 24 * 60 * 60 * 1000;

export default function Notificacoes() {
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas } = useNotificacoes();

  // Separa por tempo
  const agora = Date.now();
  const grupos = [
    {
      titulo: 'Hoje',
      itens: notificacoes.filter((n) => ehHoje(n.quando)),
    },
    {
      titulo: 'Esta semana',
      itens: notificacoes.filter(
        (n) => !ehHoje(n.quando) && agora - n.quando.getTime() < SETE_DIAS
      ),
    },
    {
      titulo: 'Anteriores',
      itens: notificacoes.filter(
        (n) => !ehHoje(n.quando) && agora - n.quando.getTime() >= SETE_DIAS
      ),
    },
  ].filter((grupo) => grupo.itens.length > 0); // esconde grupos vazios

  function abrir(notificacao: NotificacaoComLeitura) {
    marcarComoLida(notificacao.id);
    if (notificacao.consultaId) {
      router.push(`/paciente/consulta/${notificacao.consultaId}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Notificações" />

        {notificacoes.length > 0 ? (
          <>
            <View style={styles.resumo}>
              <Text style={styles.resumoTexto}>
                {naoLidas > 0
                  ? `${naoLidas} ${naoLidas === 1 ? 'não lida' : 'não lidas'}`
                  : 'Tudo em dia ✨'}
              </Text>
              {naoLidas > 0 && (
                <TouchableOpacity onPress={marcarTodasComoLidas}>
                  <Text style={styles.link}>Marcar todas como lidas</Text>
                </TouchableOpacity>
              )}
            </View>

            {grupos.map((grupo) => (
              <View key={grupo.titulo}>
                <Text style={styles.secaoTitulo}>{grupo.titulo}</Text>
                <View style={styles.lista}>
                  {grupo.itens.map((notificacao) => (
                    <NotificationCard
                      key={notificacao.id}
                      notificacao={notificacao}
                      onPress={() => abrir(notificacao)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.vazio}>
            <Ionicons name="notifications-outline" size={28} color={colors.primaria} />
            <Text style={styles.vazioTitulo}>Nenhuma notificação</Text>
            <Text style={styles.vazioTexto}>
              Avisos sobre suas consultas aparecerão aqui.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}