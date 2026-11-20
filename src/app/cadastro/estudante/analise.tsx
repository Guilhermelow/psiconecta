import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import AppButton from '@/components/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { mensagemDeErro } from '@/services/api';
import { primeiroNome } from '@/utils/nomes';
import { styles } from '@/styles/cadastro/estudante/analise.styles';
import { colors } from '@/styles/colors';

type Etapa = {
  titulo: string;
  descricao: string;
  concluida: boolean;
};

// O que o estudante já enviou (CadastroEstudanteDTO) e o que falta (avaliação do admin)
const ETAPAS: Etapa[] = [
  {
    titulo: 'Dados de acesso',
    descricao: 'Nome, e-mail e senha cadastrados',
    concluida: true,
  },
  {
    titulo: 'Dados acadêmicos',
    descricao: 'Universidade, período, matrícula e estágio supervisionado',
    concluida: true,
  },
  {
    titulo: 'Atendimento',
    descricao: 'Modalidade e áreas de atendimento escolhidas',
    concluida: true,
  },
  {
    titulo: 'Avaliação da coordenação',
    descricao: 'Confirmação do vínculo acadêmico pela clínica-escola',
    concluida: false,
  },
];

// Estudante logado com statusAprovacao PENDENTE ou REJEITADO
export default function CadastroEmAnalise() {
  const { usuario, perfilEstudante, recarregarPerfil, sair } = useAuth();
  const [verificando, setVerificando] = useState(false);

  if (!usuario || usuario.perfil !== 'ESTUDANTE') return <Redirect href="/boas-vindas" />;

  const rejeitado = perfilEstudante?.statusAprovacao === 'REJEITADO';
  const nome = primeiroNome(usuario.nome);

  // GET /api/estudante/perfil de novo, para ver se a coordenação já avaliou
  async function verificarStatus() {
    setVerificando(true);
    try {
      const { estudante } = await recarregarPerfil();
      if (estudante?.statusAprovacao === 'APROVADO') {
        router.replace('/cadastro/estudante/aprovado');
      } else if (estudante?.statusAprovacao === 'PENDENTE') {
        Alert.alert('Ainda em análise', 'Seu cadastro ainda não foi avaliado. Tente mais tarde.');
      }
    } catch (erro) {
      Alert.alert('Não foi possível verificar', mensagemDeErro(erro));
    } finally {
      setVerificando(false);
    }
  }

  async function handleSair() {
    await sair();
    if (router.canDismiss()) router.dismissAll();
    router.replace('/boas-vindas');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Topo */}
        <View style={styles.topo}>
          <View style={[styles.iconeCirculo, rejeitado && styles.iconeCirculoRejeitado]}>
            <MaterialCommunityIcons
              name={rejeitado ? 'file-cancel-outline' : 'file-search-outline'}
              size={40}
              color={rejeitado ? colors.erro : colors.primaria}
            />
          </View>

          <View style={[styles.status, rejeitado && styles.statusRejeitado]}>
            <View style={[styles.statusPonto, rejeitado && styles.statusPontoRejeitado]} />
            <Text style={[styles.statusTexto, rejeitado && styles.statusTextoRejeitado]}>
              {rejeitado ? 'Não aprovado' : 'Em análise'}
            </Text>
          </View>

          <Text style={styles.titulo}>
            {rejeitado ? 'Cadastro não aprovado' : 'Cadastro enviado!'}
          </Text>
          <Text style={styles.subtitulo}>
            {rejeitado
              ? 'A coordenação da clínica-escola não aprovou seu cadastro. Se você acredita que houve um engano, fale com a equipe pela área de Ajuda.'
              : `${nome ? `Obrigado, ${nome}! ` : ''}A coordenação da clínica-escola vai confirmar seu vínculo acadêmico antes de liberar seus atendimentos.`}
          </Text>
        </View>

        {/* Linha do tempo (só enquanto está em análise) */}
        {!rejeitado && (
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
        )}

        {/* Como acompanhar */}
        {!rejeitado && (
          <View style={styles.card}>
            <View style={styles.infoLinha}>
              <View style={styles.infoIcone}>
                <Ionicons name="refresh-outline" size={18} color={colors.primaria} />
              </View>
              <View style={styles.infoTextos}>
                <Text style={styles.infoTitulo}>Acompanhe por aqui</Text>
                <Text style={styles.infoTexto}>
                  Volte a esta tela ou entre no app novamente para ver se seu cadastro já foi
                  avaliado.
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.botoes}>
          {!rejeitado && (
            <AppButton
              titulo="Verificar status"
              icone="refresh-outline"
              carregando={verificando}
              onPress={verificarStatus}
            />
          )}
          <AppButton titulo="Sair da conta" variante="secundario" icone="log-out-outline" onPress={handleSair} />
        </View>

        <View style={styles.ajuda}>
          <Text style={styles.ajudaTexto}>Precisa de ajuda?</Text>
          <TouchableOpacity onPress={() => router.push('/conta/ajuda')}>
            <Text style={styles.ajudaLink}>Falar com o suporte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
