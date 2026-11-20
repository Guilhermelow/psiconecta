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

  // Faixas ativas
  lista: {
    gap: 12,
  },
  dia: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  diaNome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  faixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primariaClara,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  faixaTextos: {
    flex: 1,
  },
  faixaHorario: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaria,
  },
  faixaSub: {
    fontSize: 12,
    color: colors.texto,
  },
  faixaRemover: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.branco,
  },
  confirmacao: {
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 12,
    gap: 10,
    marginTop: 8,
  },
  confirmacaoTexto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botao: {
    flex: 1,
  },
  vazio: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
  },
  vazioTexto: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
    textAlign: 'center',
  },
  nota: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
    marginTop: 12,
  },

  // Nova faixa
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
    marginTop: 24,
    marginBottom: 12,
  },
  formulario: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.titulo,
  },
  steppers: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 12,
  },
  opcoes: {
    gap: 10,
  },
  texto: {
    fontSize: 14,
    color: colors.texto,
  },
  previa: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
  erro: {
    fontSize: 13,
    color: colors.erro,
  },
  sucesso: {
    fontSize: 13,
    color: colors.verde,
  },
});
