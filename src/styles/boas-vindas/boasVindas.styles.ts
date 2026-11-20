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

  // Cabeçalho com logo
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cabecalhoLogo: {
    width: 32,
    height: 32,
  },
  cabecalhoTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
  },

  // Imagem com a faixa por cima
  imagemCaixa: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  imagemFaixa: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  faixaEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  faixaTextoForte: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.titulo,
  },
  faixaTexto: {
    fontSize: 12,
    color: colors.textoClaro,
  },

  // Textos
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

  // Cards e botões
  cards: {
    gap: 12,
    marginBottom: 24,
  },
  botoes: {
    gap: 12,
    marginBottom: 20,
  },

  // Termos
  termos: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: colors.primaria,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});