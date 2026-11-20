import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/appInput.styles';
import { colors } from '@/styles/colors';

type Props = TextInputProps & {
  label?: string;
  icone: keyof typeof Ionicons.glyphMap;
  senha?: boolean;           // mostra o olhinho
  fundoBranco?: boolean;     // campo branco em vez de acinzentado
  erro?: string;             // mensagem vermelha embaixo
  etiquetaDireita?: string;  // texto à direita do título (ex.: "Recomendado")
  dica?: string;             // texto de ajuda embaixo do campo
  iconeDireita?: keyof typeof Ionicons.glyphMap; // ícone no fim do campo (ex.: lupa)
  onPressIconeDireita?: () => void; // deixa o ícone da direita clicável
};

export default function AppInput({
  label,
  icone,
  senha,
  fundoBranco,
  erro,
  etiquetaDireita,
  dica,
  iconeDireita,
  onPressIconeDireita,
  ...props
}: Props) {
  const [focado, setFocado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const corIcone = erro ? colors.erro : focado ? colors.primaria : colors.cinza;

  return (
    <View style={styles.container}>
      {label ? (
        <View style={styles.labelLinha}>
          <Text style={styles.label}>{label}</Text>
          {etiquetaDireita ? <Text style={styles.labelDireita}>{etiquetaDireita}</Text> : null}
        </View>
      ) : null}

      <View
        style={[
          styles.campo,
          fundoBranco && styles.campoBranco,
          focado && styles.campoFocado,
          !!erro && styles.campoErro,
        ]}
      >
        <Ionicons name={icone} size={20} color={corIcone} />

        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textoClaro}
          secureTextEntry={senha && !mostrarSenha}
          onFocus={() => setFocado(true)}
          onBlur={() => setFocado(false)}
          {...props}
        />

        {senha ? (
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} hitSlop={10}>
            <Ionicons
              name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.cinza}
            />
          </TouchableOpacity>
        ) : iconeDireita ? (
          <TouchableOpacity
            onPress={onPressIconeDireita}
            disabled={!onPressIconeDireita}
            hitSlop={10}
          >
            <Ionicons
              name={iconeDireita}
              size={20}
              color={onPressIconeDireita ? colors.primaria : colors.cinza}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Se tiver erro, mostra o erro. Se não, mostra a dica (se tiver) */}
      {erro ? (
        <Text style={styles.erroTexto}>{erro}</Text>
      ) : dica ? (
        <View style={styles.dica}>
          <Ionicons name="information-circle-outline" size={14} color={colors.primaria} />
          <Text style={styles.dicaTexto}>{dica}</Text>
        </View>
      ) : null}
    </View>
  );
}