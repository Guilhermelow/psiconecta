import { useCallback, useEffect, useState } from 'react';
import { listarDisponibilidadesDoEstudante } from '@/services/paciente';
import { mensagemDeErro } from '@/services/api';
import { useConsultas } from '@/contexts/ConsultasContext';
import type { DisponibilidadeResponseDTO } from '@/types/api';
import { gerarHorariosLivres } from '@/utils/horarios';

// Horários que o paciente pode escolher com um estudante, nos próximos 14 dias
// (GET /api/paciente/estudantes/{id}/disponibilidades + as consultas do próprio paciente)
export function useHorariosLivres(estudanteId: number) {
  const { consultas } = useConsultas();
  const [disponibilidades, setDisponibilidades] = useState<DisponibilidadeResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    if (!Number.isFinite(estudanteId)) return;
    setCarregando(true);
    setErro(null);
    try {
      setDisponibilidades(await listarDisponibilidadesDoEstudante(estudanteId));
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }, [estudanteId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return {
    dias: gerarHorariosLivres(disponibilidades, consultas),
    carregando,
    erro,
    tentarDeNovo: carregar,
  };
}
