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
  // Saudação
  saudacao: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.titulo,
  },
  saudacaoTexto: {
    fontSize: 15,
    color: colors.texto,
    marginBottom: 20,
  },

  // Card da próxima consulta
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    marginBottom: 28,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  confirmada: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.verdeClaro,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  confirmadaPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.verde,
  },
  confirmadaTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.verde,
  },
  consultaEstudante: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  consultaFoto: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  consultaTextos: {
    flex: 1,
    gap: 4,
  },
  consultaNome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  consultaCurso: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTextoForte: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  infoTexto: {
    flex: 1,
    fontSize: 13,
    color: colors.texto,
  },
  espacoBotao: {
    marginTop: 8,
  },

  // Sem consulta
  semConsulta: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
  },

  // Seções
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 12,
  },
  secaoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  verTodos: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
  lista: {
    gap: 12,
  },

  // Busca sem resultado
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
});