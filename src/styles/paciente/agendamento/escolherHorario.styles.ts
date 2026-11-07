import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    padding: 20,
    paddingBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 16,
  },
  texto: {
    fontSize: 14,
    color: colors.texto,
  },

  // Seções
  secaoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  secaoTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
  },
  mes: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  textoBranco: {
    color: colors.branco,
  },

  // Horários
  tituloHorarios: {
    marginTop: 24,
    marginBottom: 12,
  },
  horarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  horario: {
    flexBasis: '30%', // 3 por linha
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.branco,
  },
  horarioSelecionado: {
    backgroundColor: colors.primaria,
  },
  horarioTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },

  // Sem horários
  vazio: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
  },
  vazioTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.titulo,
  },
  vazioTexto: {
    fontSize: 13,
    color: colors.textoClaro,
    textAlign: 'center',
  },

  // Rodapé fixo
  rodape: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
    gap: 10,
  },
  resumo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  resumoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaria,
  },
});