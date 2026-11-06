import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  lista: {
    gap: 12,
  },
  passo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
  },
  numero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 2,
  },
  texto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },
});