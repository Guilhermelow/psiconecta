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
    marginBottom: 16,
  },

  // Card principal
  cardPerfil: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  foto: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.primariaClara,
    marginBottom: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.titulo,
  },
  curso: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
    marginTop: 2,
    marginBottom: 10,
  },
  seloCentro: {
    alignSelf: 'center',
  },

  // Seções
  secaoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
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
  grupo: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borda,
  },

  // Perfil profissional
  card: {
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
  texto: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
  },
  vazioTexto: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.textoClaro,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Sair
  botaoSair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.vermelhoClaro,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 24,
  },
  botaoSairTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.erro,
  },
  rodape: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
    marginTop: 20,
  },
});