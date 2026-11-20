// Horários livres para o paciente agendar, calculados a partir das disponibilidades do estudante.
//
// O backend confere a disponibilidade no fuso America/Recife (UTC-3, sem horário de verão),
// então os horários são calculados, mostrados e enviados nesse fuso ("horário de Brasília").
//
// Limitação: a API não informa as consultas já marcadas por outros pacientes.
// Um horário pode aparecer livre e o backend recusar com
// "O estudante já possui uma consulta neste horário." — a tela trata esse erro.
import type {
  ConsultaResponseDTO,
  DisponibilidadeResponseDTO,
  ModalidadeSessao,
} from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { horaEmMinutos } from '@/utils/conversoes';
import { dataDaChave } from '@/utils/datas';

const HORA = 60 * 60 * 1000;
const DESLOCAMENTO = -3 * HORA; // America/Recife
const SUFIXO_FUSO = '-03:00';
const INTERVALO_MINUTOS = 60; // 50 min de sessão + 10 min de intervalo

export type HorarioLivre = {
  hora: string; // "09:00"
  modalidades: ModalidadeSessao[];
};

export type DiaComHorarios = {
  chave: string; // "2026-11-14"
  data: Date; // para os textos da tela
  horarios: HorarioLivre[];
};

// "2026-11-14" + "09:00" → "2026-11-14T09:00:00-03:00" (dataHoraInicio do agendamento)
export function dataHoraNoFusoBackend(chave: string, hora: string) {
  return `${chave}T${hora}:00${SUFIXO_FUSO}`;
}

function formatarMinutos(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function conflitaComPaciente(inicio: Date, consultas: ConsultaResponseDTO[]) {
  const fim = inicio.getTime() + DURACAO_CONSULTA_MINUTOS * 60000;
  return consultas.some(
    (consulta) =>
      consulta.status !== 'CANCELADA' &&
      new Date(consulta.dataHoraInicio).getTime() < fim &&
      new Date(consulta.dataHoraFim).getTime() > inicio.getTime()
  );
}

export function gerarHorariosLivres(
  disponibilidades: DisponibilidadeResponseDTO[],
  consultasDoPaciente: ConsultaResponseDTO[],
  quantidadeDias = 14,
  agora = new Date()
): DiaComHorarios[] {
  const hojeNoFuso = new Date(agora.getTime() + DESLOCAMENTO); // ler com getUTC*
  const dias: DiaComHorarios[] = [];

  for (let i = 0; i < quantidadeDias; i++) {
    const dia = new Date(
      Date.UTC(hojeNoFuso.getUTCFullYear(), hojeNoFuso.getUTCMonth(), hojeNoFuso.getUTCDate() + i)
    );
    const chave = dia.toISOString().slice(0, 10);
    const diaSemana = dia.getUTCDay() === 0 ? 7 : dia.getUTCDay();
    const porHora = new Map<string, Set<ModalidadeSessao>>();

    for (const disponibilidade of disponibilidades) {
      if (!disponibilidade.ativo || disponibilidade.diaSemana !== diaSemana) continue;
      const modalidades: ModalidadeSessao[] =
        disponibilidade.modalidade === 'AMBOS' ? ['ONLINE', 'PRESENCIAL'] : [disponibilidade.modalidade];
      const limite = horaEmMinutos(disponibilidade.horaFim);

      for (
        let minuto = horaEmMinutos(disponibilidade.horaInicio);
        minuto + DURACAO_CONSULTA_MINUTOS <= limite;
        minuto += INTERVALO_MINUTOS
      ) {
        const hora = formatarMinutos(minuto);
        const inicio = new Date(dataHoraNoFusoBackend(chave, hora));
        if (inicio.getTime() <= agora.getTime()) continue; // backend exige data futura
        if (conflitaComPaciente(inicio, consultasDoPaciente)) continue;
        const conjunto = porHora.get(hora) ?? new Set<ModalidadeSessao>();
        modalidades.forEach((modalidade) => conjunto.add(modalidade));
        porHora.set(hora, conjunto);
      }
    }

    const horarios = [...porHora.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([hora, modalidades]) => ({ hora, modalidades: [...modalidades] }));

    dias.push({ chave, data: dataDaChave(chave), horarios });
  }

  return dias;
}
