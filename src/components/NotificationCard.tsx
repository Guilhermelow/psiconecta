import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NotificacaoComLeitura } from '@/contexts/NotificacoesContext';
import type { TipoNotificacao } from '@/utils/notificacoes';
import { tempoRelativo } from '@/utils/datas';
import { styles } from '@/styles/components/notificationCard.styles';
import { colors } from '@/styles/colors';

// Ícone e cores de cada tipo
const APARENCIA: Record<
  TipoNotificacao,
  { icone: keyof typeof Ionicons.glyphMap; cor: string; fundo: string }
> = {
  hoje: { icone: 'calendar', cor: colors.primaria, fundo: colors.primariaClara },
  sala: { icone: 'videocam', cor: colors.verde, fundo: colors.verdeClaro },
  confirmada: { icone: 'checkmark-circle', cor: colors.primaria, fundo: colors.primariaClara },
  cancelada: { icone: 'close-circle', cor: colors.erro, fundo: colors.vermelhoClaro },
  dica: { icone: 'bulb-outline', cor: colors.primaria, fundo: colors.primariaClara },
  solicitacao: { icone: 'person-add', cor: colors.primaria, fundo: colors.primariaClara },
};

type Props = {
  notificacao: NotificacaoComLeitura;
  onPress: () => void;
};

export default function NotificationCard({ notificacao, onPress }: Props) {
  const aparencia = APARENCIA[notificacao.tipo];

  return (
    <TouchableOpacity
      style={[styles.card, !notificacao.lida && styles.cardNaoLida]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.icone, { backgroundColor: aparencia.fundo }]}>
        <Ionicons name={aparencia.icone} size={20} color={aparencia.cor} />
      </View>

      <View style={styles.textos}>
        <Text style={styles.titulo}>{notificacao.titulo}</Text>
        <Text style={styles.texto}>{notificacao.texto}</Text>
        <Text style={styles.tempo}>{tempoRelativo(notificacao.quando)}</Text>
      </View>

      {!notificacao.lida && <View style={styles.ponto} />}
    </TouchableOpacity>
  );
}