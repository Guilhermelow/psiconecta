import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingTop: 32,
    paddingBottom: 32,
  },

  // Topo
  topo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconeCirculo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.verdeClaro,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.verde,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.verde,
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

  // Prévia do perfil
  cardPreview: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  previewTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textoClaro,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.inputFundo,
    borderRadius: 16,
    padding: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.branco,
  },
  avatarSelo: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.verde,
    borderWidth: 2,
    borderColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perfilTextos: {
    flex: 1,
    gap: 4,
  },
  perfilNome: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
  },
  verificado: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: colors.verdeClaro,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  verificadoTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.verde,
  },
  perfilCurso: {
    fontSize: 12,
    color: colors.texto,
    lineHeight: 17,
  },
  supervisao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supervisaoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.verde,
  },

  // Próximos passos
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 12,
  },
  passos: {
    gap: 12,
    marginBottom: 24,
  },
  passo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
  },
  passoNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passoNumeroTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },
  passoTextos: {
    flex: 1,
  },
  passoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 2,
  },
  passoTexto: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },

  // Botões e rodapé
  botoes: {
    gap: 12,
    marginBottom: 20,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  rodapeTexto: {
    flexShrink: 1,
    fontSize: 12,
    color: colors.textoClaro,
    textAlign: 'center',
  },
});