import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.titulo,
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    marginBottom: 24,
  },
  cards: {
    gap: 16,
    marginBottom: 20,
  },
  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  avisoTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.texto,
    lineHeight: 18,
  },
});