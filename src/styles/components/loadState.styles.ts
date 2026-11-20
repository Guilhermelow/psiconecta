import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  caixa: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  caixaErro: {
    backgroundColor: colors.vermelhoClaro,
  },
  texto: {
    fontSize: 13,
    color: colors.textoClaro,
    textAlign: 'center',
    lineHeight: 19,
  },
  textoErro: {
    color: colors.erro,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaria,
  },
});
