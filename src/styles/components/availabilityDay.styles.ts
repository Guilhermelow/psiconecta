import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  cardInativo: {
    opacity: 0.7,
  },

  // Topo: nome do dia + liga/desliga
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borda,
  },
  pontoAtivo: {
    backgroundColor: colors.verde,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  resumo: {
    fontSize: 12,
    color: colors.textoClaro,
  },

  // Faixas
  faixas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  faixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primariaClara,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  faixaTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },
  faixaPeriodo: {
    fontSize: 11,
    color: colors.texto,
  },
  dica: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  adicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
  },
  adicionarTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },

  // Editor de nova faixa
  editor: {
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  steppers: {
    flexDirection: 'row',
    gap: 10,
  },
  stepper: {
    flex: 1,
    gap: 6,
  },
  stepperRotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stepperLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: 6,
  },
  stepperBotao: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBotaoDesabilitado: {
    opacity: 0.4,
  },
  stepperValor: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  erro: {
    fontSize: 12,
    color: colors.erro,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botao: {
    flex: 1,
  },
});