import type { AgendaSemanal } from '@/utils/datas';

// Uma faixa em horas cheias. Ex.: { inicio: 8, fim: 12 } = 08:00 às 12:00
export type Faixa = {
  inicio: number;
  fim: number;
};

export type DiaDisponivel = {
  ativo: boolean;
  faixas: Faixa[];
};

// Chave = dia da semana (1 = segunda ... 6 = sábado)
export type Disponibilidade = Record<number, DiaDisponivel>;

export const HORA_MINIMA = 7;
export const HORA_MAXIMA = 22;

// Grade com todos os dias desligados
export function disponibilidadeVazia(): Disponibilidade {
  const grade: Disponibilidade = {};
  for (let dia = 1; dia <= 6; dia++) {
    grade[dia] = { ativo: false, faixas: [] };
  }
  return grade;
}

// 8 → "08:00"
export function formatarHora(hora: number) {
  return `${String(hora).padStart(2, '0')}:00`;
}

// { 8, 12 } → "08:00 – 12:00"
export function formatarFaixa(faixa: Faixa) {
  return `${formatarHora(faixa.inicio)} – ${formatarHora(faixa.fim)}`;
}

export function periodoDaFaixa(faixa: Faixa) {
  if (faixa.inicio < 12) return 'Manhã';
  if (faixa.inicio < 18) return 'Tarde';
  return 'Noite';
}

// As duas faixas têm algum pedaço em comum?
export function sobrepoe(a: Faixa, b: Faixa) {
  return a.inicio < b.fim && b.inicio < a.fim;
}

// Uma faixa vira horários de hora em hora (50 min de sessão + 10 de intervalo)
// { 8, 12 } → ["08:00", "09:00", "10:00", "11:00"]
export function horariosDaFaixa(faixa: Faixa) {
  const horarios: string[] = [];
  for (let hora = faixa.inicio; hora + 1 <= faixa.fim; hora++) {
    horarios.push(formatarHora(hora));
  }
  return horarios;
}

export function horariosDoDia(dia: DiaDisponivel) {
  if (!dia.ativo) return [];
  return dia.faixas.flatMap(horariosDaFaixa).sort();
}

// Converte para o formato que o calendário do paciente usa
export function paraAgendaSemanal(grade: Disponibilidade): AgendaSemanal {
  const agenda: AgendaSemanal = {};
  for (const [dia, valor] of Object.entries(grade)) {
    const horarios = horariosDoDia(valor);
    if (horarios.length > 0) agenda[Number(dia)] = horarios;
  }
  return agenda;
}