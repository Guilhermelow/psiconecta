import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    width: '100%',
  },
  botaoPrimario: {
    backgroundColor: colors.primaria,
  },
  botaoSecundario: {
    backgroundColor: colors.primariaClara,
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
  },
  textoPrimario: {
    color: colors.branco,
  },
  textoSecundario: {
    color: colors.primaria,
  },
    botaoDesabilitado: {
    backgroundColor: colors.primariaClara,
  },
  textoDesabilitado: {
    color: colors.primariaMedia,
  },
    botaoPerigo: {
    backgroundColor: colors.erro,
  },
  textoPerigo: {
    color: colors.branco,
  },
});