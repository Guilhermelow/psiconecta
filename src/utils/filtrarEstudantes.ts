import { Estudante } from '@/mocks/estudantes';

// Tira acentos e deixa minúsculo: "Relações" → "relacoes"
export function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

type Filtros = {
  busca?: string;
  area?: string;
  disponibilidade?: string;
  periodo?: string;
};

export function filtrarEstudantes(lista: Estudante[], filtros: Filtros) {
  const termo = normalizar(filtros.busca ?? '');

  return lista.filter((estudante) => {
    // Busca por nome, abordagem ou tema
    const passaBusca =
      !termo ||
      [estudante.nome, estudante.abordagem, ...estudante.focos].some((texto) =>
        normalizar(texto).includes(termo)
      );

    // Chip de área
    const passaArea =
      !filtros.area || filtros.area === 'Todos' || estudante.focos.includes(filtros.area);

    // Disponibilidade ("Esta semana" inclui "Hoje")
    let passaDisponibilidade = true;
    if (filtros.disponibilidade === 'Hoje') {
      passaDisponibilidade = estudante.disponibilidade === 'Hoje';
    } else if (filtros.disponibilidade === 'Esta semana') {
      passaDisponibilidade = estudante.disponibilidade !== 'Próxima semana';
    }

    // Período ("7º" vira o número 7)
    const numeroPeriodo = parseInt(estudante.periodo, 10);
    let passaPeriodo = true;
    if (filtros.periodo === '5º ao 6º') {
      passaPeriodo = numeroPeriodo <= 6;
    } else if (filtros.periodo === '7º ao 10º') {
      passaPeriodo = numeroPeriodo >= 7;
    }

    return passaBusca && passaArea && passaDisponibilidade && passaPeriodo;
  });
}