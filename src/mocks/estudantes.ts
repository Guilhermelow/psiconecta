import { AgendaSemanal } from '@/utils/datas';
// Dados de exemplo. Depois virão do servidor.
export type Disponibilidade = 'Hoje' | 'Esta semana' | 'Próxima semana';

export type Estudante = {
    id: string;
    nome: string;
    periodo: string;
    instituicao: string;          // sigla (ex.: PUC)
    instituicaoCompleta: string;  // nome inteiro
    abordagem: string;
    supervisor: string;
    focos: string[];
    disponibilidade: Disponibilidade;
    proximoHorario: string;
    sobre?: string;       // texto "Sobre mim" (se não tiver, usa um padrão)
    agenda?: AgendaSemanal; // dias da semana em que atende (se não tiver, usa a padrão)
    foto?: string;
};

export const AREAS = [
    'Todos',
    'Ansiedade',
    'Autoconhecimento',
    'Estresse',
    'Relacionamentos',
    'Luto',
];

export const FILTROS_DISPONIBILIDADE = ['Qualquer dia', 'Hoje', 'Esta semana'];
export const FILTROS_PERIODO = ['Todos', '5º ao 6º', '7º ao 10º'];
// Dias e horários de atendimento (0 = domingo, 1 = segunda ... 6 = sábado)
export const AGENDA_PADRAO: AgendaSemanal = {
    2: ['09:00', '14:00', '16:30'], // terça
    4: ['10:00', '15:00'],          // quinta
    5: ['14:00', '17:00'],          // sexta
};

export const ESTUDANTES: Estudante[] = [
    {
        id: '1',
        nome: 'Lucas Ferreira',
        periodo: '7º',
        instituicao: 'PUC',
        instituicaoCompleta: 'Pontifícia Universidade Católica (PUC)',
        abordagem: 'TCC',
        supervisor: 'Prof. Dr. André Bastos',
        focos: ['Estresse', 'Foco acadêmico'],
        disponibilidade: 'Esta semana',
        proximoHorario: 'Amanhã, 10:00',
    },
    {
        id: '2',
        nome: 'Beatriz Souza',
        periodo: '9º',
        instituicao: 'USP',
        instituicaoCompleta: 'Universidade de São Paulo (USP)',
        abordagem: 'Humanista',
        supervisor: 'Profª Dra. Sílvia M. Cordeiro',
        focos: ['Ansiedade', 'Transição de carreira'],
        disponibilidade: 'Esta semana',
        proximoHorario: 'Quarta, 15:30',
    },
    {
        id: '3',
        nome: 'Camila Rocha',
        periodo: '10º',
        instituicao: 'UFPB',
        instituicaoCompleta: 'Universidade Federal da Paraíba (UFPB)',
        abordagem: 'TCC',
        supervisor: 'Profª Dra. Helena V. Guimarães',
        focos: ['Luto', 'Ansiedade'],
        disponibilidade: 'Hoje',
        proximoHorario: 'Hoje, 18:00',
    },
    {
        id: '4',
        nome: 'Rafael Lima',
        periodo: '8º',
        instituicao: 'UFPE',
        instituicaoCompleta: 'Universidade Federal de Pernambuco (UFPE)',
        abordagem: 'Psicanálise',
        supervisor: 'Prof. Dr. Marcos Tavares',
        focos: ['Autoconhecimento', 'Relacionamentos'],
        disponibilidade: 'Próxima semana',
        proximoHorario: 'Segunda, 09:00',
    },
    {
        id: '5',
        nome: 'Mariana Costa',
        periodo: '8º',
        instituicao: 'PUC',
        instituicaoCompleta: 'Pontifícia Universidade Católica (PUC)',
        abordagem: 'Humanista',
        supervisor: 'Profª Dra. Helena V. Guimarães',
        focos: ['Ansiedade', 'Autoconhecimento', 'Estresse'],
        disponibilidade: 'Esta semana',
        proximoHorario: 'Terça, 14:00',
        sobre: 'Olá! Sou estudante do 8º período de Psicologia e realizo atendimentos sob constante orientação e supervisão de professores preceptores. Meu foco é proporcionar um espaço seguro, livre de julgamentos e acolhedor para que possamos juntos trabalhar suas questões.',
        agenda: {
            1: ['08:00', '10:00'],
            2: ['09:00', '14:00', '16:30'],
            3: ['13:00', '15:30', '19:00'],
            5: ['10:00'],
        },
    },
    {
        id: '6',
        nome: 'João Pedro Alves',
        periodo: '6º',
        instituicao: 'Mackenzie',
        instituicaoCompleta: 'Universidade Presbiteriana Mackenzie',
        abordagem: 'TCC',
        supervisor: 'Prof. Dr. André Bastos',
        focos: ['Estresse', 'Relacionamentos'],
        disponibilidade: 'Hoje',
        proximoHorario: 'Hoje, 20:00',
    },
    {
        id: '7',
        nome: 'Larissa Melo',
        periodo: '5º',
        instituicao: 'UNICAP',
        instituicaoCompleta: 'Universidade Católica de Pernambuco (UNICAP)',
        abordagem: 'Psicanálise',
        supervisor: 'Prof. Dr. Marcos Tavares',
        focos: ['Autoconhecimento', 'Relações familiares'],
        disponibilidade: 'Próxima semana',
        proximoHorario: 'Quinta, 11:00',
    },
];