import type { Href } from 'expo-router';
import type { ConsultaResponseDTO } from '@/types/api';
import { dicasDoPaciente, dicasDoEstudante } from '@/conteudo/dicas';
import {
  situacaoDaConsulta,
  salaDisponivel,
  inicioDaConsulta,
  horaDe,
  fimDaConsulta,
} from '@/utils/consultas';
import { estaPorVir, precisaRegistro } from '@/utils/atendimentos';
import { ehHoje } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';

export type TipoNotificacao =
  | 'hoje'
  | 'sala'
  | 'registro'
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

// ===== PACIENTE: a partir das consultas da API =====
// O backend não informa quando a consulta foi criada ou cancelada, então não há
// avisos de "agendamento confirmado"/"consulta cancelada" com data: só os calculáveis.
export function gerarNotificacoes(consultas: ConsultaResponseDTO[], agora = new Date()): Notificacao[] {
  const lista: Notificacao[] = [];

  for (const consulta of consultas) {
    if (situacaoDaConsulta(consulta, agora) !== 'proxima') continue;

    const nome = primeiroNome(consulta.estudanteNome) || 'o estudante';
    const inicio = inicioDaConsulta(consulta);
    const hora = horaDe(inicio);
    const rota: Href = `/paciente/consulta/${consulta.id}`;

    if (ehHoje(inicio)) {
      lista.push({
        id: `hoje-${consulta.id}`,
        tipo: 'hoje',
        titulo: `Sua consulta é hoje às ${hora}`,
        texto:
          consulta.modalidade === 'PRESENCIAL'
            ? `A sessão presencial com ${nome} acontece hoje.`
            : `A sessão online com ${nome} acontece hoje.`,
        quando: momentoDoLembrete(agora),
        rota,
      });
    }

    if (salaDisponivel(consulta, agora)) {
      lista.push({
        id: `sala-${consulta.id}`,
        tipo: 'sala',
        titulo: 'Sala virtual disponível',
        texto: `Sua sala com ${nome} já está aberta. Entre quando estiver pronto(a).`,
        quando: new Date(inicio.getTime() - 15 * MINUTO),
        rota,
      });
    }
  }

  lista.push(...dicasDoPaciente(agora));
  return finalizar(lista, agora);
}

// ===== ESTUDANTE: a partir das consultas da API =====
// Sem solicitações: o paciente agenda direto. Avisos: atendimento do dia, sala aberta
// e atendimento cujo horário passou sem registro.
export function gerarNotificacoesEstudante(consultas: ConsultaResponseDTO[], agora = new Date()): Notificacao[] {
  const lista: Notificacao[] = [];

  for (const consulta of consultas) {
    const nome = primeiroNome(consulta.pacienteNome) || 'o paciente';
    const inicio = inicioDaConsulta(consulta);
    const hora = horaDe(inicio);
    const rota: Href = `/estudante/atendimento/${consulta.id}`;

    if (precisaRegistro(consulta, agora)) {
      lista.push({
        id: `registro-${consulta.id}`,
        tipo: 'registro',
        titulo: 'Registre o atendimento',
        texto: `O horário com ${nome} já terminou. Registre se foi concluído ou se houve falta.`,
        quando: fimDaConsulta(consulta),
        rota,
      });
      continue;
    }

    if (!estaPorVir(consulta, agora)) continue;

    if (ehHoje(inicio)) {
      lista.push({
        id: `hoje-${consulta.id}`,
        tipo: 'hoje',
        titulo: `Você atende hoje às ${hora}`,
        texto:
          consulta.modalidade === 'PRESENCIAL'
            ? `Sessão presencial com ${nome}.`
            : `Sessão online com ${nome}.`,
        quando: momentoDoLembrete(agora),
        rota,
      });
    }

    if (salaDisponivel(consulta, agora)) {
      lista.push({
        id: `sala-${consulta.id}`,
        tipo: 'sala',
        titulo: 'Sala virtual disponível',
        texto: `Sua sala com ${nome} já está aberta.`,
        quando: new Date(inicio.getTime() - 15 * MINUTO),
        rota,
      });
    }
  }

  lista.push(...dicasDoEstudante(agora));
  return finalizar(lista, agora);
}
