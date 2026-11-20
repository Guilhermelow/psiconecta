import { createContext, useContext, useState, ReactNode } from 'react';

// Dados digitados ao longo das telas de cadastro, até o envio para a API.
// Ficam no formato da tela (com máscara); a conversão acontece no envio.
export type DadosCadastro = {
  tipo?: 'paciente' | 'estudante';
  // Usuário (CadastroUsuarioDTO)
  nome?: string;
  email?: string;
  senha?: string;
  // Paciente (CadastroPacienteDTO)
  cpf?: string;
  nascimento?: string; // DD/MM/AAAA
  telefone?: string;
  // Estudante (CadastroEstudanteDTO)
  universidade?: string;
  matricula?: string;
  periodo?: number;
  estagioSupervisionado?: boolean;
  // Comprovante: tela escondida (RECURSOS.comprovanteMatricula), backend sem upload
  documento?: {
    nome: string;
    uri: string;
    tamanho?: number;
    tipo?: string;
  };
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
