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
  texto: {
    fontSize: 14,
    color: colors.texto,
    marginBottom: 16,
  },

  // Resumo da consulta
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginVertical: 16,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  estudante: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  estudanteTextos: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  curso: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  dataLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.inputFundo,
    borderRadius: 12,
    padding: 12,
  },
  dataTextos: {
    flex: 1,
  },
  dataTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.titulo,
  },
  dataSub: {
    fontSize: 12,
    color: colors.texto,
  },

  // Atalho para reagendar
  reagendar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primariaClara,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  reagendarTexto: {
    flex: 1,
    fontSize: 13,
    color: colors.texto,
  },
  reagendarLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },

  // Motivos
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
    marginBottom: 14,
  },
  motivos: {
    gap: 10,
    marginBottom: 16,
  },

  botoes: {
    gap: 12,
    marginTop: 24,
  },
});