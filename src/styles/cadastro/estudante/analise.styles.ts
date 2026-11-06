import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingTop: 32,
    paddingBottom: 32,
  },

  // Topo
  topo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconeCirculo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primariaClara,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaria,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    textAlign: 'center',
  },

  // Cards
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 16,
  },

  // Linha do tempo
  etapa: {
    flexDirection: 'row',
    gap: 12,
  },
  etapaColuna: {
    alignItems: 'center',
  },
  etapaCirculo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etapaCirculoConcluido: {
    backgroundColor: colors.verde,
  },
  etapaCirculoAndamento: {
    backgroundColor: colors.primariaClara,
  },
  etapaLinha: {
    flex: 1,
    width: 2,
    marginVertical: 4,
    backgroundColor: colors.verde,
  },
  etapaTextos: {
    flex: 1,
    paddingBottom: 18,
  },
  etapaTituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 2,
  },
  etapaTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.titulo,
  },
  etapaTituloAndamento: {
    color: colors.primaria,
  },
  etapaDescricao: {
    fontSize: 12,
    color: colors.textoClaro,
    lineHeight: 17,
  },
  andamento: {
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  andamentoTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Card de prazo e protocolo
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  infoIcone: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextos: {
    flex: 1,
  },
  infoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.titulo,
  },
  infoTexto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },
  protocolo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputFundo,
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  protocoloLabel: {
    fontSize: 11,
    color: colors.textoClaro,
    marginBottom: 2,
  },
  protocoloCodigo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
    letterSpacing: 0.5,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
  copiar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  copiarTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Ajuda
  ajuda: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  ajudaTexto: {
    fontSize: 13,
    color: colors.texto,
  },
  ajudaLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
    // Botão só para testes (não aparece no app publicado)
  botaoTeste: {
    marginTop: 24,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.textoClaro,
    alignItems: 'center',
  },
  botaoTesteTexto: {
    fontSize: 12,
    color: colors.textoClaro,
  },
});