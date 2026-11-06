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
  resumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumoTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.texto,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
    marginTop: 20,
    marginBottom: 10,
  },
  lista: {
    gap: 10,
  },

  // Sem notificações
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
  },
});