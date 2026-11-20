import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import * as servicoPaciente from '@/services/paciente';
import { mensagemDeErro } from '@/services/api';
import type { EstudanteResponseDTO } from '@/types/api';

// Estudantes aprovados, vistos pelo paciente (GET /api/paciente/estudantes).
// A lista é carregada inteira e filtrada no app (o backend também aceita ?areaId=).
type EstudantesContextType = {
  estudantes: EstudanteResponseDTO[];
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
  buscarPorId: (id: number) => EstudanteResponseDTO | undefined;
};

const EstudantesContext = createContext<EstudantesContextType | null>(null);

export function EstudantesProvider({ children }: { children: ReactNode }) {
  const [estudantes, setEstudantes] = useState<EstudanteResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const lista = await servicoPaciente.listarEstudantes();
      setEstudantes(lista.sort((a, b) => a.usuario.nome.localeCompare(b.usuario.nome)));
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  function buscarPorId(id: number) {
    return estudantes.find((estudante) => estudante.id === id);
  }

  return (
    <EstudantesContext.Provider value={{ estudantes, carregando, erro, recarregar, buscarPorId }}>
      {children}
    </EstudantesContext.Provider>
  );
}

export function useEstudantes() {
  const contexto = useContext(EstudantesContext);
  if (!contexto) {
    throw new Error('useEstudantes precisa estar dentro do EstudantesProvider');
  }
  return contexto;
}
