import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  lista: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.branco,
  },
  chipAtivo: {
    backgroundColor: colors.primaria,
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.texto,
  },
  chipTextoAtivo: {
    color: colors.branco,
  },
    listaQuebrada: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});