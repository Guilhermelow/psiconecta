// "Lucas Ferreira dos Santos" → "Lucas"
export function primeiroNome(nome?: string) {
  return nome?.trim().split(/\s+/)[0] ?? '';
}

// "Lucas Ferreira dos Santos" → "Lucas Santos"
export function nomeCurto(nome?: string) {
  const partes = nome?.trim().split(/\s+/) ?? [];
  if (partes.length <= 1) return partes[0] ?? '';
  return `${partes[0]} ${partes[partes.length - 1]}`;
}

// "Lucas Ferreira dos Santos" → "LS"
export function iniciais(nome?: string) {
  const partes = nome?.trim().split(/\s+/) ?? [];
  const primeira = partes[0]?.[0] ?? '';
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}