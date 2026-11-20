// /api/auth (AuthController)
import { api, definirToken, requisicao } from '@/services/api';
import * as exemplo from '@/mocks/api/servidor';
import type { LoginRequestDTO, LoginResponseDTO, UsuarioResponseDTO } from '@/types/api';

// POST /api/auth/login → guarda o token para as próximas chamadas
export async function login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
  const resposta = await requisicao(
    () => api.post<LoginResponseDTO>('/auth/login', dto),
    () => exemplo.login(dto)
  );
  definirToken(resposta.token);
  return resposta;
}

// GET /api/auth/me
export function buscarUsuarioLogado() {
  return requisicao(
    () => api.get<UsuarioResponseDTO>('/auth/me'),
    () => exemplo.me()
  );
}

// O backend não tem logout (JWT sem estado): basta esquecer o token
export function logout() {
  definirToken(null);
}
