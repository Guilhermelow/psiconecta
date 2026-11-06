import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import StepHeader from '@/components/StepHeader';
import AppButton from '@/components/AppButton';
import NoticeCard from '@/components/NoticeCard';
import { useCadastro } from '@/contexts/CadastroContext';
import { formatarTamanho } from '@/utils/arquivos';
import { styles } from '@/styles/cadastro/estudante/comprovacao.styles';
import { colors } from '@/styles/colors';

const TAMANHO_MAXIMO = 10 * 1024 * 1024; // 10 MB

export default function Comprovacao() {
  const [arquivo, setArquivo] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const { atualizarDados } = useCadastro();

  async function selecionarArquivo() {
    const resultado = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png'],
      copyToCacheDirectory: true,
    });

    // Se a pessoa fechou sem escolher, não faz nada
    if (resultado.canceled) return;

    const escolhido = resultado.assets[0];

    if (escolhido.size && escolhido.size > TAMANHO_MAXIMO) {
      Alert.alert('Arquivo muito grande', 'Escolha um arquivo de até 10 MB.');
      return;
    }

    setArquivo(escolhido);
  }

  function handleEnviar() {
    if (!arquivo) return;

    atualizarDados({
      documento: {
        nome: arquivo.name,
        uri: arquivo.uri,
        tamanho: arquivo.size,
        tipo: arquivo.mimeType,
      },
    });
    // Depois vamos enviar tudo para a API aqui
    // Fecha as telas do cadastro e abre o resultado
    router.dismissAll();
    router.push('/cadastro/estudante/analise');
  }

  const ehPdf = arquivo?.mimeType === 'application/pdf';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StepHeader passoAtual={3} totalPassos={3} etiqueta="Formação em Psicologia" />

        <Text style={styles.titulo}>Comprove seu vínculo acadêmico</Text>
        <Text style={styles.subtitulo}>
          Envie um documento que confirme que você está regularmente matriculado no
          curso de Psicologia.
        </Text>

        <View style={styles.cardDocumentos}>
          <NoticeCard
            icone="shield-checkmark-outline"
            titulo="Documentos aceitos"
            texto="Declaração de Matrícula atualizada, Atestado de Frequência ou Comprovante de Matrícula do semestre vigente assinado digitalmente pela sua IES."
          />
        </View>

        {arquivo ? (
          // ===== Arquivo escolhido =====
          <View style={styles.cardArquivo}>
            <View style={styles.arquivoLinha}>
              <View style={[styles.arquivoIcone, !ehPdf && styles.arquivoIconeImagem]}>
                <MaterialCommunityIcons
                  name={ehPdf ? 'file-pdf-box' : 'file-image'}
                  size={26}
                  color={ehPdf ? colors.erro : colors.primaria}
                />
              </View>

              <View style={styles.arquivoTextos}>
                <Text style={styles.arquivoNome} numberOfLines={1}>
                  {arquivo.name}
                </Text>
                <View style={styles.arquivoInfoLinha}>
                  <View style={styles.arquivoPonto} />
                  <Text style={styles.arquivoInfo}>
                    {formatarTamanho(arquivo.size)} • Pronto para envio
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.botaoLixeira} onPress={() => setArquivo(null)}>
                <Ionicons name="trash-outline" size={18} color={colors.cinza} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.substituir} onPress={selecionarArquivo}>
              <Ionicons name="sync-outline" size={16} color={colors.primaria} />
              <Text style={styles.substituirTexto}>Substituir arquivo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // ===== Nenhum arquivo ainda =====
          <TouchableOpacity
            style={styles.areaUpload}
            onPress={selecionarArquivo}
            activeOpacity={0.8}
          >
            <Ionicons name="cloud-upload-outline" size={32} color={colors.primaria} />
            <Text style={styles.areaUploadTitulo}>Toque para selecionar o documento</Text>
            <Text style={styles.areaUploadTexto}>PDF, JPG ou PNG • até 10 MB</Text>
          </TouchableOpacity>
        )}

        <View style={styles.avisoSeguranca}>
          <NoticeCard
            icone="lock-closed-outline"
            texto="Documento criptografado e de uso restrito à equipe de validação acadêmica."
          />
        </View>

        <AppButton
          titulo="Enviar para análise"
          icone="arrow-forward"
          desabilitado={!arquivo}
          onPress={handleEnviar}
        />

      </ScrollView>
    </SafeAreaView>
  );
}