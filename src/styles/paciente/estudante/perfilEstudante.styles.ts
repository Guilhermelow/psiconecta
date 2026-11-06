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

  // Cards
  card: {
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  cardTituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  cardTopoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.titulo,
  },
  texto: {
    fontSize: 14,
    color: colors.texto,
    lineHeight: 21,
  },

  // Apresentação
  apresentacao: {
    alignItems: 'center',
    paddingTop: 24,
  },
  foto: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 4,
    borderColor: colors.primariaClara,
  },
  seloCentro: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.titulo,
    textAlign: 'center',
  },
  curso: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaria,
    marginTop: 2,
    marginBottom: 10,
  },
  instituicao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  instituicaoTexto: {
    flexShrink: 1,
    fontSize: 13,
    color: colors.texto,
    textAlign: 'center',
  },
  supervisao: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 6,
    backgroundColor: colors.inputFundo,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  supervisaoTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.texto,
  },

  // Abordagem e áreas
  abordagem: {
    alignSelf: 'flex-start',
    backgroundColor: colors.inputFundo,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 12,
  },
  abordagemTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.texto,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.primariaClara,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaria,
  },

  // Disponibilidade
  abertos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.verdeClaro,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  abertosPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.verde,
  },
  abertosTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.verde,
  },
  dia: {
    marginBottom: 14,
  },
  diaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diaTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  vagas: {
    fontSize: 12,
    color: colors.textoClaro,
  },
  horarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  horario: {
    flexBasis: '30%', // 3 por linha
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.inputFundo,
    alignItems: 'center',
  },
  horarioSelecionado: {
    backgroundColor: colors.primaria,
  },
  horarioTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titulo,
  },
  horarioTextoSelecionado: {
    color: colors.branco,
  },

  // Botão fixo embaixo
  rodape: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
    dicaHorarios: {
    fontSize: 12,
    color: colors.textoClaro,
    marginTop: -6,
    marginBottom: 12,
  },
});