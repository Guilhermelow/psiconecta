import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 14,
  },
  cardMarcado: {
    backgroundColor: colors.primariaClara,
  },
  caixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.primariaMedia,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaMarcada: {
    backgroundColor: colors.primaria,
    borderColor: colors.primaria,
  },
  texto: {
    flex: 1,
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },
});