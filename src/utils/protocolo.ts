// Provisório: depois o protocolo virá do servidor
export function gerarProtocolo() {
  const ano = new Date().getFullYear();
  const numero = Math.floor(10000 + Math.random() * 90000);
  return `PSI-${ano}-${numero}`;
}