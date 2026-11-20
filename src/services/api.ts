import { create, isAxiosError } from 'axios';
import { API_URL, USAR_DADOS_EXEMPLO } from '@/services/config';
import type { ErroRegraNegocioDTO, ErroValidacaoDTO } from '@/types/api';

export const MENSAGEM_SEM_CONEXAO =
  'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.';
export const MENSAGEM_SESSAO_EXPIRADA = 'Sua sessão expirou. Entre novamente.';
export const MENSAGEM_SEM_PERMISSAO = 'Você não tem permissão para esta ação.';
const MENSAGEM_INESPERADA = 'Ocorreu um erro inesperado. Tente novamente.';

// Erro único que as telas recebem, venha da API ou dos dados de exemplo
export class ErroApi extends Error {
  status?: number;
  campos?: Record<string, string>; // erros de validação por campo

  constructor(mensagem: string, status?: number, campos?: Record<string, string>) {
    super(mensagem);
    this.name = 'ErroApi';
    this.status = status;
    this.campos = campos;
  }
}

// ===== Token (por enquanto só em memória: some ao fechar o app) =====
let token: string | null = null;

export function definirToken(novo: string | null) {
  token = novo;
}

export function obterToken() {
  return token;
}

// ===== Cliente HTTP =====
export const api = create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Traduz as respostas de erro do GlobalExceptionHandler e do Spring Security
function converterErro(erro: unknown): ErroApi {
  if (erro instanceof ErroApi) return erro;
  if (!isAxiosError(erro)) return new ErroApi(MENSAGEM_INESPERADA);
  if (!erro.response) return new ErroApi(MENSAGEM_SEM_CONEXAO);

  const { status, data } = erro.response;
  const corpo = data as
    | Partial<Pick<ErroValidacaoDTO, 'campos'> & Pick<ErroRegraNegocioDTO, 'mensagem'>>
    | undefined;

  if (status === 401) return new ErroApi(MENSAGEM_SESSAO_EXPIRADA, 401);
  if (status === 403) return new ErroApi(MENSAGEM_SEM_PERMISSAO, 403);
  if (corpo?.campos) {
    const primeira = Object.values(corpo.campos)[0] ?? MENSAGEM_INESPERADA;
    return new ErroApi(primeira, status, corpo.campos);
  }
  if (corpo?.mensagem) return new ErroApi(corpo.mensagem, status);
  return new ErroApi(MENSAGEM_INESPERADA, status);
}

// Quem cuida da sessão (AuthContext) se registra aqui para saber quando o token expirou
let aoExpirarSessao: (() => void) | null = null;

export function definirAoExpirarSessao(funcao: (() => void) | null) {
  aoExpirarSessao = funcao;
}

// Escolhe entre a API real e os dados de exemplo, conforme o .env
export async function requisicao<T>(
  real: () => Promise<{ data: T }>,
  exemplo: () => Promise<T>
): Promise<T> {
  try {
    if (USAR_DADOS_EXEMPLO) return await exemplo();
    const { data } = await real();
    return data;
  } catch (erro) {
    const convertido = converterErro(erro);
    // 401 com token = token inválido ou expirado
    if (convertido.status === 401 && token) aoExpirarSessao?.();
    throw convertido;
  }
}

// Para as telas: pega a mensagem de qualquer erro
export function mensagemDeErro(erro: unknown) {
  return erro instanceof ErroApi ? erro.message : MENSAGEM_INESPERADA;
}
