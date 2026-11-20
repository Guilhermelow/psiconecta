import { useCallback, useEffect, useState } from 'react';
import { listarAreasAtendimento } from '@/services/areas';
import { mensagemDeErro } from '@/services/api';
import type { AreaAtendimentoResponseDTO } from '@/types/api';

// Carrega as áreas de atendimento ativas (rota pública, ver services/areas.ts)
export function useAreasAtendimento() {
  const [areas, setAreas] = useState<AreaAtendimentoResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setAreas(await listarAreasAtendimento());
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { areas, carregando, erro, tentarDeNovo: carregar };
}
