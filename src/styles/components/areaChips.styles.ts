import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  estado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: 14,
  },
  estadoTexto: {
    fontSize: 13,
    color: colors.textoClaro,
  },
  erroTexto: {
    flex: 1,
    fontSize: 13,
    color: colors.erro,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
});
