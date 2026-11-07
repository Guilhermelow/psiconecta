import type { Notificacao } from '@/utils/notificacoes';

const DIA = 24 * 60 * 60 * 1000;

// Dicas de exemplo (depois virão do servidor)
export function criarDicas(agora: Date): Notificacao[] {
  return [
    {
      id: 'dica-acolhimento',
      tipo: 'dica',
      titulo: 'Dica de acolhimento',
      texto: 'Antes da sessão, reserve um lugar calmo e use fones de ouvido.',
      quando: new Date(agora.getTime() - 2 * DIA),
    },
    {
      id: 'boas-vindas',
      tipo: 'dica',
      titulo: 'Boas-vindas ao Psiconecta',
      texto: 'Aqui você encontra estudantes de Psicologia supervisionados, prontos para te acolher.',
      quando: new Date(agora.getTime() - 9 * DIA),
    },
  ];
}

// Dicas de exemplo para o estudante
export function criarDicasEstudante(agora: Date): Notificacao[] {
  return [
    {
      id: 'dica-supervisao',
      tipo: 'dica',
      titulo: 'Lembrete de supervisão',
      texto: 'Registre as sessões da semana para discutir os casos na supervisão.',
      quando: new Date(agora.getTime() - DIA),
    },
    {
      id: 'boas-vindas-estudante',
      tipo: 'dica',
      titulo: 'Boas-vindas ao Psiconecta',
      texto: 'Mantenha sua disponibilidade atualizada para receber novas solicitações.',
      quando: new Date(agora.getTime() - 9 * DIA),
    },
  ];
}