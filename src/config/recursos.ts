// Recursos de tela escondidos porque o backend ainda não oferece suporte.
// O código continua no projeto: para reativar, troque para true
// quando o backend tiver o que cada um precisa.
export const RECURSOS = {
  // Envio do comprovante de matrícula no cadastro do estudante.
  // Falta no backend: endpoint de upload de arquivo.
  comprovanteMatricula: false,

  // Nome do supervisor (docente) do estudante.
  // Falta no backend: campo/entidade de supervisor.
  supervisor: false,
};

// Usado só quando RECURSOS.supervisor = true. Troque pelo dado do backend quando existir.
export const SUPERVISOR_EXEMPLO = 'Profª Dra. Helena Vasconcelos';
