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
  iconeCaixa: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 2,
  },
  texto: {
    fontSize: 12,
    color: colors.texto,
    lineHeight: 18,
  },
});