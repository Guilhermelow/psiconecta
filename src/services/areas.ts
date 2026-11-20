// Áreas de atendimento (usadas no cadastro e no perfil do estudante e nos filtros do paciente)
import { api, requisicao } from '@/services/api';
import * as exemplo from '@/mocks/api/servidor';
import type { AreaAtendimentoResponseDTO } from '@/types/api';

// ⚠️ DEPENDE DE MUDANÇA NO BACKEND: rota pública GET /api/areas-atendimento (sem login).
// Hoje o backend só tem GET /api/paciente/areas-atendimento, que exige perfil PACIENTE.
// Enquanto a rota pública não existir, esta chamada falha com a API real
// (o Spring Security responde 401 para quem não está logado).
// Nos dados de exemplo ela já funciona sem login.
export function listarAreasAtendimento() {
  return requisicao(
    () => api.get<AreaAtendimentoResponseDTO[]>('/areas-atendimento'),
    () => exemplo.listarAreasAtivas()
  );
}
