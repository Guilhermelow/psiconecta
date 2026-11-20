// /api/estudante/** — exige perfil ESTUDANTE
import { api, requisicao } from '@/services/api';
import * as exemplo from '@/mocks/api/servidor';
import type {
  AtualizacaoEstudanteDTO,
  CadastroDisponibilidadeDTO,
  ConsultaResponseDTO,
  DisponibilidadeResponseDTO,
  EstudanteResponseDTO,
} from '@/types/api';

// GET /api/estudante/perfil (inclui statusAprovacao)
export function buscarPerfil() {
  return requisicao(
    () => api.get<EstudanteResponseDTO>('/estudante/perfil'),
    () => exemplo.buscarPerfilEstudante()
  );
}

// PUT /api/estudante/perfil (envia todos os campos)
export function atualizarPerfil(dto: AtualizacaoEstudanteDTO) {
  return requisicao(
    () => api.put<EstudanteResponseDTO>('/estudante/perfil', dto),
    () => exemplo.atualizarPerfilEstudante(dto)
  );
}

// GET /api/estudante/consultas
export function listarMinhasConsultas() {
  return requisicao(
    () => api.get<ConsultaResponseDTO[]>('/estudante/consultas'),
    () => exemplo.listarConsultasDoEstudante()
  );
}

// PUT /api/estudante/consultas/{id}/iniciar (CONFIRMADA → EM_ANDAMENTO)
export function iniciarConsulta(id: number) {
  return requisicao(
    () => api.put<ConsultaResponseDTO>(`/estudante/consultas/${id}/iniciar`),
    () => exemplo.iniciarConsulta(id)
  );
}

// PUT /api/estudante/consultas/{id}/concluir (EM_ANDAMENTO → CONCLUIDA)
export function concluirConsulta(id: number) {
  return requisicao(
    () => api.put<ConsultaResponseDTO>(`/estudante/consultas/${id}/concluir`),
    () => exemplo.concluirConsulta(id)
  );
}

// PUT /api/estudante/consultas/{id}/nao-compareceu (CONFIRMADA → NAO_COMPARECEU)
export function marcarNaoCompareceu(id: number) {
  return requisicao(
    () => api.put<ConsultaResponseDTO>(`/estudante/consultas/${id}/nao-compareceu`),
    () => exemplo.marcarNaoCompareceu(id)
  );
}

// GET /api/estudante/disponibilidades (ativas e desativadas)
export function listarMinhasDisponibilidades() {
  return requisicao(
    () => api.get<DisponibilidadeResponseDTO[]>('/estudante/disponibilidades'),
    () => exemplo.listarMinhasDisponibilidades()
  );
}

// POST /api/estudante/disponibilidades (uma faixa por vez)
export function cadastrarDisponibilidade(dto: CadastroDisponibilidadeDTO) {
  return requisicao(
    () => api.post<DisponibilidadeResponseDTO>('/estudante/disponibilidades', dto),
    () => exemplo.cadastrarDisponibilidade(dto)
  );
}

// PUT /api/estudante/disponibilidades/{id}/desativar (não há editar nem excluir)
export function desativarDisponibilidade(id: number) {
  return requisicao(
    () => api.put<DisponibilidadeResponseDTO>(`/estudante/disponibilidades/${id}/desativar`),
    () => exemplo.desativarDisponibilidade(id)
  );
}
