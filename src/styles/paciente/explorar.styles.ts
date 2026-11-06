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
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    marginBottom: 16,
  },

  // Painel de filtros
  painel: {
    backgroundColor: colors.primariaClara,
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    gap: 10,
  },
  painelTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.titulo,
  },

  // Contador
  contadorLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contadorPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.verde,
  },
  contadorTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.texto,
  },
  limpar: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  lista: {
    gap: 12,
  },

  // Sem resultado
  vazio: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 24,
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