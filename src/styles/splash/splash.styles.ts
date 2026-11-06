import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
    paddingHorizontal: 24,
  },

  // Selo do topo "Clínica Escola Segura"
  badgeTopo: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.branco,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeTopoTexto: {
    fontSize: 12,
    color: colors.verde,
  },
  negrito: {
    fontWeight: '700',
  },

  // Parte central
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.titulo,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: colors.texto,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 260,
    marginBottom: 24,
  },

  // Selo "Ambiente Acadêmico Monitorado"
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primariaClara,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 32,
  },
  seloPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.verde,
  },
  seloTexto: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.titulo,
  },

  // Rodapé
  rodape: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textoClaro,
    marginBottom: 16,
  },
});