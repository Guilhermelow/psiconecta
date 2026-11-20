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
    marginBottom: 28,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estudante: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  estudanteTextos: {
    flex: 1,
  },
  estudanteNome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  estudanteCurso: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borda,
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
  rotulo: {
    fontSize: 11,
    color: colors.textoClaro,
  },
  valor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.titulo,
  },

  // Próximos passos e botões
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 12,
  },
  botoes: {
    gap: 12,
    marginTop: 28,
  },
});