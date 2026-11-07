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
  intro: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
    marginBottom: 16,
  },
  resumo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.branco,
    borderRadius: 14,
    padding: 12,
    marginVertical: 16,
  },
  resumoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  lista: {
    gap: 12,
  },

  // Rodapé fixo
  rodape: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
  rodapeTexto: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
    marginTop: 8,
  },
});