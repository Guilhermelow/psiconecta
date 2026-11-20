// Textos em português para os enums do backend
import type {
  ModalidadeAtendimento,
  StatusConsulta,
} from '@/types/api';
import { colors } from '@/styles/colors';

export const ROTULO_MODALIDADE: Record<ModalidadeAtendimento, string> = {
  ONLINE: 'Online',
  PRESENCIAL: 'Presencial',
  AMBOS: 'Online e presencial',
};

export const ROTULO_STATUS_CONSULTA: Record<StatusConsulta, string> = {
  PENDENTE: 'Pendente',
  CONFIRMADA: 'Confirmada',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
  NAO_COMPARECEU: 'Não compareceu',
};

// Cor do texto e do fundo da etiqueta de cada status
export const CORES_STATUS_CONSULTA: Record<StatusConsulta, { cor: string; fundo: string }> = {
  PENDENTE: { cor: colors.primaria, fundo: colors.primariaClara },
  CONFIRMADA: { cor: colors.verde, fundo: colors.verdeClaro },
  EM_ANDAMENTO: { cor: colors.verde, fundo: colors.verdeClaro },
  CONCLUIDA: { cor: colors.texto, fundo: colors.cinzaClaro },
  CANCELADA: { cor: colors.erro, fundo: colors.vermelhoClaro },
  NAO_COMPARECEU: { cor: colors.erro, fundo: colors.vermelhoClaro },
};

// 1 = segunda ... 7 = domingo
export const NOME_DIA_SEMANA: Record<number, string> = {
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
  7: 'Domingo',
};
