import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 16,
  },
  lista: {
    gap: 14,
    marginTop: 16,
  },
  aviso: {
    marginTop: 16,
  },

  // Aba vazia
  vazio: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
  },
  vazioTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  vazioTexto: {
    fontSize: 13,
    color: colors.textoClaro,
    textAlign: 'center',
    marginBottom: 8,
  },
  vazioBotao: {
    alignSelf: 'stretch',
  },
});