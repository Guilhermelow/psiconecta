import { createContext, useContext, useState, ReactNode } from 'react';

export type Usuario = {
  nome?: string;
  email: string;
  tipo: 'paciente' | 'estudante';
  cpf?: string;
  nascimento?: string;
  aceitaLembretes?: boolean; // lembretes por e-mail
  periodo?: string;      // estudante
  instituicao?: string;  // estudante
    // Perfil profissional (estudante) — é o que os pacientes veem
  sobre?: string;
  abordagem?: string;
  focos?: string[];
};

type AuthContextType = {
  usuario: Usuario | null;
  entrar: (usuario: Usuario) => void;
  sair: () => void;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  function entrar(novoUsuario: Usuario) {
    setUsuario(novoUsuario);
  }

  function sair() {
    setUsuario(null);
  }

  // Muda só os campos informados (ex.: só o nome)
  function atualizarUsuario(dados: Partial<Usuario>) {
    setUsuario((atual) => (atual ? { ...atual, ...dados } : atual));
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair, atualizarUsuario }}>
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