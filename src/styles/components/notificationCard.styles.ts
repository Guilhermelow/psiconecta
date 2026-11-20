import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardNaoLida: {
    borderColor: colors.primariaClara,
  },
  icone: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 2,
  },
  texto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },
  tempo: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textoClaro,
    marginTop: 6,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaria,
    marginTop: 4,
  },
});