import { useState } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import { useConsultas } from '@/contexts/ConsultasContext';
import { useEstudantes } from '@/contexts/EstudantesContext';
import { mensagemDeErro } from '@/services/api';
import { podeCancelarConsulta, inicioDaConsulta, horaDe } from '@/utils/consultas';
import { dataLonga, ehHoje } from '@/utils/datas';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';
import { styles } from '@/styles/paciente/consulta/cancelar.styles';
import { colors } from '@/styles/colors';

// PUT /api/paciente/consultas/{id}/cancelar — o backend não recebe motivo
export default function CancelarConsulta() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { consultas, cancelar } = useConsultas();
  const { buscarPorId } = useEstudantes();
  const [enviando, setEnviando] = useState(false);

  const consulta = consultas.find((item) => item.id === Number(id));

  // Mesma regra do backend: PENDENTE ou CONFIRMADA e antes do horário de início
  if (!consulta || !podeCancelarConsulta(consulta)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <AppHeader titulo="Cancelar consulta" />
          <Text style={styles.texto}>Esta consulta não pode mais ser cancelada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const consultaId = consulta.id;
  const estudante = buscarPorId(consulta.estudanteId);
  const inicio = inicioDaConsulta(consulta);
  const textoData = ehHoje(inicio)
    ? `Hoje às ${horaDe(inicio)}`
    : `${dataLonga(inicio)} às ${horaDe(inicio)}`;

  async function confirmar() {
    setEnviando(true);
    try {
      await cancelar(consultaId);
      // Fecha as telas da consulta e abre a confirmação do cancelamento
      if (router.canDismiss()) router.dismissAll();
      router.push({ pathname: '/paciente/consulta/cancelada', params: { id: String(consultaId) } });
    } catch (erro) {
      Alert.alert('Não foi possível cancelar', mensagemDeErro(erro));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Cancelar consulta" />

        <NoticeCard
          icone="leaf-outline"
          titulo="Tudo bem mudar de planos"
          texto="Acolhemos sua decisão com respeito ao seu tempo e bem-estar."
        />

        {/* Resumo da consulta */}
        <View style={styles.card}>
          <Text style={styles.rotulo}>Consulta a cancelar</Text>

          <View style={styles.estudante}>
            <Image
              source={
                estudante?.fotoUrl
                  ? { uri: estudante.fotoUrl }
                  : require('../../../../assets/avatar-padrao.png')
              }
              style={styles.foto}
            />
            <View style={styles.estudanteTextos}>
              <Text style={styles.nome}>{consulta.estudanteNome}</Text>
              <Text style={styles.curso}>
                Estudante de Psicologia{estudante ? ` • ${estudante.periodo}º período` : ''}
              </Text>
            </View>
          </View>

          <View style={styles.dataLinha}>
            <Ionicons name="calendar-outline" size={18} color={colors.primaria} />
            <View style={styles.dataTextos}>
              <Text style={styles.dataTexto}>{textoData}</Text>
              <Text style={styles.dataSub}>
                Sessão {ROTULO_MODALIDADE[consulta.modalidade].toLowerCase()} supervisionada (
                {consulta.duracaoMinutos} min)
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.titulo}>Deseja mesmo cancelar?</Text>
        <Text style={styles.subtitulo}>
          O cancelamento não pode ser desfeito. Se quiser outro horário, depois é só agendar de
          novo.
        </Text>

        <NoticeCard
          icone="people-outline"
          texto="Ao cancelar, o horário fica disponível para outros pacientes que aguardam atendimento."
        />

        {/* Botões */}
        <View style={styles.botoes}>
          <AppButton
            titulo="Confirmar cancelamento"
            variante="perigo"
            icone="close-circle-outline"
            carregando={enviando}
            onPress={confirmar}
          />
          <AppButton
            titulo="Manter meu agendamento"
            variante="secundario"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
