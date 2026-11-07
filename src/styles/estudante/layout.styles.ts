import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.branco,
    borderTopColor: colors.borda,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.primaria,
    color: colors.branco,
    fontSize: 10,
  },
});