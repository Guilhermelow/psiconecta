import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    marginBottom: 20,
  },
  texto: {
    fontSize: 14,
    color: colors.texto,
  },

  // Card de detalhes
  cardDetalhes: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    marginBottom: 24,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  linhaIcone: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
    marginBottom: 2,
  },
  valor: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  detalhe: {
    fontSize: 12,
    color: colors.texto,
    lineHeight: 17,
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borda,
  },

  // Orientações
  secaoTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 10,
  },
  avisos: {
    gap: 10,
    marginBottom: 16,
  },

  // Rodapé fixo
  rodape: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
});