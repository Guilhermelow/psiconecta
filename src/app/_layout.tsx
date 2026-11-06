import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { CadastroProvider } from '@/contexts/CadastroContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CadastroProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CadastroProvider>
    </AuthProvider>
  );
}