import type { Href } from 'expo-router';
import type { Consulta } from '@/contexts/ConsultasContext';
import type { Atendimento, Solicitacao } from '@/contexts/AtendimentosContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { criarDicas, criarDicasEstudante } from '@/mocks/notificacoes';
import { situacaoDaConsulta, salaAberta, DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, dataCurta, ehHoje } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';

export type TipoNotificacao =
  | 'hoje'
  | 'sala'
  | 'confirmada'
  | 'cancelada'
  | 'solicitacao'
  | 'dica';

export type Notificacao = {
  id: string;
  tipo: TipoNotificacao;
  titulo: string;
  texto: string;
  quando: Date;
  rota?: Href; // se tiver, tocar abre essa tela
};

const MINUTO = 60 * 1000;

// Lembrete do dia: às 7h (ou quando foi marcado, se depois), nunca no futuro
function momentoDoLembrete(agora: Date, criadoEm?: Date) {
  const seteDaManha = new Date(agora);
  seteDaManha.setHours(7, 0, 0, 0);
  const base = criadoEm
    ? Math.max(criadoEm.getTime(), seteDaManha.getTime())
    : seteDaManha.getTime();
  return new Date(Math.min(agora.getTime(), base));
}

// Tira as do futuro e coloca as mais recentes primeiro
function finalizar(lista: Notificacao[], agora: Date) {
  return lista
    .filter((notificacao) => notificacao.quando.getTime() <= agora.getTime())
    .sort((a, b) => b.quando.getTime() - a.quando.getTime());
}

// ===== PACIENTE: a partir das consultas =====
export function gerarNotificacoes(consultas: Consulta[], agora = new Date()): Notificacao[] {
  const lista: Notificacao[] = [];

  for (const consulta of consultas) {
    const estudante = ESTUDANTES.find((item) => item.id === consulta.estudanteId);
    const nome = estudante ? primeiroNome(estudante.nome) : 'o estudante';
    const inicio = dataEHora(consulta.data, consulta.hora);
    const criadaEm = new Date(consulta.criadaEm);
    const quando = `${dataCurta(inicio)} às ${consulta.hora}`;
    const rota: Href = `/paciente/consulta/${consulta.id}`;

    lista.push({
      id: `confirmada-${consulta.id}`,
      tipo: 'confirmada',
      titulo: 'Agendamento confirmado',
      texto: `Sua consulta com ${nome} ficou marcada para ${quando}.`,
      quando: criadaEm,
      rota,
    });

    if (consulta.status === 'cancelada' && consulta.canceladaEm) {
      lista.push({
        id: `cancelada-${consulta.id}`,
        tipo: 'cancelada',
        titulo: 'Consulta cancelada',
        texto: `A consulta de ${quando} com ${nome} foi cancelada.`,
        quando: new Date(consulta.canceladaEm),
        rota,
      });
    }

    if (situacaoDaConsulta(consulta, agora) !== 'proxima') continue;

    if (ehHoje(inicio)) {
      lista.push({
        id: `hoje-${consulta.id}`,
        tipo: 'hoje',
        titulo: `Sua consulta é hoje às ${consulta.hora}`,
        texto: `A sessão com ${nome} acontece hoje. A sala abre 15 minutos antes.`,
        quando: momentoDoLembrete(agora, criadaEm),
        rota,
      });
    }

    if (salaAberta(consulta, agora)) {
      lista.push({
        id: `sala-${consulta.id}`,
        tipo: 'sala',
        titulo: 'Sala virtual disponível',
        texto: `Sua sala com ${nome} já está aberta. Entre quando estiver pronto(a).`,
        quando: new Date(Math.max(inicio.getTime() - 15 * MINUTO, criadaEm.getTime())),
        rota,
      });
    }
  }

  lista.push(...criarDicas(agora));
  return finalizar(lista, agora);
}

// ===== ESTUDANTE: a partir dos atendimentos e solicitações =====
export function gerarNotificacoesEstudante(
  atendimentos: Atendimento[],
  solicitacoes: Solicitacao[],
  agora = new Date()
): Notificacao[] {
  const lista: Notificacao[] = [];

  for (const solicitacao of solicitacoes) {
    const inicio = dataEHora(solicitacao.data, solicitacao.hora);
    lista.push({
      id: `solicitacao-${solicitacao.id}`,
      tipo: 'solicitacao',
      titulo: 'Nova solicitação de atendimento',
      texto: `${solicitacao.pacienteNome} pediu uma primeira consulta para ${dataCurta(inicio)} às ${solicitacao.hora}.`,
      quando: new Date(solicitacao.recebidaEm),
      rota: '/estudante/solicitacoes',
    });
  }

  for (const atendimento of atendimentos) {
    const inicio = dataEHora(atendimento.data, atendimento.hora);
    const terminou = inicio.getTime() + DURACAO_MINUTOS * MINUTO < agora.getTime();
    if (terminou) continue;

    const nome = primeiroNome(atendimento.pacienteNome);
    const rota: Href = `/estudante/atendimento/${atendimento.id}`;

    if (ehHoje(inicio)) {
      lista.push({
        id: `hoje-${atendimento.id}`,
        tipo: 'hoje',
        titulo: `Você atende hoje às ${atendimento.hora}`,
        texto: `Sessão com ${nome}. A sala abre 15 minutos antes.`,
        quando: momentoDoLembrete(agora),
        rota,
      });
    }

    if (salaAberta(atendimento, agora)) {
      lista.push({
        id: `sala-${atendimento.id}`,
        tipo: 'sala',
        titulo: 'Sala virtual disponível',
        texto: `Sua sala com ${nome} já está aberta.`,
        quando: new Date(inicio.getTime() - 15 * MINUTO),
        rota,
      });
    }
  }

  lista.push(...criarDicasEstudante(agora));
  return finalizar(lista, agora);
}