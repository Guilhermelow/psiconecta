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

  // Título com contador
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.titulo,
  },
  contador: {
    minWidth: 24,
    alignItems: 'center',
    backgroundColor: colors.primaria,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  contadorTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.branco,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.texto,
    marginBottom: 16,
  },

  // Aviso depois de aceitar/recusar
  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.verdeClaro,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  avisoNeutro: {
    backgroundColor: colors.primariaClara,
  },
  avisoTexto: {
    flex: 1,
    fontSize: 13,
    color: colors.titulo,
    lineHeight: 19,
  },
  avisoLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },

  lista: {
    gap: 16,
    marginTop: 16,
  },

  // Vazio
  vazio: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
  },
  vazioTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  vazioTexto: {
    fontSize: 13,
    color: colors.textoClaro,
    textAlign: 'center',
  },
});