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
  texto: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
  },

  // Status
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusVerde: { backgroundColor: colors.verdeClaro },
  statusCinza: { backgroundColor: colors.inputFundo },
  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  supervisionado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supervisionadoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Cards
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    marginBottom: 16,
  },
  cardTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTituloTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },

  // Paciente
  paciente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  pacienteTextos: {
    flex: 1,
    gap: 4,
  },
  pacienteNome: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
  },
  sessao: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  sessaoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borda,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linhaIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linhaTextos: {
    flex: 1,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valor: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  detalhe: {
    fontSize: 13,
    color: colors.texto,
  },

  // Sala
  sala: {
    backgroundColor: colors.primariaClara,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  salaTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
    textAlign: 'center',
  },
  salaTexto: {
    fontSize: 13,
    color: colors.texto,
    textAlign: 'center',
  },

  // Motivo da busca
  queixa: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.texto,
    lineHeight: 21,
    borderLeftWidth: 3,
    borderLeftColor: colors.primariaClara,
    paddingLeft: 12,
  },

  // Contato de emergência
  contato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 12,
  },
  contatoTextos: {
    flex: 1,
  },
  contatoNome: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  contatoSub: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  botaoLigar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aviso: {
    fontSize: 12,
    color: colors.texto,
    lineHeight: 18,
  },

  // Supervisão
  supervisor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.inputFundo,
    borderRadius: 12,
    padding: 12,
  },
  supervisorTexto: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.titulo,
  },

  // Cancelamento
  cancelarLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  cancelarTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.erro,
  },
  nota: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
  },
  cancelamento: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  cancelamentoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  botao: {
    flex: 1,
  },
});