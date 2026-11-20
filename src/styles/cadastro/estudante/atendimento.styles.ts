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
    marginBottom: 4,
  },
  secao: {
    marginTop: 24,
  },
  rotuloLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
    marginBottom: 8,
  },
  contador: {
    fontSize: 12,
    color: colors.textoClaro,
    marginBottom: 8,
  },
  textarea: {
    minHeight: 120,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.titulo,
    lineHeight: 22,
    outlineWidth: 0,
  },
  erroTexto: {
    fontSize: 12,
    color: colors.erro,
    marginTop: 6,
  },
  aviso: {
    marginTop: 24,
    marginBottom: 24,
  },
});
