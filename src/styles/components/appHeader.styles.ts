import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  espaco: {
    width: 40, // mesmo tamanho do botão, pra logo ficar centralizada
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logo: {
    width: 24,
    height: 24,
  },
  marcaTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaria,
  },
    // Modelo com título (ex.: "Perfil do estudante")
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.titulo,
  },
});