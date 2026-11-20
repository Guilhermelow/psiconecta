import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import * as servicoEstudante from '@/services/estudante';
import { mensagemDeErro } from '@/services/api';
import type {
  CadastroDisponibilidadeDTO,
  ConsultaResponseDTO,
  DisponibilidadeResponseDTO,
} from '@/types/api';
import { ordenarPorInicio } from '@/utils/consultas';
import { ordenarFaixas } from '@/utils/atendimentos';

// Consultas e disponibilidades do estudante logado.
// O estudante não aceita, recusa nem cancela: o paciente agenda direto (já CONFIRMADA)
// e o estudante registra o andamento (iniciar, concluir, não compareceu).
type AtendimentosContextType = {
  consultas: ConsultaResponseDTO[];
  disponibilidades: DisponibilidadeResponseDTO[];
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
  iniciar: (id: number) => Promise<ConsultaResponseDTO>;
  concluir: (id: number) => Promise<ConsultaResponseDTO>;
  marcarNaoCompareceu: (id: number) => Promise<ConsultaResponseDTO>;
  cadastrarFaixa: (dto: CadastroDisponibilidadeDTO) => Promise<DisponibilidadeResponseDTO>;
  desativarFaixa: (id: number) => Promise<DisponibilidadeResponseDTO>;
};

const AtendimentosContext = createContext<AtendimentosContextType | null>(null);

export function AtendimentosProvider({ children }: { children: ReactNode }) {
  const [consultas, setConsultas] = useState<ConsultaResponseDTO[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<DisponibilidadeResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // GET /api/estudante/consultas e GET /api/estudante/disponibilidades
  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const [listaConsultas, listaFaixas] = await Promise.all([
        servicoEstudante.listarMinhasConsultas(),
        servicoEstudante.listarMinhasDisponibilidades(),
      ]);
      setConsultas(ordenarPorInicio(listaConsultas));
      setDisponibilidades(ordenarFaixas(listaFaixas));
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  // Troca a consulta pela versão devolvida pela API
  function guardarConsulta(consulta: ConsultaResponseDTO) {
    setConsultas((anteriores) =>
      ordenarPorInicio([...anteriores.filter((item) => item.id !== consulta.id), consulta])
    );
    return consulta;
  }

  function guardarFaixa(faixa: DisponibilidadeResponseDTO) {
    setDisponibilidades((anteriores) =>
      ordenarFaixas([...anteriores.filter((item) => item.id !== faixa.id), faixa])
    );
    return faixa;
  }

  return (
    <AtendimentosContext.Provider
      value={{
        consultas,
        disponibilidades,
        carregando,
        erro,
        recarregar,
        // PUT /api/estudante/consultas/{id}/iniciar
        iniciar: async (id) => guardarConsulta(await servicoEstudante.iniciarConsulta(id)),
        // PUT /api/estudante/consultas/{id}/concluir
        concluir: async (id) => guardarConsulta(await servicoEstudante.concluirConsulta(id)),
        // PUT /api/estudante/consultas/{id}/nao-compareceu
        marcarNaoCompareceu: async (id) =>
          guardarConsulta(await servicoEstudante.marcarNaoCompareceu(id)),
        // POST /api/estudante/disponibilidades (uma faixa por vez)
        cadastrarFaixa: async (dto) => guardarFaixa(await servicoEstudante.cadastrarDisponibilidade(dto)),
        // PUT /api/estudante/disponibilidades/{id}/desativar (não há editar nem reativar)
        desativarFaixa: async (id) => guardarFaixa(await servicoEstudante.desativarDisponibilidade(id)),
      }}
    >
      {children}
    </AtendimentosContext.Provider>
  );
}

export function useAtendimentos() {
  const contexto = useContext(AtendimentosContext);
  if (!contexto) {
    throw new Error('useAtendimentos precisa estar dentro do AtendimentosProvider');
  }
  return contexto;
}
