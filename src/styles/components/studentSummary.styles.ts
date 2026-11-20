import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  textos: {
    flex: 1,
    gap: 4,
  },
  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
  },
  curso: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.primariaClara,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  supervisao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.inputFundo,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  supervisaoTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.texto,
  },
});