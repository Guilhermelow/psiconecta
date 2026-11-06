export function validarNome(nome: string) {
  return nome.trim().split(/\s+/).length >= 2 ? undefined : 'Digite seu nome completo.';
}

export function validarCPF(cpf: string) {
  return cpf.replace(/\D/g, '').length === 11 ? undefined : 'O CPF precisa ter 11 números.';
}

export function validarData(data: string) {
  return data.length === 10 ? undefined : 'Use o formato DD/MM/AAAA.';
}

export function validarEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email) ? undefined : 'Digite um e-mail válido.';
}

export function validarSenha(senha: string) {
  return senha.length >= 8 && /[\d\W_]/.test(senha)
    ? undefined
    : 'Mínimo 8 caracteres e 1 número ou caractere especial.';
}

export function validarConfirmacao(senha: string, confirmar: string) {
  return confirmar && confirmar === senha ? undefined : 'As senhas não conferem.';
}