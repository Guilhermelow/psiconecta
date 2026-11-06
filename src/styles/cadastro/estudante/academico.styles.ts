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

  // Selo "Vínculo Universitário"
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.primariaClara,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  seloTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    marginBottom: 20,
  },

  // Card "Credenciamento Acadêmico"
  cardCredenciamento: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
  },
  credenciamentoImagem: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  credenciamentoTextos: {
    flex: 1,
  },
  credenciamentoTituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  credenciamentoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.verde,
  },
  credenciamentoTexto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 18,
  },

  // Títulos das seções (curso e período)
  labelLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  labelDireita: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Card do curso
  cardCurso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primariaClara,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  cursoIcone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cursoTextos: {
    flex: 1,
  },
  cursoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  cursoSubtitulo: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  ativo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.verde,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  ativoTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.branco,
  },

  // Botões de período
  periodos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  periodo: {
    flexGrow: 1,
    flexBasis: '30%', // 3 por linha
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.branco,
    alignItems: 'center',
  },
  periodoSelecionado: {
    backgroundColor: colors.primaria,
  },
  periodoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.texto,
  },
  periodoTextoSelecionado: {
    color: colors.branco,
  },
  periodoDica: {
    fontSize: 12,
    color: colors.texto,
    lineHeight: 17,
    marginTop: 10,
  },
  erroTexto: {
    fontSize: 12,
    color: colors.erro,
    marginTop: 6,
  },
  espacoPeriodo: {
    marginBottom: 20,
  },

  // Card "Por que solicitamos esses dados?"
  cardInfo: {
    backgroundColor: colors.primariaClara,
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    marginBottom: 24,
  },
  infoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  infoIcone: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitulo: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  infoTexto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
    marginBottom: 12,
  },
  resolucao: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  resolucaoTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.texto,
  },

  // "Voltar ao passo anterior"
  voltar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  voltarTexto: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.texto,
  },
});