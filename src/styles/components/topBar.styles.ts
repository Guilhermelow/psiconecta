import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  marcaTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaria,
  },
  botaoIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificacaoPonto: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.erro,
    borderWidth: 1.5,
    borderColor: colors.branco,
  },
});