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

  // Card de boas-vindas
  cardBoasVindas: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.primariaClara,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
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
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
  },

  // Card do formulário
  cardForm: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  linhaOpcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Divisor "ou"
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borda,
  },
  divisorTexto: {
    fontSize: 12,
    color: colors.textoClaro,
  },

  // Card "Criar conta"
  cardCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 18,
  },
  cadastroTexto: {
    fontSize: 14,
    color: colors.texto,
  },
  cadastroLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaria,
  },
});