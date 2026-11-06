import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.branco,
    borderRadius: 14,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  opcaoSelecionada: {
    borderColor: colors.primaria,
  },
  icone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.titulo,
  },
  // Mesma bolinha do card de tipo de conta
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primariaClara,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelecionado: {
    borderColor: colors.primaria,
    backgroundColor: colors.branco,
  },
  radioPonto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaria,
  },
});