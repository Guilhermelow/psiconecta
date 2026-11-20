// SÓ PARA DESENVOLVIMENTO: imita a API (controllers + services + validações dos DTOs)
// usando o banco em memória. As mensagens de erro são as mesmas do backend.
// Os dados voltam ao estado inicial sempre que o app recarrega.
import {
  ErroApi,
  MENSAGEM_SEM_PERMISSAO,
  MENSAGEM_SESSAO_EXPIRADA,
  obterToken,
} from '@/services/api';
import type {
  AgendamentoConsultaDTO,
  AreaAtendimentoResponseDTO,
  AtualizacaoEstudanteDTO,
  AtualizacaoPacienteDTO,
  CadastroDisponibilidadeDTO,
  CadastroEstudanteDTO,
  CadastroPacienteDTO,
  CadastroUsuarioDTO,
  ConsentimentoResponseDTO,
  ConsultaResponseDTO,
  DisponibilidadeResponseDTO,
  EstudanteResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  PacienteResponseDTO,
  PerfilUsuario,
  RegistroConsentimentoDTO,
  UsuarioResponseDTO,
} from '@/types/api';
import { DURACAO_CONSULTA_MINUTOS } from '@/types/api';
import { horaEmMinutos, paraDataHoraIso } from '@/utils/conversoes';
import {
  criarBancoExemplo,
  type ConsultaTabela,
  type DisponibilidadeTabela,
  type EstudanteTabela,
  type PacienteTabela,
  type UsuarioTabela,
} from '@/mocks/api/banco';

const banco = criarBancoExemplo();
const PREFIXO_TOKEN = 'token-exemplo-';

// ===== Utilidades =====
const espera = () => new Promise((resolver) => setTimeout(resolver, 300));
const copia = <T>(valor: T): T => JSON.parse(JSON.stringify(valor));
const proximoId = (lista: { id: number }[]) => Math.max(0, ...lista.map((item) => item.id)) + 1;
const vazio = (valor?: string | null) => !valor || !valor.trim();
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function regra(mensagem: string): never {
  throw new ErroApi(mensagem, 400);
}

// Igual ao "Erro de validação" do GlobalExceptionHandler
function validar(verificacoes: [falhou: boolean, campo: string, mensagem: string][]) {
  const campos: Record<string, string> = {};
  for (const [falhou, campo, mensagem] of verificacoes) {
    if (falhou && !campos[campo]) campos[campo] = mensagem;
  }
  const lista = Object.values(campos);
  if (lista.length > 0) throw new ErroApi(lista[0], 400, campos);
}

function validarUsuario(usuario: CadastroUsuarioDTO | undefined) {
  if (!usuario) validar([[true, 'usuario', 'Os dados do usuário são obrigatórios.']]);
  const { nome = '', email = '', senha = '' } = usuario ?? ({} as CadastroUsuarioDTO);
  validar([
    [vazio(nome), 'usuario.nome', 'O nome é obrigatório.'],
    [nome.length < 2 || nome.length > 150, 'usuario.nome', 'O nome deve possuir entre 2 e 150 caracteres.'],
    [vazio(email), 'usuario.email', 'O e-mail é obrigatório.'],
    [!EMAIL_VALIDO.test(email), 'usuario.email', 'Informe um e-mail válido.'],
    [email.length > 150, 'usuario.email', 'O e-mail deve possuir no máximo 150 caracteres.'],
    [vazio(senha), 'usuario.senha', 'A senha é obrigatória.'],
    [senha.length < 8 || senha.length > 72, 'usuario.senha', 'A senha deve possuir entre 8 e 72 caracteres.'],
  ]);
}

function dataNoPassado(data?: string | null) {
  return !data || data < paraDataHoraIso(new Date()).slice(0, 10);
}

// ===== Sessão (imita o JwtAuthenticationFilter + SecurityConfig) =====
function usuarioLogado(): UsuarioTabela {
  const token = obterToken();
  const id = token?.startsWith(PREFIXO_TOKEN) ? Number(token.slice(PREFIXO_TOKEN.length)) : NaN;
  const usuario = banco.usuarios.find((item) => item.id === id);
  if (!usuario || !usuario.ativo) throw new ErroApi(MENSAGEM_SESSAO_EXPIRADA, 401);
  return usuario;
}

function exigirPerfil(perfil: PerfilUsuario) {
  const usuario = usuarioLogado();
  if (usuario.perfil !== perfil) throw new ErroApi(MENSAGEM_SEM_PERMISSAO, 403);
  return usuario;
}

function pacienteLogado() {
  const usuario = exigirPerfil('PACIENTE');
  return banco.pacientes.find((item) => item.usuarioId === usuario.id) ?? regra('Paciente não encontrado.');
}

function estudanteLogado() {
  const usuario = exigirPerfil('ESTUDANTE');
  return banco.estudantes.find((item) => item.usuarioId === usuario.id) ?? regra('Estudante não encontrado.');
}

// ===== Mappers (iguais aos do backend) =====
function paraUsuarioDTO(usuarioId: number): UsuarioResponseDTO {
  const { senha: _senha, ...usuario } = banco.usuarios.find((item) => item.id === usuarioId)!;
  return usuario;
}

function paraPacienteDTO(paciente: PacienteTabela): PacienteResponseDTO {
  const { usuarioId, ...resto } = paciente;
  return { ...resto, usuario: paraUsuarioDTO(usuarioId) };
}

function paraEstudanteDTO(estudante: EstudanteTabela): EstudanteResponseDTO {
  const { usuarioId, areasIds, ...resto } = estudante;
  return {
    ...resto,
    usuario: paraUsuarioDTO(usuarioId),
    areasAtendimento: banco.areas.filter((area) => areasIds.includes(area.id)),
  };
}

function paraDisponibilidadeDTO(item: DisponibilidadeTabela): DisponibilidadeResponseDTO {
  const { estudanteId: _estudanteId, ...resto } = item;
  return resto;
}

function nomeDoUsuario(usuarioId: number) {
  return banco.usuarios.find((item) => item.id === usuarioId)?.nome ?? '';
}

function paraConsultaDTO(item: ConsultaTabela): ConsultaResponseDTO {
  const paciente = banco.pacientes.find((p) => p.id === item.pacienteId)!;
  const estudante = banco.estudantes.find((e) => e.id === item.estudanteId)!;
  return {
    id: item.id,
    pacienteId: item.pacienteId,
    pacienteNome: nomeDoUsuario(paciente.usuarioId),
    estudanteId: item.estudanteId,
    estudanteNome: nomeDoUsuario(estudante.usuarioId),
    dataHoraInicio: item.dataHoraInicio,
    dataHoraFim: item.dataHoraFim,
    duracaoMinutos: item.duracaoMinutos,
    modalidade: item.modalidade,
    status: item.status,
    observacao: item.observacao,
    linkReuniao: item.linkReuniao,
  };
}

function validarAreas(ids: number[], mensagemInexistente: string) {
  const encontradas = banco.areas.filter((area) => ids.includes(area.id));
  if (encontradas.length !== new Set(ids).size) regra(mensagemInexistente);
  if (encontradas.some((area) => !area.ativo)) regra('Uma ou mais áreas de atendimento estão inativas.');
}

// ===== Auth =====
export async function login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
  await espera();
  validar([
    [vazio(dto.email), 'email', 'O e-mail é obrigatório.'],
    [!EMAIL_VALIDO.test(dto.email ?? ''), 'email', 'Informe um e-mail válido.'],
    [vazio(dto.senha), 'senha', 'A senha é obrigatória.'],
  ]);
  const email = dto.email.trim().toLowerCase();
  const usuario = banco.usuarios.find((item) => item.email === email);
  if (!usuario || usuario.senha !== dto.senha) regra('E-mail ou senha inválidos.');
  if (!usuario.ativo) regra('Usuário inativo.');
  return {
    token: `${PREFIXO_TOKEN}${usuario.id}`,
    usuarioId: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  };
}

export async function me(): Promise<UsuarioResponseDTO> {
  await espera();
  return paraUsuarioDTO(usuarioLogado().id);
}

// ===== Cadastros públicos =====
function criarUsuario(dados: CadastroUsuarioDTO, perfil: PerfilUsuario) {
  const usuario: UsuarioTabela = {
    id: proximoId(banco.usuarios),
    nome: dados.nome.trim(),
    email: dados.email.trim().toLowerCase(),
    senha: dados.senha,
    perfil,
    ativo: true,
  };
  banco.usuarios.push(usuario);
  return usuario;
}

export async function cadastrarPaciente(dto: CadastroPacienteDTO): Promise<PacienteResponseDTO> {
  await espera();
  validarUsuario(dto.usuario);
  validar([
    [!!dto.cpf && !/^[0-9]{11}$/.test(dto.cpf), 'cpf', 'O CPF deve possuir exatamente 11 números.'],
    [!dataNoPassado(dto.dataNascimento), 'dataNascimento', 'A data de nascimento deve ser anterior à data atual.'],
    [(dto.telefone ?? '').length > 20, 'telefone', 'O telefone deve possuir no máximo 20 caracteres.'],
  ]);
  const email = dto.usuario.email.trim().toLowerCase();
  if (banco.usuarios.some((item) => item.email === email)) regra('E-mail já cadastrado.');
  if (dto.cpf && banco.pacientes.some((item) => item.cpf === dto.cpf)) regra('CPF já cadastrado.');

  const usuario = criarUsuario(dto.usuario, 'PACIENTE');
  const paciente: PacienteTabela = {
    id: proximoId(banco.pacientes),
    usuarioId: usuario.id,
    cpf: dto.cpf ?? null,
    dataNascimento: dto.dataNascimento ?? null,
    telefone: dto.telefone ?? null,
  };
  banco.pacientes.push(paciente);
  return copia(paraPacienteDTO(paciente));
}

export async function cadastrarEstudante(dto: CadastroEstudanteDTO): Promise<EstudanteResponseDTO> {
  await espera();
  validarUsuario(dto.usuario);
  validar([
    [vazio(dto.universidade), 'universidade', 'A universidade é obrigatória.'],
    [(dto.universidade ?? '').length > 200, 'universidade', 'A universidade deve possuir no máximo 200 caracteres.'],
    [vazio(dto.matricula), 'matricula', 'A matrícula é obrigatória.'],
    [(dto.matricula ?? '').length > 50, 'matricula', 'A matrícula deve possuir no máximo 50 caracteres.'],
    [dto.periodo == null, 'periodo', 'O período é obrigatório.'],
    [dto.periodo < 1, 'periodo', 'O período deve ser no mínimo 1.'],
    [dto.periodo > 12, 'periodo', 'O período deve ser no máximo 12.'],
    [dto.estagioSupervisionado == null, 'estagioSupervisionado', 'Informe se o estágio é supervisionado.'],
    [(dto.bio ?? '').length > 2000, 'bio', 'A bio deve possuir no máximo 2000 caracteres.'],
    [!dto.modalidade, 'modalidade', 'A modalidade de atendimento é obrigatória.'],
    [!dto.areasAtendimentoIds?.length, 'areasAtendimentoIds', 'Informe pelo menos uma área de atendimento.'],
    [dto.estagioSupervisionado !== true, 'estagioSupervisionadoValido', 'É necessário estar em estágio supervisionado.'],
  ]);

  const email = dto.usuario.email.trim().toLowerCase();
  const universidade = dto.universidade.trim();
  const matricula = dto.matricula.trim();
  if (banco.usuarios.some((item) => item.email === email)) regra('E-mail já cadastrado.');
  const matriculaRepetida = banco.estudantes.some(
    (item) => item.universidade.toLowerCase() === universidade.toLowerCase() && item.matricula === matricula
  );
  if (matriculaRepetida) regra('Esta matrícula já está cadastrada para essa universidade.');
  validarAreas(dto.areasAtendimentoIds, 'Uma ou mais áreas de atendimento informadas não existem.');

  const usuario = criarUsuario(dto.usuario, 'ESTUDANTE');
  const estudante: EstudanteTabela = {
    id: proximoId(banco.estudantes),
    usuarioId: usuario.id,
    universidade,
    matricula,
    periodo: dto.periodo,
    estagioSupervisionado: true,
    bio: dto.bio ?? null,
    fotoUrl: null,
    modalidade: dto.modalidade,
    statusAprovacao: 'PENDENTE',
    areasIds: [...new Set(dto.areasAtendimentoIds)],
  };
  banco.estudantes.push(estudante);
  return copia(paraEstudanteDTO(estudante));
}

// ===== Consentimentos (qualquer usuário logado) =====
export async function registrarConsentimento(dto: RegistroConsentimentoDTO): Promise<ConsentimentoResponseDTO> {
  await espera();
  const usuario = usuarioLogado();
  validar([
    [!dto.tipo, 'tipo', 'O tipo de consentimento é obrigatório.'],
    [vazio(dto.versao), 'versao', 'A versão é obrigatória.'],
    [dto.aceito == null, 'aceito', 'Informe se o consentimento foi aceito.'],
  ]);
  const versao = dto.versao.trim();
  const jaAceitou = banco.consentimentos.some(
    (item) => item.usuarioId === usuario.id && item.tipo === dto.tipo && item.versao === versao && item.aceito
  );
  if (dto.aceito && jaAceitou) regra('Esta versão do consentimento já foi aceita pelo usuário.');

  const id = proximoId(banco.consentimentos);
  banco.consentimentos.push({
    id,
    usuarioId: usuario.id,
    tipo: dto.tipo,
    versao,
    aceito: dto.aceito,
    registradoEm: paraDataHoraIso(new Date()),
  });
  // O backend não recarrega a entidade após salvar: registradoEm volta null aqui
  return { id, tipo: dto.tipo, versao, aceito: dto.aceito, registradoEm: null };
}

export async function listarConsentimentos(): Promise<ConsentimentoResponseDTO[]> {
  await espera();
  const usuario = usuarioLogado();
  return copia(
    banco.consentimentos
      .filter((item) => item.usuarioId === usuario.id)
      .map(({ usuarioId: _usuarioId, ...resto }) => resto)
  );
}

// ===== Áreas de atendimento =====
// ⚠️ DEPENDE DE MUDANÇA NO BACKEND: aqui imita a rota pública GET /api/areas-atendimento
// (sem login), que foi pedida ao backend. Hoje só existe /api/paciente/areas-atendimento.
export async function listarAreasAtivas(): Promise<AreaAtendimentoResponseDTO[]> {
  await espera();
  return copia(banco.areas.filter((area) => area.ativo));
}

// ===== Paciente =====

export async function listarEstudantesAprovados(areaId?: number): Promise<EstudanteResponseDTO[]> {
  await espera();
  exigirPerfil('PACIENTE');
  return copia(
    banco.estudantes
      .filter((item) => item.statusAprovacao === 'APROVADO')
      .filter((item) => areaId == null || item.areasIds.includes(areaId))
      .map(paraEstudanteDTO)
  );
}

export async function listarDisponibilidadesPublicas(estudanteId: number): Promise<DisponibilidadeResponseDTO[]> {
  await espera();
  exigirPerfil('PACIENTE');
  const estudante = banco.estudantes.find((item) => item.id === estudanteId) ?? regra('Estudante não encontrado.');
  if (estudante.statusAprovacao !== 'APROVADO') regra('Este estudante não está disponível para atendimentos.');
  return copia(
    banco.disponibilidades
      .filter((item) => item.estudanteId === estudanteId && item.ativo)
      .map(paraDisponibilidadeDTO)
  );
}

// Dia da semana e minutos do dia no fuso America/Recife (UTC-3, sem horário de verão)
function noFusoDoBackend(dataHora: Date) {
  const local = new Date(dataHora.getTime() - 3 * 60 * 60000);
  const dia = local.getUTCDay();
  return {
    diaSemana: dia === 0 ? 7 : dia,
    minutos: local.getUTCHours() * 60 + local.getUTCMinutes(),
  };
}

function haConflito(lista: ConsultaTabela[], inicio: Date, fim: Date) {
  return lista.some(
    (item) =>
      item.status !== 'CANCELADA' &&
      new Date(item.dataHoraInicio).getTime() < fim.getTime() &&
      new Date(item.dataHoraFim).getTime() > inicio.getTime()
  );
}

export async function agendarConsulta(dto: AgendamentoConsultaDTO): Promise<ConsultaResponseDTO> {
  await espera();
  const paciente = pacienteLogado();
  const inicio = new Date(dto.dataHoraInicio);
  validar([
    [dto.estudanteId == null, 'estudanteId', 'O estudante é obrigatório.'],
    [dto.estudanteId <= 0, 'estudanteId', 'O ID do estudante deve ser válido.'],
    [!dto.dataHoraInicio, 'dataHoraInicio', 'A data e o horário são obrigatórios.'],
    [inicio.getTime() <= Date.now(), 'dataHoraInicio', 'A consulta deve ser agendada para uma data futura.'],
    [!dto.modalidade, 'modalidade', 'A modalidade é obrigatória.'],
    [(dto.observacao ?? '').length > 1000, 'observacao', 'A observação deve possuir no máximo 1000 caracteres.'],
    [(dto.modalidade as string) === 'AMBOS', 'modalidadeValida', 'A modalidade da consulta deve ser ONLINE ou PRESENCIAL.'],
  ]);

  const estudante = banco.estudantes.find((item) => item.id === dto.estudanteId) ?? regra('Estudante não encontrado.');
  if (estudante.statusAprovacao !== 'APROVADO') {
    regra('Este estudante ainda não está disponível para atendimentos.');
  }

  const fim = new Date(inicio.getTime() + DURACAO_CONSULTA_MINUTOS * 60000);
  const local = noFusoDoBackend(inicio);
  const minutosFim = local.minutos + DURACAO_CONSULTA_MINUTOS;
  const disponivel = banco.disponibilidades.some(
    (item) =>
      item.estudanteId === estudante.id &&
      item.ativo &&
      item.diaSemana === local.diaSemana &&
      (item.modalidade === dto.modalidade || item.modalidade === 'AMBOS') &&
      local.minutos >= horaEmMinutos(item.horaInicio) &&
      minutosFim <= horaEmMinutos(item.horaFim)
  );
  if (!disponivel) {
    regra('O estudante não possui disponibilidade para o horário e modalidade escolhidos.');
  }
  if (haConflito(banco.consultas.filter((item) => item.estudanteId === estudante.id), inicio, fim)) {
    regra('O estudante já possui uma consulta neste horário.');
  }
  if (haConflito(banco.consultas.filter((item) => item.pacienteId === paciente.id), inicio, fim)) {
    regra('Você já possui uma consulta neste horário.');
  }

  const nova: ConsultaTabela = {
    id: proximoId(banco.consultas),
    pacienteId: paciente.id,
    estudanteId: estudante.id,
    dataHoraInicio: paraDataHoraIso(inicio),
    dataHoraFim: paraDataHoraIso(fim),
    duracaoMinutos: DURACAO_CONSULTA_MINUTOS,
    modalidade: dto.modalidade,
    status: 'CONFIRMADA', // o backend já confirma direto
    observacao: dto.observacao ?? null,
    linkReuniao: null,
  };
  banco.consultas.push(nova);
  return copia(paraConsultaDTO(nova));
}

export async function listarConsultasDoPaciente(): Promise<ConsultaResponseDTO[]> {
  await espera();
  const paciente = pacienteLogado();
  return copia(banco.consultas.filter((item) => item.pacienteId === paciente.id).map(paraConsultaDTO));
}

function buscarConsulta(id: number) {
  return banco.consultas.find((item) => item.id === id) ?? regra('Consulta não encontrada.');
}

export async function cancelarConsulta(id: number): Promise<ConsultaResponseDTO> {
  await espera();
  const paciente = pacienteLogado();
  const consulta = buscarConsulta(id);
  if (consulta.pacienteId !== paciente.id) regra('Esta consulta não pertence ao paciente autenticado.');
  if (consulta.status !== 'PENDENTE' && consulta.status !== 'CONFIRMADA') {
    regra('Esta consulta não pode mais ser cancelada.');
  }
  if (new Date(consulta.dataHoraInicio).getTime() <= Date.now()) {
    regra('Não é possível cancelar uma consulta que já iniciou ou ocorreu.');
  }
  consulta.status = 'CANCELADA';
  return copia(paraConsultaDTO(consulta));
}

export async function buscarPerfilPaciente(): Promise<PacienteResponseDTO> {
  await espera();
  return copia(paraPacienteDTO(pacienteLogado()));
}

export async function atualizarPerfilPaciente(dto: AtualizacaoPacienteDTO): Promise<PacienteResponseDTO> {
  await espera();
  const paciente = pacienteLogado();
  validar([
    [vazio(dto.nome), 'nome', 'O nome é obrigatório.'],
    [(dto.nome ?? '').length < 2 || (dto.nome ?? '').length > 150, 'nome', 'O nome deve possuir entre 2 e 150 caracteres.'],
    [!dataNoPassado(dto.dataNascimento), 'dataNascimento', 'A data de nascimento deve estar no passado.'],
    [(dto.telefone ?? '').length > 20, 'telefone', 'O telefone deve possuir no máximo 20 caracteres.'],
  ]);
  banco.usuarios.find((item) => item.id === paciente.usuarioId)!.nome = dto.nome.trim();
  paciente.dataNascimento = dto.dataNascimento ?? null;
  paciente.telefone = dto.telefone ?? null;
  return copia(paraPacienteDTO(paciente));
}

// ===== Estudante =====
export async function buscarPerfilEstudante(): Promise<EstudanteResponseDTO> {
  await espera();
  return copia(paraEstudanteDTO(estudanteLogado()));
}

export async function atualizarPerfilEstudante(dto: AtualizacaoEstudanteDTO): Promise<EstudanteResponseDTO> {
  await espera();
  const estudante = estudanteLogado();
  validar([
    [vazio(dto.nome), 'nome', 'O nome é obrigatório.'],
    [(dto.nome ?? '').length < 2 || (dto.nome ?? '').length > 150, 'nome', 'O nome deve possuir entre 2 e 150 caracteres.'],
    [dto.periodo == null, 'periodo', 'O período é obrigatório.'],
    [dto.periodo < 1, 'periodo', 'O período deve ser no mínimo 1.'],
    [dto.periodo > 12, 'periodo', 'O período deve ser no máximo 12.'],
    [(dto.bio ?? '').length > 2000, 'bio', 'A bio deve possuir no máximo 2000 caracteres.'],
    [!dto.modalidade, 'modalidade', 'A modalidade é obrigatória.'],
    [!dto.areasAtendimentoIds?.length, 'areasAtendimentoIds', 'Informe pelo menos uma área de atendimento.'],
  ]);
  validarAreas(dto.areasAtendimentoIds, 'Uma ou mais áreas de atendimento não foram encontradas.');

  banco.usuarios.find((item) => item.id === estudante.usuarioId)!.nome = dto.nome.trim();
  estudante.periodo = dto.periodo;
  estudante.bio = dto.bio ?? null;
  estudante.modalidade = dto.modalidade;
  estudante.areasIds = [...new Set(dto.areasAtendimentoIds)];
  return copia(paraEstudanteDTO(estudante));
}

export async function listarConsultasDoEstudante(): Promise<ConsultaResponseDTO[]> {
  await espera();
  const estudante = estudanteLogado();
  return copia(banco.consultas.filter((item) => item.estudanteId === estudante.id).map(paraConsultaDTO));
}

function consultaDoEstudante(id: number) {
  const estudante = estudanteLogado();
  const consulta = buscarConsulta(id);
  if (consulta.estudanteId !== estudante.id) regra('Esta consulta não pertence ao estudante autenticado.');
  return consulta;
}

const jaComecou = (consulta: ConsultaTabela) => new Date(consulta.dataHoraInicio).getTime() <= Date.now();

export async function iniciarConsulta(id: number): Promise<ConsultaResponseDTO> {
  await espera();
  const consulta = consultaDoEstudante(id);
  if (consulta.status !== 'CONFIRMADA') regra('Somente consultas confirmadas podem ser iniciadas.');
  if (!jaComecou(consulta)) regra('A consulta ainda não pode ser iniciada antes do horário agendado.');
  consulta.status = 'EM_ANDAMENTO';
  return copia(paraConsultaDTO(consulta));
}

export async function concluirConsulta(id: number): Promise<ConsultaResponseDTO> {
  await espera();
  const consulta = consultaDoEstudante(id);
  if (consulta.status !== 'EM_ANDAMENTO') regra('Somente consultas em andamento podem ser concluídas.');
  consulta.status = 'CONCLUIDA';
  return copia(paraConsultaDTO(consulta));
}

export async function marcarNaoCompareceu(id: number): Promise<ConsultaResponseDTO> {
  await espera();
  const consulta = consultaDoEstudante(id);
  if (consulta.status !== 'CONFIRMADA') {
    regra('Somente consultas confirmadas podem ser marcadas como não compareceu.');
  }
  if (!jaComecou(consulta)) regra('Não é possível marcar ausência antes do horário da consulta.');
  consulta.status = 'NAO_COMPARECEU';
  return copia(paraConsultaDTO(consulta));
}

export async function listarMinhasDisponibilidades(): Promise<DisponibilidadeResponseDTO[]> {
  await espera();
  const estudante = estudanteLogado();
  return copia(
    banco.disponibilidades.filter((item) => item.estudanteId === estudante.id).map(paraDisponibilidadeDTO)
  );
}

export async function cadastrarDisponibilidade(dto: CadastroDisponibilidadeDTO): Promise<DisponibilidadeResponseDTO> {
  await espera();
  const estudante = estudanteLogado();
  validar([
    [dto.diaSemana == null, 'diaSemana', 'O dia da semana é obrigatório.'],
    [dto.diaSemana < 1 || dto.diaSemana > 7, 'diaSemana', 'O dia da semana deve estar entre 1 e 7.'],
    [!dto.horaInicio, 'horaInicio', 'O horário inicial é obrigatório.'],
    [!dto.horaFim, 'horaFim', 'O horário final é obrigatório.'],
    [!dto.modalidade, 'modalidade', 'A modalidade é obrigatória.'],
    [
      !!dto.horaInicio && !!dto.horaFim && horaEmMinutos(dto.horaFim) <= horaEmMinutos(dto.horaInicio),
      'horarioValido',
      'O horário final deve ser posterior ao horário inicial.',
    ],
    [(dto.modalidade as string) === 'AMBOS', 'modalidadeValida', 'A modalidade deve ser ONLINE ou PRESENCIAL.'],
  ]);
  if (estudante.statusAprovacao !== 'APROVADO') {
    regra('Somente estudantes aprovados podem cadastrar disponibilidades.');
  }
  if (estudante.modalidade !== 'AMBOS' && estudante.modalidade !== dto.modalidade) {
    regra('A modalidade informada não está disponível para este estudante.');
  }

  // LocalTime volta sempre com segundos
  const comSegundos = (hora: string) => (hora.length === 5 ? `${hora}:00` : hora);
  const nova: DisponibilidadeTabela = {
    id: proximoId(banco.disponibilidades),
    estudanteId: estudante.id,
    diaSemana: dto.diaSemana,
    horaInicio: comSegundos(dto.horaInicio),
    horaFim: comSegundos(dto.horaFim),
    modalidade: dto.modalidade,
    ativo: true,
  };
  banco.disponibilidades.push(nova);
  return copia(paraDisponibilidadeDTO(nova));
}

export async function desativarDisponibilidade(id: number): Promise<DisponibilidadeResponseDTO> {
  await espera();
  const usuario = exigirPerfil('ESTUDANTE');
  const item = banco.disponibilidades.find((d) => d.id === id) ?? regra('Disponibilidade não encontrada.');
  const dono = banco.estudantes.find((e) => e.id === item.estudanteId)!;
  if (dono.usuarioId !== usuario.id) regra('Esta disponibilidade não pertence ao estudante autenticado.');
  item.ativo = false;
  return copia(paraDisponibilidadeDTO(item));
}
