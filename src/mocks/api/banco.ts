// SÓ PARA DESENVOLVIMENTO: "tabelas" em memória usadas quando
// EXPO_PUBLIC_USAR_DADOS_EXEMPLO=true. Espelham as entidades do backend.
// Todos os nomes, e-mails e CPFs são fictícios.
//
// Logins de exemplo (senha de todos: senha123)
//   camila.souza@exemplo.com    → paciente
//   joao.pereira@exemplo.com    → paciente
//   mariana.costa@exemplo.com   → estudante aprovado (online e presencial)
//   lucas.ferreira@exemplo.com  → estudante aprovado (online)
//   beatriz.souza@exemplo.com   → estudante aprovado (presencial)
//   rafael.lima@exemplo.com     → estudante em análise (PENDENTE)
import type {
  AreaAtendimentoResponseDTO,
  ConsentimentoResponseDTO,
  DataHoraISO,
  DataISO,
  DisponibilidadeResponseDTO,
  ModalidadeAtendimento,
  StatusAprovacaoEstudante,
  StatusConsulta,
  UsuarioResponseDTO,
} from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { paraDataHoraIso } from '@/utils/conversoes';

export const SENHA_EXEMPLO = 'senha123';

export type UsuarioTabela = UsuarioResponseDTO & { senha: string };

export type PacienteTabela = {
  id: number;
  usuarioId: number;
  cpf: string | null;
  dataNascimento: DataISO | null;
  telefone: string | null;
};

export type EstudanteTabela = {
  id: number;
  usuarioId: number;
  universidade: string;
  matricula: string;
  periodo: number;
  estagioSupervisionado: boolean;
  bio: string | null;
  fotoUrl: string | null;
  modalidade: ModalidadeAtendimento;
  statusAprovacao: StatusAprovacaoEstudante;
  areasIds: number[];
};

export type DisponibilidadeTabela = DisponibilidadeResponseDTO & { estudanteId: number };

export type ConsultaTabela = {
  id: number;
  pacienteId: number;
  estudanteId: number;
  dataHoraInicio: DataHoraISO;
  dataHoraFim: DataHoraISO;
  duracaoMinutos: number;
  modalidade: ModalidadeAtendimento;
  status: StatusConsulta;
  observacao: string | null;
  linkReuniao: string | null;
};

export type ConsentimentoTabela = ConsentimentoResponseDTO & { usuarioId: number };

export type Banco = {
  usuarios: UsuarioTabela[];
  pacientes: PacienteTabela[];
  estudantes: EstudanteTabela[];
  areas: AreaAtendimentoResponseDTO[];
  disponibilidades: DisponibilidadeTabela[];
  consultas: ConsultaTabela[];
  consentimentos: ConsentimentoTabela[];
};

// Horário relativo a agora, arredondado para múltiplos de 5 min
function aPartirDeAgora(minutos: number) {
  const cincoMin = 5 * 60 * 1000;
  return new Date(Math.round((Date.now() + minutos * 60000) / cincoMin) * cincoMin);
}

function consulta(
  id: number,
  pacienteId: number,
  estudanteId: number,
  minutosAPartirDeAgora: number,
  modalidade: ModalidadeAtendimento,
  status: StatusConsulta,
  observacao: string | null = null
): ConsultaTabela {
  const inicio = aPartirDeAgora(minutosAPartirDeAgora);
  const fim = new Date(inicio.getTime() + DURACAO_CONSULTA_MINUTOS * 60000);
  return {
    id,
    pacienteId,
    estudanteId,
    dataHoraInicio: paraDataHoraIso(inicio),
    dataHoraFim: paraDataHoraIso(fim),
    duracaoMinutos: DURACAO_CONSULTA_MINUTOS,
    modalidade,
    status,
    observacao,
    linkReuniao: null,
  };
}

function disponibilidade(
  id: number,
  estudanteId: number,
  diaSemana: number,
  horaInicio: string,
  horaFim: string,
  modalidade: ModalidadeAtendimento,
  ativo = true
): DisponibilidadeTabela {
  return { id, estudanteId, diaSemana, horaInicio, horaFim, modalidade, ativo };
}

const HORA = 60;
const DIA = 24 * HORA;

export function criarBancoExemplo(): Banco {
  const usuario = (
    id: number,
    nome: string,
    email: string,
    perfil: UsuarioResponseDTO['perfil']
  ): UsuarioTabela => ({ id, nome, email, perfil, ativo: true, senha: SENHA_EXEMPLO });

  return {
    usuarios: [
      usuario(1, 'Camila Souza', 'camila.souza@exemplo.com', 'PACIENTE'),
      usuario(2, 'João Pereira', 'joao.pereira@exemplo.com', 'PACIENTE'),
      usuario(3, 'Mariana Costa', 'mariana.costa@exemplo.com', 'ESTUDANTE'),
      usuario(4, 'Lucas Ferreira', 'lucas.ferreira@exemplo.com', 'ESTUDANTE'),
      usuario(5, 'Beatriz Souza', 'beatriz.souza@exemplo.com', 'ESTUDANTE'),
      usuario(6, 'Rafael Lima', 'rafael.lima@exemplo.com', 'ESTUDANTE'),
    ],

    pacientes: [
      { id: 1, usuarioId: 1, cpf: '00000000191', dataNascimento: '1998-04-12', telefone: '(81) 90000-0001' },
      { id: 2, usuarioId: 2, cpf: null, dataNascimento: null, telefone: null },
    ],

    estudantes: [
      {
        id: 1,
        usuarioId: 3,
        universidade: 'Pontifícia Universidade Católica (PUC)',
        matricula: '2021001001',
        periodo: 8,
        estagioSupervisionado: true,
        bio: 'Olá! Sou estudante do 8º período de Psicologia e realizo atendimentos sob supervisão. Meu foco é oferecer um espaço seguro, livre de julgamentos e acolhedor.',
        fotoUrl: null,
        modalidade: 'AMBOS',
        statusAprovacao: 'APROVADO',
        areasIds: [1, 2, 3],
      },
      {
        id: 2,
        usuarioId: 4,
        universidade: 'Universidade Federal de Pernambuco (UFPE)',
        matricula: '2020002002',
        periodo: 7,
        estagioSupervisionado: true,
        bio: null,
        fotoUrl: null,
        modalidade: 'ONLINE',
        statusAprovacao: 'APROVADO',
        areasIds: [3, 4],
      },
      {
        id: 3,
        usuarioId: 5,
        universidade: 'Universidade Federal da Paraíba (UFPB)',
        matricula: '2019003003',
        periodo: 10,
        estagioSupervisionado: true,
        bio: 'Atendo adultos com foco em luto e ansiedade, sempre com acompanhamento docente.',
        fotoUrl: null,
        modalidade: 'PRESENCIAL',
        statusAprovacao: 'APROVADO',
        areasIds: [1, 5],
      },
      {
        id: 4,
        usuarioId: 6,
        universidade: 'Universidade Católica de Pernambuco (UNICAP)',
        matricula: '2022004004',
        periodo: 5,
        estagioSupervisionado: true,
        bio: null,
        fotoUrl: null,
        modalidade: 'ONLINE',
        statusAprovacao: 'PENDENTE',
        areasIds: [2, 7],
      },
    ],

    areas: [
      { id: 1, nome: 'Ansiedade', descricao: null, ativo: true },
      { id: 2, nome: 'Autoconhecimento', descricao: null, ativo: true },
      { id: 3, nome: 'Estresse', descricao: null, ativo: true },
      { id: 4, nome: 'Relacionamentos', descricao: null, ativo: true },
      { id: 5, nome: 'Luto', descricao: null, ativo: true },
      { id: 6, nome: 'Autoestima', descricao: null, ativo: true },
      { id: 7, nome: 'Relações familiares', descricao: null, ativo: true },
      { id: 8, nome: 'Orientação vocacional', descricao: null, ativo: false },
    ],

    disponibilidades: [
      // Mariana (AMBOS): manhãs online, tardes presenciais
      ...[1, 2, 3, 4, 5].flatMap((dia) => [
        disponibilidade(dia * 2 - 1, 1, dia, '08:00:00', '12:00:00', 'ONLINE'),
        disponibilidade(dia * 2, 1, dia, '14:00:00', '18:00:00', 'PRESENCIAL'),
      ]),
      disponibilidade(11, 1, 6, '08:00:00', '12:00:00', 'ONLINE'),
      disponibilidade(12, 1, 6, '14:00:00', '16:00:00', 'ONLINE', false), // desativada
      // Lucas (ONLINE)
      disponibilidade(13, 2, 2, '09:00:00', '12:00:00', 'ONLINE'),
      disponibilidade(14, 2, 2, '18:00:00', '21:00:00', 'ONLINE'),
      disponibilidade(15, 2, 4, '09:00:00', '12:00:00', 'ONLINE'),
      disponibilidade(16, 2, 4, '18:00:00', '21:00:00', 'ONLINE'),
      // Beatriz (PRESENCIAL)
      disponibilidade(17, 3, 1, '13:00:00', '17:00:00', 'PRESENCIAL'),
      disponibilidade(18, 3, 3, '13:00:00', '17:00:00', 'PRESENCIAL'),
      disponibilidade(19, 3, 5, '13:00:00', '17:00:00', 'PRESENCIAL'),
    ],

    consultas: [
      consulta(1, 1, 1, 45, 'ONLINE', 'CONFIRMADA', 'Ansiedade na rotina de estudos.'),
      consulta(2, 2, 1, -10, 'ONLINE', 'EM_ANDAMENTO'),
      consulta(3, 2, 1, DIA + 2 * HORA, 'PRESENCIAL', 'CONFIRMADA', 'Conflitos familiares recentes.'),
      consulta(4, 2, 1, -2 * DIA, 'ONLINE', 'NAO_COMPARECEU'),
      consulta(5, 1, 2, -7 * DIA, 'ONLINE', 'CONCLUIDA'),
      consulta(6, 1, 3, -3 * DIA, 'PRESENCIAL', 'CANCELADA'),
      // Horário já passou e a Mariana não registrou: testa "iniciar" e "não compareceu"
      consulta(7, 2, 1, -3 * HORA, 'PRESENCIAL', 'CONFIRMADA'),
    ],

    consentimentos: [
      { id: 1, usuarioId: 1, tipo: 'TERMOS_USO', versao: '1.0', aceito: true, registradoEm: paraDataHoraIso(aPartirDeAgora(-30 * DIA)) },
      { id: 2, usuarioId: 1, tipo: 'POLITICA_PRIVACIDADE', versao: '1.0', aceito: true, registradoEm: paraDataHoraIso(aPartirDeAgora(-30 * DIA)) },
    ],
  };
}
