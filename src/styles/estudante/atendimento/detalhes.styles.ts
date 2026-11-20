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

  // Observação do paciente
  observacao: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.texto,
    lineHeight: 21,
    borderLeftWidth: 3,
    borderLeftColor: colors.primariaClara,
    paddingLeft: 12,
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

  nota: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
  },
  // Registro do atendimento
  acoes: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    marginBottom: 16,
  },
  acoesTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  erro: {
    fontSize: 13,
    color: colors.erro,
  },
  confirmacaoTitulo: {
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