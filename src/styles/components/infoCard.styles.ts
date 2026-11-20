import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
  },
  iconeCaixa: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primariaClara,
  },
  
  textos: {
    flex: 1,
  },
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
  },
  descricao: {
    fontSize: 13,
    color: colors.texto,
    lineHeight: 19,
  },
});