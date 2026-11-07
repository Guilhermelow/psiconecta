import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import AppHeader from '@/components/AppHeader';
import AppButton from '@/components/AppButton';
import { styles } from '@/styles/conta/ajuda.styles';
import { colors } from '@/styles/colors';

// ⚠️ Troque pelo e-mail real da clínica-escola
const EMAIL_SUPORTE = 'suporte@psiconecta.com.br';

const PERGUNTAS = [
  {
    pergunta: 'Quem vai me atender?',
    resposta:
      'Estudantes de Psicologia a partir do 5º período, sempre com supervisão de um professor psicólogo registrado no Conselho de Psicologia.',
  },
  {
    pergunta: 'O atendimento é gratuito?',
    resposta: 'Sim. Os atendimentos realizados pela clínica-escola não têm custo para o paciente.',
  },
  {
    pergunta: 'Como entro na sala da consulta?',
    resposta:
      'A sala abre 15 minutos antes do horário. Você entra pela aba Agendamentos ou pelos detalhes da consulta.',
  },
  {
    pergunta: 'Posso cancelar ou reagendar?',
    resposta: 'Sim, até 4 horas antes da sessão, pelos detalhes da consulta.',
  },
  {
    pergunta: 'O que eu falo nas sessões é sigiloso?',
    resposta:
      'Sim. Tudo é protegido pelo sigilo profissional do Código de Ética do Psicólogo e pela LGPD.',
  },
];

export default function Ajuda() {
  const [aberta, setAberta] = useState<number | null>(null); // pergunta aberta
  const versao = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader titulo="Ajuda e suporte" />

        {/* Emergência */}
        <View style={styles.emergencia}>
          <View style={styles.emergenciaTopo}>
            <Ionicons name="heart" size={20} color={colors.erro} />
            <Text style={styles.emergenciaTitulo}>Precisa de ajuda agora?</Text>
          </View>
          <Text style={styles.emergenciaTexto}>
            O Psiconecta não atende emergências. Se você estiver em crise ou pensando em se
            machucar, ligue para o CVV (188), gratuito e 24 horas, ou para o SAMU (192).
          </Text>
          <AppButton
            titulo="Ligar para o CVV (188)"
            variante="perigo"
            icone="call-outline"
            onPress={() => Linking.openURL('tel:188')}
          />
        </View>

        {/* Perguntas frequentes */}
        <Text style={styles.secaoTitulo}>Perguntas frequentes</Text>
        <View style={styles.grupo}>
          {PERGUNTAS.map((item, index) => {
            const aberto = aberta === index;
            return (
              <View key={item.pergunta}>
                {index > 0 && <View style={styles.divisor} />}
                <TouchableOpacity
                  style={styles.pergunta}
                  onPress={() => setAberta(aberto ? null : index)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.perguntaTexto}>{item.pergunta}</Text>
                  <Ionicons
                    name={aberto ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colors.textoClaro}
                  />
                </TouchableOpacity>
                {aberto && <Text style={styles.resposta}>{item.resposta}</Text>}
              </View>
            );
          })}
        </View>

        {/* Contato */}
        <Text style={styles.secaoTitulo}>Fale com a gente</Text>
        <View style={styles.card}>
          <Text style={styles.texto}>
            Dúvidas sobre o app ou sobre seus atendimentos? Fale com a equipe da clínica-escola.
          </Text>
          <AppButton
            titulo="Enviar e-mail"
            variante="secundario"
            icone="mail-outline"
            onPress={() => Linking.openURL(`mailto:${EMAIL_SUPORTE}`)}
          />
        </View>

        {/* Sobre */}
        <Text style={styles.secaoTitulo}>Sobre o Psiconecta</Text>
        <View style={styles.card}>
          <Text style={styles.texto}>
            O Psiconecta é um projeto acadêmico que conecta pacientes a estudantes de Psicologia
            em formação. Todos os atendimentos acontecem com supervisão de docentes da
            clínica-escola, seguindo o Código de Ética Profissional do Psicólogo.
          </Text>
          <Text style={styles.versao}>Versão {versao}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}