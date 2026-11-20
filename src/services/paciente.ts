// /api/paciente/** — exige perfil PACIENTE
import { api, requisicao } from '@/services/api';
import * as exemplo from '@/mocks/api/servidor';
import type {
  AgendamentoConsultaDTO,
  AtualizacaoPacienteDTO,
  ConsultaResponseDTO,
  DisponibilidadeResponseDTO,
  EstudanteResponseDTO,
  PacienteResponseDTO,
} from '@/types/api';

// Áreas de atendimento: usar listarAreasAtendimento de '@/services/areas' (rota pública)

// GET /api/paciente/estudantes?areaId= (só aprovados)
export function listarEstudantes(areaId?: number) {
  return requisicao(
    () => api.get<EstudanteResponseDTO[]>('/paciente/estudantes', { params: { areaId } }),
    () => exemplo.listarEstudantesAprovados(areaId)
  );
}

// GET /api/paciente/estudantes/{id}/disponibilidades (só ativas)
export function listarDisponibilidadesDoEstudante(estudanteId: number) {
  return requisicao(
    () => api.get<DisponibilidadeResponseDTO[]>(`/paciente/estudantes/${estudanteId}/disponibilidades`),
    () => exemplo.listarDisponibilidadesPublicas(estudanteId)
  );
}

// POST /api/paciente/consultas (já volta CONFIRMADA)
export function agendarConsulta(dto: AgendamentoConsultaDTO) {
  return requisicao(
    () => api.post<ConsultaResponseDTO>('/paciente/consultas', dto),
    () => exemplo.agendarConsulta(dto)
  );
}

// GET /api/paciente/consultas
export function listarMinhasConsultas() {
  return requisicao(
    () => api.get<ConsultaResponseDTO[]>('/paciente/consultas'),
    () => exemplo.listarConsultasDoPaciente()
  );
}

// PUT /api/paciente/consultas/{id}/cancelar (sem corpo: o backend não recebe motivo)
export function cancelarConsulta(id: number) {
  return requisicao(
    () => api.put<ConsultaResponseDTO>(`/paciente/consultas/${id}/cancelar`),
    () => exemplo.cancelarConsulta(id)
  );
}

// GET /api/paciente/perfil
export function buscarPerfil() {
  return requisicao(
    () => api.get<PacienteResponseDTO>('/paciente/perfil'),
    () => exemplo.buscarPerfilPaciente()
  );
}

// PUT /api/paciente/perfil (nome, dataNascimento, telefone)
export function atualizarPerfil(dto: AtualizacaoPacienteDTO) {
  return requisicao(
    () => api.put<PacienteResponseDTO>('/paciente/perfil', dto),
    () => exemplo.atualizarPerfilPaciente(dto)
  );
}
