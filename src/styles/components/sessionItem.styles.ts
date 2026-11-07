import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 14,
  },
  itemConcluido: {
    opacity: 0.6,
  },
  horaColuna: {
    width: 52,
  },
  hora: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaria,
  },
  fim: {
    fontSize: 11,
    color: colors.textoClaro,
  },
  divisor: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.borda,
  },
  foto: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textos: {
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  sub: {
    fontSize: 12,
    color: colors.textoClaro,
  },
});