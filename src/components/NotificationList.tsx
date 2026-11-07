import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import NotificationCard from '@/components/NotificationCard';
import { useNotificacoes, NotificacaoComLeitura } from '@/contexts/NotificacoesContext';
import { ehHoje } from '@/utils/datas';
import { styles } from '@/styles/components/notificationList.styles';
import { colors } from '@/styles/colors';

const SETE_DIAS = 7 * 24 * 60 * 60 * 1000;

type Props = {
  textoVazio: string;
};

// Lista agrupada (Hoje / Esta semana / Anteriores) — usada pelos dois lados
export default function NotificationList({ textoVazio }: Props) {
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas } = useNotificacoes();

  const agora = Date.now();
  const grupos = [
    { titulo: 'Hoje', itens: notificacoes.filter((n) => ehHoje(n.quando)) },
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
  ].filter((grupo) => grupo.itens.length > 0);

  function abrir(notificacao: NotificacaoComLeitura) {
    marcarComoLida(notificacao.id);
    if (notificacao.rota) router.navigate(notificacao.rota);
  }

  if (notificacoes.length === 0) {
    return (
      <View style={styles.vazio}>
        <Ionicons name="notifications-outline" size={28} color={colors.primaria} />
        <Text style={styles.vazioTitulo}>Nenhuma notificação</Text>
        <Text style={styles.vazioTexto}>{textoVazio}</Text>
      </View>
    );
  }

  return (
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
  );
}