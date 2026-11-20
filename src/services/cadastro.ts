// Rotas públicas de cadastro (PacienteController, EstudanteController)
import { api, requisicao } from '@/services/api';
import * as exemplo from '@/mocks/api/servidor';
import type {
  CadastroEstudanteDTO,
  CadastroPacienteDTO,
  EstudanteResponseDTO,
  PacienteResponseDTO,
} from '@/types/api';

// POST /api/pacientes (não devolve token: faça login em seguida)
export function cadastrarPaciente(dto: CadastroPacienteDTO) {
  return requisicao(
    () => api.post<PacienteResponseDTO>('/pacientes', dto),
    () => exemplo.cadastrarPaciente(dto)
  );
}

// POST /api/estudantes (nasce com statusAprovacao = PENDENTE)
export function cadastrarEstudante(dto: CadastroEstudanteDTO) {
  return requisicao(
    () => api.post<EstudanteResponseDTO>('/estudantes', dto),
    () => exemplo.cadastrarEstudante(dto)
  );
}
