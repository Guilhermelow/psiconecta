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

  // Card do perfil
  cardPerfil: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  foto: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: colors.primariaClara,
    marginBottom: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.titulo,
  },
  email: {
    fontSize: 13,
    color: colors.textoClaro,
    marginTop: 2,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Números
  estatisticas: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 12,
    marginTop: 16,
  },
  estatistica: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.inputFundo,
    borderRadius: 14,
    paddingVertical: 14,
  },
  estatisticaNumero: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaria,
  },
  estatisticaNumeroVerde: {
    color: colors.verde,
  },
  estatisticaTexto: {
    fontSize: 12,
    color: colors.texto,
    marginTop: 2,
  },

  // Grupos de menu
  secaoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 20,
    marginBottom: 8,
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