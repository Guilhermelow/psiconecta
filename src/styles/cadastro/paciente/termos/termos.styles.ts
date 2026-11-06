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

  // Card "Garantias Éticas"
  cardGarantias: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  garantiasTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.inputFundo,
    padding: 16,
  },
  garantiasIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  garantiasTextos: {
    flex: 1,
  },
  garantiasTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  garantiasSubtitulo: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  sigilo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.verde,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  sigiloTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.branco,
  },

  // Itens 1 e 2
  garantiasCorpo: {
    padding: 16,
    gap: 18,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
  },
  itemIcone: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextos: {
    flex: 1,
  },
  itemTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 4,
  },
  itemTexto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },

  // Checkboxes
  checks: {
    gap: 12,
    marginBottom: 24,
  },
  link: {
    color: colors.primaria,
    fontWeight: '700',
  },
});