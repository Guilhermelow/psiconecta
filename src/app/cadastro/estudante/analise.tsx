import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import AppButton from '@/components/AppButton';
import { useCadastro } from '@/contexts/CadastroContext';
import { styles } from '@/styles/cadastro/estudante/analise.styles';
import { colors } from '@/styles/colors';
import { gerarProtocolo } from '@/utils/protocolo';

type Etapa = {
  titulo: string;
  descricao: string;
  concluida: boolean;
};

const ETAPAS: Etapa[] = [
  {
    titulo: 'Dados pessoais',
    descricao: 'Identificação e contatos confirmados',
    concluida: true,
  },
  {
    titulo: 'Dados acadêmicos',
    descricao: 'Instituição, período e matrícula informados',
    concluida: true,
  },
  {
    titulo: 'Comprovante de matrícula',
    descricao: 'Documento recebido com segurança',
    concluida: true,
  },
  {
    titulo: 'Verificação pela coordenação',
    descricao: 'Confirmação do vínculo acadêmico e do docente supervisor',
    concluida: false,
  },
];

export default function CadastroEmAnalise() {
  const { dados, limparDados } = useCadastro();
  const [protocolo] = useState(gerarProtocolo);
  const [copiado, setCopiado] = useState(false);

  // Pega só o primeiro nome (ex.: "Lucas")
  const primeiroNome = dados.nome?.split(' ')[0];

  async function copiarProtocolo() {
    await Clipboard.setStringAsync(protocolo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function voltarAoInicio() {
    limparDados();
    if (router.canGoBack()) {
      router.dismissAll();
    } else {
      router.replace('/boas-vindas');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Topo */}
        <View style={styles.topo}>
          <View style={styles.iconeCirculo}>
            <MaterialCommunityIcons name="file-search-outline" size={40} color={colors.primaria} />
          </View>

          <View style={styles.status}>
            <View style={styles.statusPonto} />
            <Text style={styles.statusTexto}>Em análise</Text>
          </View>

          <Text style={styles.titulo}>Cadastro enviado!</Text>
          <Text style={styles.subtitulo}>
            {primeiroNome ? `Obrigado, ${primeiroNome}! ` : ''}
            Agora vamos confirmar seu vínculo acadêmico junto à sua instituição de ensino.
          </Text>
        </View>

        {/* Linha do tempo */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Etapas da verificação</Text>

          {ETAPAS.map((etapa, index) => {
            const ultima = index === ETAPAS.length - 1;

            return (
              <View key={etapa.titulo} style={styles.etapa}>
                <View style={styles.etapaColuna}>
                  <View
                    style={[
                      styles.etapaCirculo,
                      etapa.concluida ? styles.etapaCirculoConcluido : styles.etapaCirculoAndamento,
                    ]}
                  >
                    <Ionicons
                      name={etapa.concluida ? 'checkmark' : 'hourglass-outline'}
                      size={16}
                      color={etapa.concluida ? colors.branco : colors.primaria}
                    />
                  </View>
                  {!ultima && <View style={styles.etapaLinha} />}
                </View>

                <View style={styles.etapaTextos}>
                  <View style={styles.etapaTituloLinha}>
                    <Text
                      style={[styles.etapaTitulo, !etapa.concluida && styles.etapaTituloAndamento]}
                    >
                      {etapa.titulo}
                    </Text>
                    {!etapa.concluida && (
                      <View style={styles.andamento}>
                        <Text style={styles.andamentoTexto}>Em andamento</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.etapaDescricao}>{etapa.descricao}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Prazo, notificação e protocolo */}
        <View style={styles.card}>
          <View style={styles.infoLinha}>
            <View style={styles.infoIcone}>
              <Ionicons name="time-outline" size={18} color={colors.primaria} />
            </View>
            <View style={styles.infoTextos}>
              <Text style={styles.infoTitulo}>Resposta em até 48 horas úteis</Text>
              <Text style={styles.infoTexto}>
                Você receberá uma notificação no app e por e-mail assim que a verificação
                for concluída.
              </Text>
            </View>
          </View>

          <View style={styles.protocolo}>
            <View>
              <Text style={styles.protocoloLabel}>Protocolo da solicitação</Text>
              <Text style={styles.protocoloCodigo}>#{protocolo}</Text>
            </View>

            <TouchableOpacity style={styles.copiar} onPress={copiarProtocolo} hitSlop={10}>
              <Ionicons
                name={copiado ? 'checkmark' : 'copy-outline'}
                size={16}
                color={colors.primaria}
              />
              <Text style={styles.copiarTexto}>{copiado ? 'Copiado!' : 'Copiar'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AppButton titulo="Voltar para o início" icone="arrow-forward" onPress={voltarAoInicio} />

        <View style={styles.ajuda}>
          <Text style={styles.ajudaTexto}>Precisa de ajuda?</Text>
          <TouchableOpacity onPress={() => Alert.alert('Em breve', 'Suporte acadêmico.')}>
            <Text style={styles.ajudaLink}>Falar com o suporte</Text>
          </TouchableOpacity>
        </View>
                {/* ⚠️ SÓ PARA TESTE: aparece apenas durante o desenvolvimento */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.botaoTeste}
            onPress={() => router.replace('/cadastro/estudante/aprovado')}
          >
            <Text style={styles.botaoTesteTexto}>🧪 Simular aprovação (teste)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}