import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: colors.verdeClaro,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  texto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.verde,
  },
});