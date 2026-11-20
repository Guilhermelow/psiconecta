// Validações dos formulários. Seguem os limites dos DTOs do backend;
// algumas regras do app são mais rígidas (nome completo, senha com número).
import { dataBrParaIso, somenteNumeros } from '@/utils/conversoes';

export function validarNome(nome: string) {
  const limpo = nome.trim();
  if (limpo.split(/\s+/).length < 2) return 'Digite seu nome completo.';
  if (limpo.length > 150) return 'O nome deve ter no máximo 150 caracteres.';
  return undefined;
}

export function validarEmail(email: string) {
  const limpo = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpo)) return 'Digite um e-mail válido.';
  if (limpo.length > 150) return 'O e-mail deve ter no máximo 150 caracteres.';
  return undefined;
}

export function validarSenha(senha: string) {
  if (senha.length < 8 || !/[\d\W_]/.test(senha)) {
    return 'Mínimo 8 caracteres e 1 número ou caractere especial.';
  }
  if (senha.length > 72) return 'A senha deve ter no máximo 72 caracteres.';
  return undefined;
}

export function validarConfirmacao(senha: string, confirmar: string) {
  return confirmar && confirmar === senha ? undefined : 'As senhas não conferem.';
}

// CPF é opcional no backend; se preenchido, precisa ter 11 números
export function validarCPFOpcional(cpf: string) {
  const numeros = somenteNumeros(cpf);
  if (!numeros) return undefined;
  return numeros.length === 11 ? undefined : 'O CPF precisa ter 11 números.';
}

// Data de nascimento é opcional; se preenchida, precisa ser válida e no passado
export function validarNascimentoOpcional(data: string) {
  if (!data) return undefined;
  const iso = dataBrParaIso(data);
  if (!iso) return 'Use uma data válida no formato DD/MM/AAAA.';
  const hoje = new Date();
  const [ano, mes, dia] = iso.split('-').map(Number);
  if (new Date(ano, mes - 1, dia) >= new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) {
    return 'A data de nascimento deve ser anterior à data atual.';
  }
  return undefined;
}

// Telefone é opcional; o backend aceita até 20 caracteres
export function validarTelefoneOpcional(telefone: string) {
  const numeros = somenteNumeros(telefone);
  if (!numeros) return undefined;
  return numeros.length >= 10 && telefone.length <= 20 ? undefined : 'Digite um telefone com DDD.';
}
