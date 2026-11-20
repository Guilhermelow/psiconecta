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

// Deixa só os números e formata como (81) 90000-0000 ou (81) 3000-0000
export function mascaraTelefone(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);
  if (numeros.length <= 2) return numeros.replace(/(\d{1,2})/, '($1');
  const meio = numeros.length === 11 ? 5 : 4;
  return numeros
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(new RegExp(`(\\) \\d{${meio}})(\\d)`), '$1-$2');
}

// "12345678901" (como vem do backend) → "***.456.789-**"
export function ocultarCPF(cpf: string) {
  const numeros = cpf.replace(/\D/g, '');
  return `***.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-**`;
}
