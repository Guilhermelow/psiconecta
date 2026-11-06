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
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
    marginBottom: 20,
  },
  cardDocumentos: {
    marginBottom: 20,
  },

  // Área para selecionar (antes de escolher)
  areaUpload: {
    alignItems: 'center',
    gap: 8,
    padding: 28,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primariaMedia,
    backgroundColor: colors.branco,
    marginBottom: 16,
  },
  areaUploadTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  areaUploadTexto: {
    fontSize: 12,
    color: colors.textoClaro,
  },

  // Card do arquivo escolhido
  cardArquivo: {
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  arquivoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  arquivoIcone: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.vermelhoClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arquivoIconeImagem: {
    backgroundColor: colors.primariaClara,
  },
  arquivoTextos: {
    flex: 1,
  },
  arquivoNome: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 2,
  },
  arquivoInfoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arquivoPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.verde,
  },
  arquivoInfo: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  botaoLixeira: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputFundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  substituir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  substituirTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  avisoSeguranca: {
    marginBottom: 24,
  },
});