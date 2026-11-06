import type { Consulta } from '@/contexts/ConsultasContext';
import { chaveData } from '@/utils/datas';

const DIA = 24 * 60; // em minutos

// Data e hora a partir de agora (ex.: daqui a 10 minutos, ou 7 dias atrás)
function aPartirDeAgora(minutos: number) {
  const data = new Date(Date.now() + minutos * 60 * 1000);
  const hora = `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
  return { data: chaveData(data), hora };
}

// Mesmo cálculo, mas no formato de "momento" (para criadaEm / canceladaEm)
function momento(minutos: number) {
  return new Date(Date.now() + minutos * 60 * 1000).toISOString();
}

// SÓ PARA TESTE: usado apenas durante o desenvolvimento
export function criarConsultasExemplo(): Consulta[] {
  return [
    {
      id: 'exemplo-1',
      estudanteId: '5', // Mariana Costa
      ...aPartirDeAgora(10), // daqui a 10 minutos
      protocolo: 'PSI-2026-10001',
      status: 'agendada',
      criadaEm: momento(-DIA), // marcada ontem
    },
    {
      id: 'exemplo-2',
      estudanteId: '2', // Beatriz Souza
      ...aPartirDeAgora(-7 * DIA), // há 7 dias → concluída
      protocolo: 'PSI-2026-10002',
      status: 'agendada',
      criadaEm: momento(-10 * DIA),
    },
    {
      id: 'exemplo-3',
      estudanteId: '3', // Camila Rocha
      ...aPartirDeAgora(-3 * DIA),
      protocolo: 'PSI-2026-10003',
      status: 'cancelada',
      criadaEm: momento(-6 * DIA),
      canceladaEm: momento(-4 * DIA),
      motivoCancelamento: 'Conflito com trabalho ou estudos',
    },
  ];
}