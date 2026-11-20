import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  stepper: {
    flex: 1,
    gap: 6,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: 6,
  },
  botao: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.4,
  },
  valor: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
});
