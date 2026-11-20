import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { router, type Href } from 'expo-router';
import * as servicoAuth from '@/services/auth';
import * as servicoPaciente from '@/services/paciente';
import * as servicoEstudante from '@/services/estudante';
import {
  definirAoExpirarSessao,
  definirToken,
  ErroApi,
  MENSAGEM_SESSAO_EXPIRADA,
} from '@/services/api';
import { apagarSessao, carregarSessao, salvarSessao } from '@/services/sessao';
import type {
  EstudanteResponseDTO,
  LoginResponseDTO,
  PacienteResponseDTO,
  PerfilUsuario,
} from '@/types/api';

// Dados básicos de quem está logado (vêm do login ou do /auth/me)
export type UsuarioSessao = Pick<LoginResponseDTO, 'usuarioId' | 'nome' | 'email' | 'perfil'>;

type Perfis = {
  paciente: PacienteResponseDTO | null;
  estudante: EstudanteResponseDTO | null;
};

type AuthContextType = {
  usuario: UsuarioSessao | null;
  perfilPaciente: PacienteResponseDTO | null; // GET /api/paciente/perfil
  perfilEstudante: EstudanteResponseDTO | null; // GET /api/estudante/perfil
  carregando: boolean; // true enquanto restaura a sessão salva
  entrar: (email: string, senha: string, lembrar?: boolean) => Promise<Perfis & { usuario: UsuarioSessao }>;
  sair: () => Promise<void>;
  recarregarPerfil: () => Promise<Perfis>;
  atualizarPerfilPaciente: (perfil: PacienteResponseDTO) => void;
  atualizarPerfilEstudante: (perfil: EstudanteResponseDTO) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const MENSAGEM_ADMIN = 'O acesso de administrador é feito pelo painel web, não pelo aplicativo.';

// Para onde mandar o usuário depois de entrar
export function rotaInicial(usuario: UsuarioSessao, estudante: EstudanteResponseDTO | null): Href {
  if (usuario.perfil === 'PACIENTE') return '/paciente/inicio';
  if (estudante && estudante.statusAprovacao !== 'APROVADO') return '/cadastro/estudante/analise';
  return '/estudante/inicio';
}

async function buscarPerfis(perfil: PerfilUsuario): Promise<Perfis> {
  if (perfil === 'PACIENTE') return { paciente: await servicoPaciente.buscarPerfil(), estudante: null };
  if (perfil === 'ESTUDANTE') return { paciente: null, estudante: await servicoEstudante.buscarPerfil() };
  throw new ErroApi(MENSAGEM_ADMIN);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);
  const [perfilPaciente, setPerfilPaciente] = useState<PacienteResponseDTO | null>(null);
  const [perfilEstudante, setPerfilEstudante] = useState<EstudanteResponseDTO | null>(null);
  const [carregando, setCarregando] = useState(true);
  const lembrar = useRef(false); // a sessão está salva no aparelho?

  const aplicarPerfis = useCallback((perfis: Perfis) => {
    setPerfilPaciente(perfis.paciente);
    setPerfilEstudante(perfis.estudante);
  }, []);

  const limpar = useCallback(async () => {
    servicoAuth.logout();
    lembrar.current = false;
    setUsuario(null);
    aplicarPerfis({ paciente: null, estudante: null });
    await apagarSessao();
  }, [aplicarPerfis]);

  // Ao abrir o app: tenta restaurar a sessão salva
  useEffect(() => {
    async function restaurar() {
      const salva = await carregarSessao();
      if (!salva) return;

      definirToken(salva.token);
      lembrar.current = true;
      try {
        const eu = await servicoAuth.buscarUsuarioLogado(); // confirma que o token ainda vale
        aplicarPerfis(await buscarPerfis(eu.perfil));
        setUsuario({ usuarioId: eu.id, nome: eu.nome, email: eu.email, perfil: eu.perfil });
      } catch (erro) {
        const semConexao = erro instanceof ErroApi && erro.status === undefined;
        if (semConexao) {
          // Sem internet: entra com os dados salvos; as telas recarregam depois
          setUsuario({ usuarioId: salva.usuarioId, nome: salva.nome, email: salva.email, perfil: salva.perfil });
        } else {
          await limpar();
        }
      }
    }
    restaurar().finally(() => setCarregando(false));
  }, [aplicarPerfis, limpar]);

  // Token expirado no meio do uso: volta para o login
  useEffect(() => {
    if (carregando) return;
    definirAoExpirarSessao(() => {
      limpar();
      Alert.alert('Sessão encerrada', MENSAGEM_SESSAO_EXPIRADA);
      router.replace('/login');
    });
    return () => definirAoExpirarSessao(null);
  }, [carregando, limpar]);

  async function entrar(email: string, senha: string, manterConectado = true) {
    const resposta = await servicoAuth.login({ email: email.trim(), senha });
    let perfis: Perfis;
    try {
      perfis = await buscarPerfis(resposta.perfil);
    } catch (erro) {
      servicoAuth.logout();
      throw erro;
    }

    lembrar.current = manterConectado;
    if (manterConectado) await salvarSessao(resposta);
    else await apagarSessao();

    const novo: UsuarioSessao = {
      usuarioId: resposta.usuarioId,
      nome: resposta.nome,
      email: resposta.email,
      perfil: resposta.perfil,
    };
    aplicarPerfis(perfis);
    setUsuario(novo);
    return { usuario: novo, ...perfis };
  }

  async function recarregarPerfil() {
    if (!usuario) return { paciente: null, estudante: null };
    const perfis = await buscarPerfis(usuario.perfil);
    aplicarPerfis(perfis);
    return perfis;
  }

  // O nome mora no usuário: mantém sessão e aparelho atualizados
  async function atualizarNome(nome: string) {
    setUsuario((atual) => (atual ? { ...atual, nome } : atual));
    if (!lembrar.current) return;
    const salva = await carregarSessao();
    if (salva) await salvarSessao({ ...salva, nome });
  }

  function atualizarPerfilPaciente(perfil: PacienteResponseDTO) {
    setPerfilPaciente(perfil);
    atualizarNome(perfil.usuario.nome);
  }

  function atualizarPerfilEstudante(perfil: EstudanteResponseDTO) {
    setPerfilEstudante(perfil);
    atualizarNome(perfil.usuario.nome);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        perfilPaciente,
        perfilEstudante,
        carregando,
        entrar,
        sair: limpar,
        recarregarPerfil,
        atualizarPerfilPaciente,
        atualizarPerfilEstudante,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro do AuthProvider');
  }
  return contexto;
}
