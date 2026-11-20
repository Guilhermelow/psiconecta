import type { EstudanteResponseDTO, ModalidadeSessao } from '@/types/api';

// Tira acentos e deixa minúsculo: "Relações" → "relacoes"
export function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export const FILTROS_MODALIDADE = ['Qualquer', 'Online', 'Presencial'] as const;
export const FILTROS_PERIODO = ['Todos', '5º ao 6º', '7º ao 12º'] as const;

type Filtros = {
  busca?: string;
  areaId?: number | null; // mesmo filtro do GET /api/paciente/estudantes?areaId=
  modalidade?: string;
  periodo?: string;
};

const MODALIDADE_DO_FILTRO: Record<string, ModalidadeSessao> = {
  Online: 'ONLINE',
  Presencial: 'PRESENCIAL',
};

// Filtra a lista de estudantes aprovados já carregada da API
export function filtrarEstudantes(lista: EstudanteResponseDTO[], filtros: Filtros) {
  const termo = normalizar(filtros.busca ?? '');

  return lista.filter((estudante) => {
    // Busca por nome, universidade ou área
    const passaBusca =
      !termo ||
      [estudante.usuario.nome, estudante.universidade, ...estudante.areasAtendimento.map((a) => a.nome)].some(
        (texto) => normalizar(texto).includes(termo)
      );

    const passaArea =
      filtros.areaId == null || estudante.areasAtendimento.some((area) => area.id === filtros.areaId);

    // Quem atende AMBOS passa nos dois filtros
    const modalidade = filtros.modalidade ? MODALIDADE_DO_FILTRO[filtros.modalidade] : undefined;
    const passaModalidade =
      !modalidade || estudante.modalidade === modalidade || estudante.modalidade === 'AMBOS';

    let passaPeriodo = true;
    if (filtros.periodo === '5º ao 6º') passaPeriodo = estudante.periodo <= 6;
    else if (filtros.periodo === '7º ao 12º') passaPeriodo = estudante.periodo >= 7;

    return passaBusca && passaArea && passaModalidade && passaPeriodo;
  });
}
