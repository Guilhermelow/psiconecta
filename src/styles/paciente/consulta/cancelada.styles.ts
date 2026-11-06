import { StyleSheet } from 'react-native';
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
  texto: {
    fontSize: 14,
    color: colors.texto,
    marginBottom: 16,
  },

  // Comprovante
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    marginBottom: 16,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  protocolo: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.titulo,
  },
  estudante: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    padding: 12,
  },
  foto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  estudanteTextos: {
    flex: 1,
  },
  estudanteRotulo: {
    fontSize: 11,
    color: colors.textoClaro,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  instituicao: {
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  instituicaoTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaria,
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
  linhaRotulo: {
    fontSize: 11,
    color: colors.textoClaro,
  },
  valor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.titulo,
  },

  botoes: {
    gap: 12,
    marginTop: 24,
  },
});