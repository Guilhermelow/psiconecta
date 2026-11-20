// Regras do lado do estudante, iguais às do ConsultaService do backend
import type { ConsultaResponseDTO, DisponibilidadeResponseDTO, StatusConsulta } from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { fimDaConsulta, inicioDaConsulta } from '@/utils/consultas';
import { horaEmMinutos } from '@/utils/conversoes';
import { chaveData } from '@/utils/datas';

const INTERVALO_MINUTOS = 60; // 50 min de sessão + 10 min de intervalo (igual a utils/horarios)
const STATUS_ATIVOS: StatusConsulta[] = ['PENDENTE', 'CONFIRMADA', 'EM_ANDAMENTO'];

const jaComecou = (consulta: ConsultaResponseDTO, agora: Date) =>
  inicioDaConsulta(consulta).getTime() <= agora.getTime();

// PUT /iniciar: só CONFIRMADA e a partir do horário de início
export function podeIniciar(consulta: ConsultaResponseDTO, agora = new Date()) {
  return consulta.status === 'CONFIRMADA' && jaComecou(consulta, agora);
}

// PUT /concluir: só EM_ANDAMENTO
export function podeConcluir(consulta: ConsultaResponseDTO) {
  return consulta.status === 'EM_ANDAMENTO';
}

// PUT /nao-compareceu: só CONFIRMADA e a partir do horário de início
export function podeMarcarFalta(consulta: ConsultaResponseDTO, agora = new Date()) {
  return consulta.status === 'CONFIRMADA' && jaComecou(consulta, agora);
}

// O horário já terminou, mas o estudante ainda não registrou o que aconteceu
export function precisaRegistro(consulta: ConsultaResponseDTO, agora = new Date()) {
  const aberta = consulta.status === 'CONFIRMADA' || consulta.status === 'EM_ANDAMENTO';
  return aberta && fimDaConsulta(consulta).getTime() < agora.getTime();
}

// Ainda vai acontecer ou está acontecendo agora
export function estaPorVir(consulta: ConsultaResponseDTO, agora = new Date()) {
  return STATUS_ATIVOS.includes(consulta.status) && !precisaRegistro(consulta, agora);
}

// Conta para a agenda (canceladas aparecem na lista, mas não somam)
export const contaNaAgenda = (consulta: ConsultaResponseDTO) => consulta.status !== 'CANCELADA';

// Consultas de um dia (no fuso do aparelho)
export function consultasDoDia(consultas: ConsultaResponseDTO[], chave: string) {
  return consultas.filter((consulta) => chaveData(inicioDaConsulta(consulta)) === chave);
}

// ===== Disponibilidades =====

// Quantos horários de 50 min a faixa gera (mesma conta do calendário do paciente)
export function horariosDaFaixa(faixa: Pick<DisponibilidadeResponseDTO, 'horaInicio' | 'horaFim'>) {
  const duracao = horaEmMinutos(faixa.horaFim) - horaEmMinutos(faixa.horaInicio);
  if (duracao < DURACAO_CONSULTA_MINUTOS) return 0;
  return Math.floor((duracao - DURACAO_CONSULTA_MINUTOS) / INTERVALO_MINUTOS) + 1;
}

export function horariosPorSemana(disponibilidades: DisponibilidadeResponseDTO[]) {
  return disponibilidades
    .filter((faixa) => faixa.ativo)
    .reduce((total, faixa) => total + horariosDaFaixa(faixa), 0);
}

// O backend não impede faixas sobrepostas; o app impede para não confundir o paciente
export function faixaSobreposta(
  disponibilidades: DisponibilidadeResponseDTO[],
  nova: { diaSemana: number; horaInicio: string; horaFim: string }
) {
  const inicio = horaEmMinutos(nova.horaInicio);
  const fim = horaEmMinutos(nova.horaFim);
  return (
    disponibilidades.find(
      (faixa) =>
        faixa.ativo &&
        faixa.diaSemana === nova.diaSemana &&
        horaEmMinutos(faixa.horaInicio) < fim &&
        inicio < horaEmMinutos(faixa.horaFim)
    ) ?? null
  );
}

// Ordena por dia da semana e depois pelo início
export function ordenarFaixas(disponibilidades: DisponibilidadeResponseDTO[]) {
  return [...disponibilidades].sort(
    (a, b) => a.diaSemana - b.diaSemana || horaEmMinutos(a.horaInicio) - horaEmMinutos(b.horaInicio)
  );
}
