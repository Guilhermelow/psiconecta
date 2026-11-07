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

  // Linha do mês
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secaoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mes: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Resumo
  resumo: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  resumoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 12,
  },
  resumoIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumoTextos: {
    flex: 1,
  },
  resumoRotulo: {
    fontSize: 11,
    color: colors.textoClaro,
  },
  resumoValor: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },

  // Sessões do dia
  diaTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 12,
  },
  lista: {
    gap: 10,
  },
  vazio: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 24,
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

  botao: {
    marginTop: 24,
  },
});