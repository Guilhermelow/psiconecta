import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  espaco: {
    width: 40,
  },
  passo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primariaClara,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  passoPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaria,
  },
  passoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  barra: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primariaClara,
    overflow: 'hidden',
  },
  barraPreenchida: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primaria,
  },
  topoEtiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  logo: {
    width: 28,
    height: 28,
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primariaClara,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  etiquetaTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaria,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  passoTextoSolto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
});