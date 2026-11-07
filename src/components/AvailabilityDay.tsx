import { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '@/components/AppButton';
import {
  DiaDisponivel,
  Faixa,
  HORA_MAXIMA,
  HORA_MINIMA,
  formatarFaixa,
  formatarHora,
  horariosDoDia,
  periodoDaFaixa,
  sobrepoe,
} from '@/utils/disponibilidade';
import { styles } from '@/styles/components/availabilityDay.styles';
import { colors } from '@/styles/colors';

const ICONE_PERIODO = {
  Manhã: 'sunny-outline',
  Tarde: 'partly-sunny-outline',
  Noite: 'moon-outline',
} as const;

// Seletor "− 08:00 +" (só usado aqui dentro)
function Stepper({
  rotulo,
  valor,
  minimo,
  maximo,
  onMudar,
}: {
  rotulo: string;
  valor: number;
  minimo: number;
  maximo: number;
  onMudar: (novo: number) => void;
}) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperRotulo}>{rotulo}</Text>
      <View style={styles.stepperLinha}>
        <TouchableOpacity
          style={[styles.stepperBotao, valor <= minimo && styles.stepperBotaoDesabilitado]}
          disabled={valor <= minimo}
          onPress={() => onMudar(valor - 1)}
        >
          <Ionicons name="remove" size={18} color={colors.primaria} />
        </TouchableOpacity>

        <Text style={styles.stepperValor}>{formatarHora(valor)}</Text>

        <TouchableOpacity
          style={[styles.stepperBotao, valor >= maximo && styles.stepperBotaoDesabilitado]}
          disabled={valor >= maximo}
          onPress={() => onMudar(valor + 1)}
        >
          <Ionicons name="add" size={18} color={colors.primaria} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

type Props = {
  nome: string; // "Segunda-feira"
  dia: DiaDisponivel;
  onMudar: (novo: DiaDisponivel) => void;
};

export default function AvailabilityDay({ nome, dia, onMudar }: Props) {
  const [adicionando, setAdicionando] = useState(false);
  const [inicio, setInicio] = useState(8);
  const [fim, setFim] = useState(12);
  const [erro, setErro] = useState<string | null>(null);

  const quantidade = horariosDoDia(dia).length;

  function abrirEditor() {
    // Sugere começar onde a última faixa termina
    const ultima = dia.faixas[dia.faixas.length - 1];
    const sugestao = ultima ? Math.min(ultima.fim, HORA_MAXIMA - 1) : 8;
    setInicio(sugestao);
    setFim(Math.min(sugestao + 4, HORA_MAXIMA));
    setErro(null);
    setAdicionando(true);
  }

  function mudarInicio(novo: number) {
    setInicio(novo);
    if (fim <= novo) setFim(novo + 1); // o fim nunca pode ficar antes do início
    setErro(null);
  }

  function adicionar() {
    const nova: Faixa = { inicio, fim };

    if (dia.faixas.some((faixa) => sobrepoe(faixa, nova))) {
      setErro('Essa faixa se sobrepõe a outra do mesmo dia.');
      return;
    }

    onMudar({
      ...dia,
      faixas: [...dia.faixas, nova].sort((a, b) => a.inicio - b.inicio),
    });
    setAdicionando(false);
  }

  function remover(index: number) {
    onMudar({ ...dia, faixas: dia.faixas.filter((_, i) => i !== index) });
  }

  return (
    <View style={[styles.card, !dia.ativo && styles.cardInativo]}>
      {/* Nome do dia + liga/desliga */}
      <View style={styles.topo}>
        <View style={styles.nomeLinha}>
          <View style={[styles.ponto, dia.ativo && styles.pontoAtivo]} />
          <View>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.resumo}>
              {dia.ativo
                ? `${quantidade} ${quantidade === 1 ? 'horário' : 'horários'}`
                : 'Sem atendimentos'}
            </Text>
          </View>
        </View>

        <Switch
          value={dia.ativo}
          onValueChange={(ativo) => onMudar({ ...dia, ativo })}
          trackColor={{ true: colors.primaria, false: colors.borda }}
          thumbColor={colors.branco}
        />
      </View>

      {dia.ativo && (
        <>
          {/* Faixas do dia */}
          {dia.faixas.length > 0 ? (
            <View style={styles.faixas}>
              {dia.faixas.map((faixa, index) => {
                const periodo = periodoDaFaixa(faixa);
                return (
                  <View key={`${faixa.inicio}-${faixa.fim}`} style={styles.faixa}>
                    <Ionicons name={ICONE_PERIODO[periodo]} size={14} color={colors.primaria} />
                    <Text style={styles.faixaTexto}>{formatarFaixa(faixa)}</Text>
                    <Text style={styles.faixaPeriodo}>({periodo})</Text>
                    <TouchableOpacity onPress={() => remover(index)} hitSlop={8}>
                      <Ionicons name="close" size={14} color={colors.texto} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={styles.dica}>Adicione pelo menos uma faixa de horário.</Text>
          )}

          {/* Adicionar faixa */}
          {adicionando ? (
            <View style={styles.editor}>
              <View style={styles.steppers}>
                <Stepper
                  rotulo="Início"
                  valor={inicio}
                  minimo={HORA_MINIMA}
                  maximo={HORA_MAXIMA - 1}
                  onMudar={mudarInicio}
                />
                <Stepper
                  rotulo="Fim"
                  valor={fim}
                  minimo={inicio + 1}
                  maximo={HORA_MAXIMA}
                  onMudar={(novo) => {
                    setFim(novo);
                    setErro(null);
                  }}
                />
              </View>

              {erro ? <Text style={styles.erro}>{erro}</Text> : null}

              <View style={styles.botoes}>
                <View style={styles.botao}>
                  <AppButton
                    titulo="Cancelar"
                    variante="secundario"
                    onPress={() => setAdicionando(false)}
                  />
                </View>
                <View style={styles.botao}>
                  <AppButton titulo="Adicionar" onPress={adicionar} />
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.adicionar} onPress={abrirEditor}>
              <Ionicons name="add" size={16} color={colors.primaria} />
              <Text style={styles.adicionarTexto}>Adicionar horário</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}