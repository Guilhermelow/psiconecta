import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconeCirculo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  fundoVerde: {
    backgroundColor: colors.verdeClaro,
  },
  fundoRoxo: {
    backgroundColor: colors.primariaClara,
  },
  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.titulo,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    textAlign: 'center',
  },
});