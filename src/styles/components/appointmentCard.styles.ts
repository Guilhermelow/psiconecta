import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Etiqueta da data
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pillVerde: { backgroundColor: colors.verdeClaro },
  pillRoxo: { backgroundColor: colors.primariaClara },
  pillCinza: { backgroundColor: colors.inputFundo },
  pillTexto: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Etiqueta de situação (Concluída / Cancelada)
  tag: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  tagVerde: { backgroundColor: colors.verdeClaro },
  tagVermelha: { backgroundColor: colors.vermelhoClaro },
  tagTexto: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Estudante
  estudante: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: 24,
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

  // Informações
  infos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.inputFundo,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoTexto: {
    fontSize: 12,
    color: colors.texto,
  },

  // Links embaixo do botão
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },
});