import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelecionado: {
    borderColor: colors.primaria,
  },

  // Ícone + bolinha de seleção
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconeCaixa: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primariaClara,
    backgroundColor: colors.primariaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelecionado: {
    borderColor: colors.primaria,
    backgroundColor: colors.branco,
  },
  radioPonto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaria,
  },

  // Título + etiqueta
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
  },
  tag: {
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaria,
  },

  descricao: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 20,
    marginBottom: 14,
  },

  // Selo de destaque embaixo
  destaque: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.primariaClara,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  destaqueTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
});