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
  },

  // Status + protocolo
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusVerde: { backgroundColor: colors.verdeClaro },
  statusCinza: { backgroundColor: colors.inputFundo },
  statusVermelho: { backgroundColor: colors.vermelhoClaro },
  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  protocolo: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textoClaro,
  },

  // Cards
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    marginBottom: 16,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linhaIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linhaTextos: {
    flex: 1,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valor: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borda,
  },

  // Card da sala
  sala: {
    backgroundColor: colors.primariaClara,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  salaTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
    textAlign: 'center',
  },
  salaTextoLinha: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  salaTexto: {
    fontSize: 13,
    color: colors.texto,
  },

  // Orientações
  orientacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orientacaoTexto: {
    flex: 1,
    fontSize: 14,
    color: colors.titulo,
  },

  // Ações
  acoes: {
    gap: 12,
    marginTop: 8,
  },
  cancelarLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  cancelarTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.erro,
  },
  nota: {
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
  },
});