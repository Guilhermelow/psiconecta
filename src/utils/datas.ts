// Dias de atendimento: 0 = domingo, 1 = segunda ... 6 = sábado
export type AgendaSemanal = Partial<Record<number, string[]>>;

export type DiaDisponivel = {
  chave: string; // "2026-11-03" (usado para identificar o dia)
  data: Date;
  horarios: string[];
};

const DIAS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];
const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

// Date → "2026-11-03"
export function chaveData(data: Date) {
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

// "2026-11-03" → Date
export function dataDaChave(chave: string) {
  const [ano, mes, dia] = chave.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

export function ehHoje(data: Date) {
  return chaveData(data) === chaveData(new Date());
}

// "Ter"
export function diaSemanaCurto(data: Date) {
  return DIAS_CURTOS[data.getDay()];
}

// "Terça-feira (3/11)"
export function rotuloDia(data: Date) {
  return `${DIAS[data.getDay()]} (${data.getDate()}/${data.getMonth() + 1})`;
}

// "Terça-feira, 3 de novembro"
export function dataLonga(data: Date) {
  return `${DIAS[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]}`;
}

// "Ter, 3/11"
export function dataCurta(data: Date) {
  return `${DIAS_CURTOS[data.getDay()]}, ${data.getDate()}/${data.getMonth() + 1}`;
}

// "Novembro 2026"
export function mesAno(data: Date) {
  const mes = MESES[data.getMonth()];
  return `${mes[0].toUpperCase()}${mes.slice(1)} ${data.getFullYear()}`;
}

// Cria os próximos dias com os horários de cada um
export function gerarDias(agenda: AgendaSemanal, quantidade = 14): DiaDisponivel[] {
  const agora = new Date();
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const dias: DiaDisponivel[] = [];

  for (let i = 0; i < quantidade; i++) {
    const data = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + i);
    let horarios = agenda[data.getDay()] ?? [];

    // Hoje: esconde horários que já passaram
    if (i === 0) {
      horarios = horarios.filter((hora) => {
        const [h, m] = hora.split(':').map(Number);
        return h * 60 + m > minutosAgora;
      });
    }

    dias.push({ chave: chaveData(data), data, horarios });
  }

  return dias;
}
// "14:00" + 50 → "14:50"   |   "14:00" + (-15) → "13:45"
export function somarMinutos(hora: string, minutos: number) {
  const [h, m] = hora.split(':').map(Number);
  const umDia = 24 * 60;
  const total = (((h * 60 + m + minutos) % umDia) + umDia) % umDia;
  const novaHora = String(Math.floor(total / 60)).padStart(2, '0');
  const novoMinuto = String(total % 60).padStart(2, '0');
  return `${novaHora}:${novoMinuto}`;
}
// "2026-11-03" + "14:00" → Date completo
export function dataEHora(chave: string, hora: string) {
  const data = dataDaChave(chave);
  const [h, m] = hora.split(':').map(Number);
  data.setHours(h, m, 0, 0);
  return data;
}
// "Agora", "Há 25 min", "Há 2 h", "Ontem", "Sábado", "12/10"
export function tempoRelativo(quando: Date, agora = new Date()) {
  const minutos = Math.floor((agora.getTime() - quando.getTime()) / 60000);

  if (minutos < 1) return 'Agora';
  if (minutos < 60) return `Há ${minutos} min`;
  if (ehHoje(quando)) return `Há ${Math.floor(minutos / 60)} h`;

  const ontem = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - 1);
  if (chaveData(quando) === chaveData(ontem)) return 'Ontem';

  if (minutos < 7 * 24 * 60) return DIAS[quando.getDay()];
  return `${quando.getDate()}/${quando.getMonth() + 1}`;
}