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

  // Emergência
  emergencia: {
    backgroundColor: colors.vermelhoClaro,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  emergenciaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergenciaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  emergenciaTexto: {
    fontSize: 13,
    color: colors.titulo,
    lineHeight: 20,
  },

  secaoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 8,
  },

  // Perguntas
  grupo: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borda,
  },
  pergunta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  perguntaTexto: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  resposta: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 20,
    paddingBottom: 14,
  },

  // Cards simples
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  texto: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
  },
  versao: {
    fontSize: 12,
    color: colors.textoClaro,
  },
});