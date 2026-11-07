import type { Consulta } from '@/contexts/ConsultasContext';
import { dataEHora } from '@/utils/datas';

export const DURACAO_MINUTOS = 50;
const MINUTO = 60 * 1000;

export type SituacaoConsulta = 'proxima' | 'concluida' | 'cancelada';

// Em qual aba a consulta fica
export function situacaoDaConsulta(consulta: Consulta, agora = new Date()): SituacaoConsulta {
  if (consulta.status === 'cancelada') return 'cancelada';

  const fim = dataEHora(consulta.data, consulta.hora).getTime() + DURACAO_MINUTOS * MINUTO;
  return fim < agora.getTime() ? 'concluida' : 'proxima';
}

// A sala abre 15 minutos antes e fecha no fim da consulta
export function salaAberta(consulta: { data: string; hora: string }, agora = new Date()) {
  const inicio = dataEHora(consulta.data, consulta.hora).getTime();
  const abre = inicio - 15 * MINUTO;
  const fecha = inicio + DURACAO_MINUTOS * MINUTO;
  return agora.getTime() >= abre && agora.getTime() <= fecha;
}

// Só pode cancelar até 4 horas antes
export function podeCancelar(consulta: { data: string; hora: string }, agora = new Date()) {
  const inicio = dataEHora(consulta.data, consulta.hora).getTime();
  return inicio - agora.getTime() >= 4 * 60 * MINUTO;
}