import type { Atendimento, Solicitacao } from '@/contexts/AtendimentosContext';
import { daquiA } from '@/utils/datas';
import type { Disponibilidade } from '@/utils/disponibilidade';

const HORA = 60;
const DIA = 24 * HORA;

// Provisório: depois virá do servidor
export const SUPERVISOR_EXEMPLO = 'Profª Dra. Helena Vasconcelos';

// SÓ PARA TESTE: atendimentos a partir de agora
export function criarAtendimentosExemplo(): Atendimento[] {
  return [
    {
      id: 'at-1',
      pacienteNome: 'Camila Souza',
      sessao: 4,
      ...daquiA(45),
      queixa: 'Acompanhamento para ansiedade na rotina de estudos e conciliação com o estágio.',
      contatoEmergencia: {
        nome: 'Mariana Souza',
        relacao: 'Mãe',
        telefone: '(81) 90000-0001', // número fictício
      },
    },
    {
      id: 'at-2',
      pacienteNome: 'Rafael Lima',
      sessao: 2,
      ...daquiA(2.5 * HORA),
      queixa: 'Estresse no trabalho e dificuldade de concentração.',
    },
    {
      id: 'at-3',
      pacienteNome: 'Mariana Alves',
      sessao: 6,
      ...daquiA(4 * HORA),
      queixa: 'Luto recente na família.',
    },
    {
      id: 'at-4',
      pacienteNome: 'Beatriz Ramos',
      sessao: 1,
      ...daquiA(DIA + 30),
      queixa: 'Primeira consulta para autoconhecimento.',
    },
  ];
}

// SÓ PARA TESTE: pedidos de pacientes
export function criarSolicitacoesExemplo(): Solicitacao[] {
    return [
        {
            id: 'sol-1',
            pacienteNome: 'João Pereira',
            queixa: 'Ansiedade em períodos de provas',
            ...daquiA(2 * DIA),
            recebidaEm: new Date(Date.now() - 3 * HORA * 60 * 1000).toISOString(),
        },
        {
            id: 'sol-2',
            pacienteNome: 'Larissa Gomes',
            queixa: 'Dificuldade para dormir',
            ...daquiA(3 * DIA + HORA),
            recebidaEm: new Date(Date.now() - 26 * HORA * 60 * 1000).toISOString(),
        },
        {
            id: 'sol-3',
            pacienteNome: 'Pedro Henrique',
            queixa: 'Conflitos familiares recentes',
            // Mesmo horário do atendimento com o Rafael → mostra o aviso de conflito
            ...daquiA(2.5 * HORA),
            recebidaEm: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        },
    ];
}

// SÓ PARA TESTE: grade semanal do estudante
export function criarDisponibilidadeExemplo(): Disponibilidade {
  return {
    1: { ativo: true, faixas: [{ inicio: 8, fim: 12 }, { inicio: 14, fim: 17 }] },
    2: { ativo: true, faixas: [{ inicio: 14, fim: 18 }] },
    3: { ativo: true, faixas: [{ inicio: 8, fim: 12 }] },
    4: { ativo: true, faixas: [{ inicio: 9, fim: 12 }, { inicio: 15, fim: 18 }] },
    5: { ativo: true, faixas: [{ inicio: 13, fim: 17 }] },
    6: { ativo: false, faixas: [] },
  };
}