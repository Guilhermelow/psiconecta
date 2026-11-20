import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caixa: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaMarcada: {
    backgroundColor: colors.primaria,
  },
  label: {
    fontSize: 13,
    color: colors.texto,
  },
});