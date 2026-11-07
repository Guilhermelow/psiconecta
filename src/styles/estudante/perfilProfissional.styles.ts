import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingBottom: 24,
  },
  secao: {
    marginTop: 24,
  },
  rotuloLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  contador: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  ajuda: {
    fontSize: 12,
    color: colors.textoClaro,
    marginBottom: 10,
  },
  textarea: {
    minHeight: 130,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.titulo,
    lineHeight: 22,
    outlineWidth: 0,
  },

  // Rodapé fixo
  rodape: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
});