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