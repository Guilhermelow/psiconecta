// Deixa só os números e formata como 000.000.000-00
export function mascaraCPF(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);
  return numeros
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Deixa só os números e formata como DD/MM/AAAA
export function mascaraData(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 8);
  return numeros
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
}
// "123.456.789-01" → "***.456.789-**" (não mostra o CPF inteiro na tela)
export function ocultarCPF(cpf: string) {
  return `***.${cpf.slice(4, 11)}-**`;
}