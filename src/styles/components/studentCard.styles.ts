import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.branco,
    borderRadius: 18,
    padding: 16,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  foto: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  textos: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 2,
  },
  curso: {
    fontSize: 12,
    color: colors.textoClaro,
    lineHeight: 17,
  },
  foco: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  focoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  horarioTexto: {
    fontSize: 13,
    color: colors.texto,
  },
  botaoPerfil: {
    backgroundColor: colors.primariaClara,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  botaoPerfilTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaria,
  },
    // Versão detalhada (Explorar)
  nomeDetalhado: {
    marginBottom: 4,
  },
  cursoDestaque: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaria,
    marginBottom: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  supervisor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.inputFundo,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  supervisorTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.texto,
  },
});