import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '@/components/AppButton';
import RadioOption from '@/components/RadioOption';
import type { Atendimento, Solicitacao } from '@/contexts/AtendimentosContext';
import { DURACAO_MINUTOS } from '@/utils/consultas';
import { dataEHora, dataLonga, somarMinutos, tempoRelativo } from '@/utils/datas';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/components/requestCard.styles';
import { colors } from '@/styles/colors';

const MOTIVOS_RECUSA = [
  { icone: 'time-outline', texto: 'Conflito de horário' },
  { icone: 'school-outline', texto: 'Demanda fora da minha formação atual' },
  { icone: 'people-outline', texto: 'Limite de pacientes atingido' },
  { icone: 'ellipsis-horizontal', texto: 'Outro motivo' },
] as const;

type Props = {
  solicitacao: Solicitacao;
  conflito?: Atendimento; // atendimento que já ocupa esse horário
  onAceitar: () => void;
  onRecusar: (motivo: string) => void;
};

export default function RequestCard({ solicitacao, conflito, onAceitar, onRecusar }: Props) {
  const [recusando, setRecusando] = useState(false);
  const [motivo, setMotivo] = useState<string | null>(null);

  const inicio = dataEHora(solicitacao.data, solicitacao.hora);
  const recebida = tempoRelativo(new Date(solicitacao.recebidaEm)).toLowerCase();

  function voltar() {
    setRecusando(false);
    setMotivo(null);
  }

  return (
    <View style={styles.card}>
      {/* Paciente */}
      <View style={styles.topo}>
        <Image
          source={
            solicitacao.pacienteFoto
              ? { uri: solicitacao.pacienteFoto }
              : require('../../assets/avatar-padrao.png')
          }
          style={styles.foto}
        />
        <View style={styles.textos}>
          <Text style={styles.nome}>{solicitacao.pacienteNome}</Text>
          <Text style={styles.sub}>Primeira consulta • Recebida {recebida}</Text>
        </View>
        <View style={styles.online}>
          <Ionicons name="videocam-outline" size={12} color={colors.primaria} />
          <Text style={styles.onlineTexto}>Online</Text>
        </View>
      </View>

      {/* Data e hora */}
      <View style={styles.horario}>
        <View style={styles.horarioLinha}>
          <Ionicons name="calendar-outline" size={16} color={colors.primaria} />
          <Text style={styles.horarioTexto}>{dataLonga(inicio)}</Text>
        </View>
        <View style={styles.horarioLinha}>
          <Ionicons name="time-outline" size={16} color={colors.primaria} />
          <Text style={styles.horarioTexto}>
            {solicitacao.hora} – {somarMinutos(solicitacao.hora, DURACAO_MINUTOS)} (
            {DURACAO_MINUTOS} min)
          </Text>
        </View>
      </View>

      {/* Motivo da busca */}
      <View>
        <Text style={styles.rotulo}>Motivo da busca</Text>
        <Text style={styles.queixa}>“{solicitacao.queixa}”</Text>
      </View>

      {/* Aviso de conflito */}
      {conflito && (
        <View style={styles.conflito}>
          <Ionicons name="warning-outline" size={18} color={colors.erro} />
          <Text style={styles.conflitoTexto}>
            Este horário conflita com seu atendimento com{' '}
            {primeiroNome(conflito.pacienteNome)} às {conflito.hora}.
          </Text>
        </View>
      )}

      {/* Ações */}
      {recusando ? (
        <View style={styles.recusa}>
          <Text style={styles.recusaTitulo}>Por que você vai recusar?</Text>
          <Text style={styles.recusaTexto}>
            O paciente volta para a triagem e será encaminhado a outro estudante.
          </Text>

          {MOTIVOS_RECUSA.map((item) => (
            <RadioOption
              key={item.texto}
              icone={item.icone}
              texto={item.texto}
              selecionado={motivo === item.texto}
              onPress={() => setMotivo(item.texto)}
            />
          ))}

          <View style={styles.botoes}>
            <View style={styles.botao}>
              <AppButton titulo="Voltar" variante="secundario" onPress={voltar} />
            </View>
            <View style={styles.botao}>
              <AppButton
                titulo="Recusar"
                variante="perigo"
                desabilitado={!motivo}
                onPress={() => motivo && onRecusar(motivo)}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.botoes}>
          <View style={styles.botao}>
            <AppButton
              titulo="Recusar"
              variante="secundario"
              icone="close"
              onPress={() => setRecusando(true)}
            />
          </View>
          <View style={styles.botao}>
            <AppButton
              titulo="Aceitar"
              icone="checkmark"
              desabilitado={!!conflito}
              onPress={onAceitar}
            />
          </View>
        </View>
      )}
    </View>
  );
}