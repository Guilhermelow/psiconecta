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

  // Selo verde
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.verdeClaro,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 12,
  },
  seloTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.verde,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    marginBottom: 24,
  },

  avisos: {
    gap: 12,
    marginTop: 4,
    marginBottom: 24,
  },

  // "Já tem uma conta? Entrar"
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  rodapeTexto: {
    fontSize: 14,
    color: colors.texto,
  },
  rodapeLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaria,
  },
});