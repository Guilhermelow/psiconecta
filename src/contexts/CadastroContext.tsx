import { createContext, useContext, useState, ReactNode } from 'react';

// Tudo que o cadastro pode guardar
export type DadosCadastro = {
  tipo?: 'paciente' | 'estudante';
  nome?: string;
  cpf?: string;
  nascimento?: string;
  email?: string;
  senha?: string;
  instituicao?: string;
  curso?: string;
  periodo?: string;
  matricula?: string;
    documento?: {
    nome: string;
    uri: string;
    tamanho?: number;
    tipo?: string;
  };
  aceitaLembretes?: boolean;
};

type CadastroContextType = {
  dados: DadosCadastro;
  atualizarDados: (novos: Partial<DadosCadastro>) => void;
  limparDados: () => void;
};

const CadastroContext = createContext<CadastroContextType | null>(null);

// Envolve o app e guarda os dados
export function CadastroProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<DadosCadastro>({});

  // Junta os dados novos com os que já existiam
  function atualizarDados(novos: Partial<DadosCadastro>) {
    setDados((anteriores) => ({ ...anteriores, ...novos }));
  }

  function limparDados() {
    setDados({});
  }

  return (
    <CadastroContext.Provider value={{ dados, atualizarDados, limparDados }}>
      {children}
    </CadastroContext.Provider>
  );
}

// Atalho para usar a "mochila" em qualquer tela
export function useCadastro() {
  const contexto = useContext(CadastroContext);
  if (!contexto) {
    throw new Error('useCadastro precisa estar dentro do CadastroProvider');
  }
  return contexto;
}