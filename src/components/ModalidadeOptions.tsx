import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RadioOption from '@/components/RadioOption';
import type { ModalidadeAtendimento } from '@/types/api';
import { ROTULO_MODALIDADE } from '@/utils/rotulos';

const OPCOES: { valor: ModalidadeAtendimento; icone: keyof typeof Ionicons.glyphMap }[] = [
  { valor: 'ONLINE', icone: 'videocam-outline' },
  { valor: 'PRESENCIAL', icone: 'business-outline' },
  { valor: 'AMBOS', icone: 'swap-horizontal-outline' },
];

type Props = {
  selecionada: ModalidadeAtendimento | null;
  onSelecionar: (modalidade: ModalidadeAtendimento) => void;
};

// Modalidade de atendimento do estudante (ONLINE, PRESENCIAL ou AMBOS)
export default function ModalidadeOptions({ selecionada, onSelecionar }: Props) {
  return (
    <View style={{ gap: 10 }}>
      {OPCOES.map((opcao) => (
        <RadioOption
          key={opcao.valor}
          icone={opcao.icone}
          texto={ROTULO_MODALIDADE[opcao.valor]}
          selecionado={selecionada === opcao.valor}
          onPress={() => onSelecionar(opcao.valor)}
        />
      ))}
    </View>
  );
}
