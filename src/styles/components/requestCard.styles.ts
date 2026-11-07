import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },

  // Paciente
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textos: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  sub: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  online: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primariaClara,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  onlineTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Data e hora
  horario: {
    backgroundColor: colors.inputFundo,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  horarioLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  horarioTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },

  // Motivo da busca
  rotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  queixa: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.texto,
    lineHeight: 21,
    borderLeftWidth: 3,
    borderLeftColor: colors.primariaClara,
    paddingLeft: 12,
  },

  // Conflito de horário
  conflito: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.vermelhoClaro,
    borderRadius: 12,
    padding: 12,
  },
  conflitoTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.titulo,
    lineHeight: 18,
  },

  // Botões
  botoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botao: {
    flex: 1,
  },

  // Área de recusa
  recusa: {
    backgroundColor: colors.inputFundo,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  recusaTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  recusaTexto: {
    fontSize: 12,
    color: colors.texto,
    lineHeight: 18,
  },
});