// Valores vindos do .env (o Expo só lê variáveis que começam com EXPO_PUBLIC_)
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';

export const USAR_DADOS_EXEMPLO = process.env.EXPO_PUBLIC_USAR_DADOS_EXEMPLO === 'true';
