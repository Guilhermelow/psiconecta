import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  labelDireita: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.inputFundo,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  campoBranco: {
    backgroundColor: colors.branco,
  },
  campoFocado: {
    borderColor: colors.primaria,
    backgroundColor: colors.branco,
  },
  campoErro: {
    borderColor: colors.erro,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.titulo,
    outlineWidth: 0,
  },
  erroTexto: {
    fontSize: 12,
    color: colors.erro,
    marginTop: 6,
  },
  dica: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 6,
  },
  dicaTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.texto,
    lineHeight: 17,
  },
});