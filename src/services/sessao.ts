// Guarda a sessão no aparelho para o usuário não precisar entrar toda vez.
// Celular: expo-secure-store (armazenamento criptografado do sistema).
// Navegador: localStorage (o secure-store não funciona na web).
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { LoginResponseDTO } from '@/types/api';

const CHAVE = 'psiconecta.sessao';

// O que fica salvo: a resposta do login (token + dados básicos do usuário)
export type SessaoSalva = LoginResponseDTO;

export async function salvarSessao(sessao: SessaoSalva) {
  const texto = JSON.stringify(sessao);
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(CHAVE, texto);
    } catch {
      // navegador sem armazenamento (ex.: aba anônima): segue só em memória
    }
    return;
  }
  await SecureStore.setItemAsync(CHAVE, texto);
}

export async function carregarSessao(): Promise<SessaoSalva | null> {
  try {
    const texto =
      Platform.OS === 'web' ? localStorage.getItem(CHAVE) : await SecureStore.getItemAsync(CHAVE);
    return texto ? (JSON.parse(texto) as SessaoSalva) : null;
  } catch {
    return null;
  }
}

export async function apagarSessao() {
  try {
    if (Platform.OS === 'web') localStorage.removeItem(CHAVE);
    else await SecureStore.deleteItemAsync(CHAVE);
  } catch {
    // nada a fazer
  }
}
