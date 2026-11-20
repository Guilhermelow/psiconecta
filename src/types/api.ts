// Espelho dos enums e DTOs do backend (api-psiconecta).
// Fonte da verdade: o código Java. Se o backend mudar, atualize aqui.

// ===== Enums (psiconecta.model.enums) =====
export type PerfilUsuario = 'PACIENTE' | 'ESTUDANTE' | 'ADMIN';
export type ModalidadeAtendimento = 'ONLINE' | 'PRESENCIAL' | 'AMBOS';
// Consultas e disponibilidades não aceitam AMBOS
export type ModalidadeSessao = Exclude<ModalidadeAtendimento, 'AMBOS'>;
export type StatusAprovacaoEstudante = 'PENDENTE' | 'APROVADO' | 'REJEITADO';
export type StatusConsulta =
  | 'PENDENTE'
  | 'CONFIRMADA'
  | 'EM_ANDAMENTO'
  | 'CONCLUIDA'
  | 'CANCELADA'
  | 'NAO_COMPARECEU';
export type TipoConsentimento = 'TERMOS_USO' | 'POLITICA_PRIVACIDADE';

// ===== Formatos de data no JSON =====
export type DataISO = string; // LocalDate       → "1995-03-20"
export type HoraISO = string; // LocalTime       → "08:00:00" (aceita "08:00" no envio)
export type DataHoraISO = string; // OffsetDateTime → "2026-11-10T14:00:00-03:00"

// ===== Regras fixas do backend =====
export const DURACAO_CONSULTA_MINUTOS = 50; // ConsultaService.agendar
export const FUSO_BACKEND = 'America/Recife'; // ConsultaService.validarDisponibilidade

// ===== Respostas =====
export type UsuarioResponseDTO = {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
};

export type LoginResponseDTO = {
  token: string;
  usuarioId: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
};

export type AreaAtendimentoResponseDTO = {
  id: number;
  nome: string;
  descricao: string | null;
  ativo: boolean;
};

export type PacienteResponseDTO = {
  id: number;
  usuario: UsuarioResponseDTO;
  cpf: string | null;
  dataNascimento: DataISO | null;
  telefone: string | null;
};

export type EstudanteResponseDTO = {
  id: number;
  usuario: UsuarioResponseDTO;
  universidade: string;
  matricula: string;
  periodo: number;
  estagioSupervisionado: boolean;
  bio: string | null;
  fotoUrl: string | null;
  modalidade: ModalidadeAtendimento;
  statusAprovacao: StatusAprovacaoEstudante;
  areasAtendimento: AreaAtendimentoResponseDTO[]; // Set no Java, array no JSON
};

export type DisponibilidadeResponseDTO = {
  id: number;
  diaSemana: number; // 1 = segunda ... 7 = domingo (ISO)
  horaInicio: HoraISO;
  horaFim: HoraISO;
  modalidade: ModalidadeAtendimento;
  ativo: boolean;
};

export type ConsultaResponseDTO = {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  estudanteId: number;
  estudanteNome: string;
  dataHoraInicio: DataHoraISO;
  dataHoraFim: DataHoraISO;
  duracaoMinutos: number;
  modalidade: ModalidadeAtendimento;
  status: StatusConsulta;
  observacao: string | null;
  linkReuniao: string | null; // nenhum código do backend preenche ainda
};

export type ConsentimentoResponseDTO = {
  id: number;
  tipo: TipoConsentimento;
  versao: string;
  aceito: boolean;
  // Preenchido pelo banco: vem null na resposta do POST e preenchido na listagem
  registradoEm: DataHoraISO | null;
};

// ===== Requisições =====
export type LoginRequestDTO = {
  email: string;
  senha: string;
};

export type CadastroUsuarioDTO = {
  nome: string; // 2 a 150
  email: string; // até 150
  senha: string; // 8 a 72
};

export type CadastroPacienteDTO = {
  usuario: CadastroUsuarioDTO;
  cpf?: string | null; // exatamente 11 números, sem máscara
  dataNascimento?: DataISO | null; // no passado
  telefone?: string | null; // até 20
};

export type CadastroEstudanteDTO = {
  usuario: CadastroUsuarioDTO;
  universidade: string; // até 200
  matricula: string; // até 50
  periodo: number; // 1 a 12
  estagioSupervisionado: boolean; // precisa ser true
  bio?: string | null; // até 2000
  modalidade: ModalidadeAtendimento;
  areasAtendimentoIds: number[]; // pelo menos 1
};

export type AtualizacaoPacienteDTO = {
  nome: string;
  dataNascimento?: DataISO | null;
  telefone?: string | null;
};

export type AtualizacaoEstudanteDTO = {
  nome: string;
  periodo: number;
  bio?: string | null;
  modalidade: ModalidadeAtendimento;
  areasAtendimentoIds: number[];
};

export type CadastroDisponibilidadeDTO = {
  diaSemana: number; // 1 a 7
  horaInicio: HoraISO;
  horaFim: HoraISO; // depois do início
  modalidade: ModalidadeSessao;
};

export type AgendamentoConsultaDTO = {
  estudanteId: number;
  dataHoraInicio: DataHoraISO; // no futuro
  modalidade: ModalidadeSessao;
  observacao?: string | null; // até 1000
};

export type RegistroConsentimentoDTO = {
  tipo: TipoConsentimento;
  versao: string;
  aceito: boolean;
};

// ===== Corpos de erro (GlobalExceptionHandler) =====
// 401 e 403 vêm sem corpo.
export type ErroRegraNegocioDTO = {
  timestamp: DataHoraISO;
  status: number;
  erro: 'Requisição inválida';
  mensagem: string;
};

export type ErroValidacaoDTO = {
  timestamp: DataHoraISO;
  status: number;
  erro: 'Erro de validação';
  campos: Record<string, string>; // ex.: { "usuario.email": "Informe um e-mail válido." }
};
