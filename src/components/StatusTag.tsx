import { View, Text } from 'react-native';
import type { StatusConsulta } from '@/types/api';
import { CORES_STATUS_CONSULTA, ROTULO_STATUS_CONSULTA } from '@/utils/rotulos';
import { styles } from '@/styles/components/statusTag.styles';

// Etiqueta com o status da consulta vindo do backend
export default function StatusTag({ status }: { status: StatusConsulta }) {
  const { cor, fundo } = CORES_STATUS_CONSULTA[status];
  return (
    <View style={[styles.tag, { backgroundColor: fundo }]}>
      <View style={[styles.ponto, { backgroundColor: cor }]} />
      <Text style={[styles.texto, { color: cor }]}>{ROTULO_STATUS_CONSULTA[status]}</Text>
    </View>
  );
}
