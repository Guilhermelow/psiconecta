import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  lista: {
    gap: 8,
    paddingBottom: 4,
  },
  dia: {
    width: 64,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.branco,
    alignItems: 'center',
    gap: 2,
  },
  diaSelecionado: {
    backgroundColor: colors.primaria,
  },
  diaDesabilitado: {
    opacity: 0.45,
  },
  semana: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textoClaro,
  },
  numero: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.titulo,
  },
  legenda: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textoClaro,
  },
  legendaDestaque: {
    color: colors.primaria,
  },
  textoBranco: {
    color: colors.branco,
  },
});