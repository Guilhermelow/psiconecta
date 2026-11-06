import type { Consulta } from '@/contexts/ConsultasContext';
import { ESTUDANTES } from '@/mocks/estudantes';
import { criarDicas } from '@/mocks/notificacoes';
import { situacaoDaConsulta, salaAberta } from '@/utils/consultas';
import { dataEHora, dataCurta, ehHoje } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';

export type TipoNotificacao = 'hoje' | 'sala' | 'confirmada' | 'cancelada' | 'dica';

export type Notificacao = {
  id: string;
  tipo: TipoNotificacao;
  titulo: string;
  texto: string;
  quando: Date;
  consultaId?: string; // se tiver, tocar abre os detalhes da consulta
};

const MINUTO = 60 * 1000;

// Cria as notificações a partir das consultas (mais recentes primeiro)
export function gerarNotificacoes(consultas: Consulta[], agora = new Date()): Notificacao[] {
  const lista: Notificacao[] = [];

  for (const consulta of consultas) {
    const estudante = ESTUDANTES.find((item) => item.id === consulta.estudanteId);
    const nome = estudante ? primeiroNome(estudante.nome) : 'o estudante';
    const inicio = dataEHora(consulta.data, consulta.hora);
    const criadaEm = new Date(consulta.criadaEm);
    const quandoConsulta = `${dataCurta(inicio)} às ${consulta.hora}`;

    // 1. Quando foi marcada
    lista.push({
      id: `confirmada-${consulta.id}`,
      tipo: 'confirmada',
      titulo: 'Agendamento confirmado',
      texto: `Sua consulta com ${nome} ficou marcada para ${quandoConsulta}.`,
      quando: criadaEm,
      consultaId: consulta.id,
    });

    // 2. Quando foi cancelada
    if (consulta.status === 'cancelada' && consulta.canceladaEm) {
      lista.push({
        id: `cancelada-${consulta.id}`,
        tipo: 'cancelada',
        titulo: 'Consulta cancelada',
        texto: `A consulta de ${quandoConsulta} com ${nome} foi cancelada.`,
        quando: new Date(consulta.canceladaEm),
        consultaId: consulta.id,
      });
    }

    // As próximas só valem para consultas que ainda vão acontecer
    if (situacaoDaConsulta(consulta, agora) !== 'proxima') continue;

    // 3. Lembrete no dia (às 7h, ou na hora em que foi marcada, se for depois)
    if (ehHoje(inicio)) {
      const seteDaManha = new Date(agora);
      seteDaManha.setHours(7, 0, 0, 0);
      const lembrete = Math.min(
        agora.getTime(),
        Math.max(criadaEm.getTime(), seteDaManha.getTime())
      );

      lista.push({
        id: `hoje-${consulta.id}`,
        tipo: 'hoje',
        titulo: `Sua consulta é hoje às ${consulta.hora}`,
        texto: `A sessão com ${nome} acontece hoje. A sala abre 15 minutos antes.`,
        quando: new Date(lembrete),
        consultaId: consulta.id,
      });
    }

    // 4. Sala aberta
    if (salaAberta(consulta, agora)) {
      const abertura = Math.max(inicio.getTime() - 15 * MINUTO, criadaEm.getTime());
      lista.push({
        id: `sala-${consulta.id}`,
        tipo: 'sala',
        titulo: 'Sala virtual disponível',
        texto: `Sua sala com ${nome} já está aberta. Entre quando estiver pronto(a).`,
        quando: new Date(abertura),
        consultaId: consulta.id,
      });
    }
  }

  lista.push(...criarDicas(agora));

  return lista
    .filter((notificacao) => notificacao.quando.getTime() <= agora.getTime())
    .sort((a, b) => b.quando.getTime() - a.quando.getTime());
}