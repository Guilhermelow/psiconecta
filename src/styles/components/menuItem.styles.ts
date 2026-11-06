import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  icone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  subtitulo: {
    fontSize: 12,
    color: colors.textoClaro,
    marginTop: 2,
  },
});