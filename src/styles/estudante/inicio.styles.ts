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
    marginTop: 8,
  },
  data: {
    fontSize: 15,
    color: colors.texto,
    marginBottom: 20,
  },

  // Resumo do dia
  resumo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  resumoCard: {
    flex: 1,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  resumoIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumoNumero: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.titulo,
  },
  resumoTexto: {
    fontSize: 12,
    color: colors.texto,
  },

  // Títulos de seção
  secaoLinha: {
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
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Próximo atendimento
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    marginBottom: 24,
  },
  tempo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primariaClara,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tempoTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaria,
  },
  paciente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  pacienteTextos: {
    flex: 1,
  },
  pacienteNome: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
  },
  pacienteSub: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  infos: {
    flexDirection: 'row',
    gap: 10,
  },
  info: {
    flex: 1,
    backgroundColor: colors.inputFundo,
    borderRadius: 12,
    padding: 10,
  },
  infoRotulo: {
    fontSize: 11,
    color: colors.textoClaro,
    marginBottom: 2,
  },
  infoValor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.titulo,
  },
  supervisao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  supervisaoTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.texto,
  },
  linkCentro: {
    alignSelf: 'center',
  },

  // Solicitações pendentes
  solicitacoes: {
    backgroundColor: colors.primariaClara,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  solicitacoesTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  solicitacoesIcone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solicitacoesTextos: {
    flex: 1,
  },
  solicitacoesTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  solicitacoesTexto: {
    fontSize: 12,
    color: colors.texto,
    marginTop: 2,
  },

  // Ainda hoje
  lista: {
    gap: 10,
  },

  // Vazio
  vazio: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 20,
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