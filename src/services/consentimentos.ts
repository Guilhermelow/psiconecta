// /api/consentimentos (ConsentimentoController) — qualquer usuário logado
import { api, requisicao } from '@/services/api';
import * as exemplo from '@/mocks/api/servidor';
import type { ConsentimentoResponseDTO, RegistroConsentimentoDTO } from '@/types/api';

// Versão atual dos textos de termos e privacidade exibidos no app
export const VERSAO_TERMOS = '1.0';

export function registrarConsentimento(dto: RegistroConsentimentoDTO) {
  return requisicao(
    () => api.post<ConsentimentoResponseDTO>('/consentimentos', dto),
    () => exemplo.registrarConsentimento(dto)
  );
}

export function listarMeusConsentimentos() {
  return requisicao(
    () => api.get<ConsentimentoResponseDTO[]>('/consentimentos'),
    () => exemplo.listarConsentimentos()
  );
}
