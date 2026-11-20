import type { ConsultaResponseDTO, StatusConsulta } from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';

export const DURACAO_MINUTOS = DURACAO_CONSULTA_MINUTOS;
const MINUTO = 60 * 1000;

// ===== Consultas da API (ConsultaResponseDTO) =====

// Em qual aba do paciente a consulta aparece
export type SituacaoConsulta = 'proxima' | 'anterior' | 'cancelada';

const STATUS_ATIVOS: StatusConsulta[] = ['PENDENTE', 'CONFIRMADA', 'EM_ANDAMENTO'];

export const inicioDaConsulta = (consulta: ConsultaResponseDTO) => new Date(consulta.dataHoraInicio);
export const fimDaConsulta = (consulta: ConsultaResponseDTO) => new Date(consulta.dataHoraFim);

// Próxima: ativa e ainda não terminou (ou em andamento).
// Anterior: concluída, não compareceu, ou confirmada que já passou sem o estudante registrar.
export function situacaoDaConsulta(consulta: ConsultaResponseDTO, agora = new Date()): SituacaoConsulta {
  if (consulta.status === 'CANCELADA') return 'cancelada';
  if (consulta.status === 'EM_ANDAMENTO') return 'proxima';
  const ativa = STATUS_ATIVOS.includes(consulta.status);
  return ativa && fimDaConsulta(consulta).getTime() >= agora.getTime() ? 'proxima' : 'anterior';
}

// Mesma regra do ConsultaService.cancelarComoPaciente: PENDENTE ou CONFIRMADA e antes do início
export function podeCancelarConsulta(consulta: ConsultaResponseDTO, agora = new Date()) {
  const statusPermite = consulta.status === 'PENDENTE' || consulta.status === 'CONFIRMADA';
  return statusPermite && inicioDaConsulta(consulta).getTime() > agora.getTime();
}

// Sala online: precisa do linkReuniao (o backend ainda não preenche) e abre 15 min antes
export function salaDisponivel(consulta: ConsultaResponseDTO, agora = new Date()) {
  if (consulta.modalidade !== 'ONLINE' || !consulta.linkReuniao) return false;
  const abre = inicioDaConsulta(consulta).getTime() - 15 * MINUTO;
  return agora.getTime() >= abre && agora.getTime() <= fimDaConsulta(consulta).getTime();
}

export function ordenarPorInicio(lista: ConsultaResponseDTO[], decrescente = false) {
  const fator = decrescente ? -1 : 1;
  return [...lista].sort(
    (a, b) => fator * (inicioDaConsulta(a).getTime() - inicioDaConsulta(b).getTime())
  );
}

// Date → "14:00" (no fuso do aparelho)
export function horaDe(data: Date) {
  return `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
}
