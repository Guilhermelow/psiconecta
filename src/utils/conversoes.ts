// Conversões entre o que a tela mostra e o formato que o backend espera
import type { DataHoraISO, DataISO, HoraISO } from '@/types/api';

// "123.456.789-01" → "12345678901"
export function somenteNumeros(valor: string) {
  return valor.replace(/\D/g, '');
}

// "20/03/1995" → "1995-03-20" (null se a data for inválida)
export function dataBrParaIso(valor: string): DataISO | null {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor);
  if (!partes) return null;
  const [, dia, mes, ano] = partes;
  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  const valida =
    data.getFullYear() === Number(ano) &&
    data.getMonth() === Number(mes) - 1 &&
    data.getDate() === Number(dia);
  return valida ? `${ano}-${mes}-${dia}` : null;
}

// "1995-03-20" → "20/03/1995"
export function dataIsoParaBr(valor: DataISO | null | undefined) {
  if (!valor) return '';
  const [ano, mes, dia] = valor.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Date → "2026-11-10T14:00:00-03:00" (com o fuso do aparelho)
export function paraDataHoraIso(data: Date): DataHoraISO {
  const doisDigitos = (n: number) => String(Math.abs(n)).padStart(2, '0');
  const deslocamento = -data.getTimezoneOffset();
  const sinal = deslocamento >= 0 ? '+' : '-';
  return (
    `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}` +
    `T${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}:${doisDigitos(data.getSeconds())}` +
    `${sinal}${doisDigitos(Math.trunc(deslocamento / 60))}:${doisDigitos(deslocamento % 60)}`
  );
}

// "08:00:00" → "08:00"
export function horaCurta(hora: HoraISO) {
  return hora.slice(0, 5);
}

// "08:30:00" → 510 (minutos desde 00:00)
export function horaEmMinutos(hora: HoraISO) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

