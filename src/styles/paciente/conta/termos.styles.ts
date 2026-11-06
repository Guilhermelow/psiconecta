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
  intro: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
    marginBottom: 16,
  },
  lista: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
  },
  icone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 4,
  },
  texto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 20,
  },
  atualizacao: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
    marginTop: 20,
  },
});