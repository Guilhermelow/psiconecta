import { View, Text, TouchableOpacity, Image, DimensionValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/styles/components/stepHeader.styles';
import { colors } from '@/styles/colors';

type Props = {
    passoAtual: number;
    totalPassos: number;
    etiqueta?: string; // se tiver, usa o modelo do estudante
    iconeEtiqueta?: keyof typeof Ionicons.glyphMap;
    comLogo?: boolean; // modelo com logo, mesmo sem etiqueta
};

export default function StepHeader({
    passoAtual,
    totalPassos,
    etiqueta,
    iconeEtiqueta = 'school',
    comLogo,
}: Props) {
    const progresso: DimensionValue = `${(passoAtual / totalPassos) * 100}%`;
    const ultimoPasso = passoAtual === totalPassos;

    function voltar() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/cadastro');
        }
    }

    // Barra de progresso (usada nos dois modelos)
    const barra = (
        <View style={styles.barra}>
            <View style={[styles.barraPreenchida, { width: progresso }]} />
        </View>
    );

    const botaoVoltar = (
        <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
            <Ionicons name="arrow-back" size={20} color={colors.titulo} />
        </TouchableOpacity>
    );

    // ===== Modelo com etiqueta (estudante) =====
    if (etiqueta || comLogo) {
        return (
            <View style={styles.container}>
                <View style={styles.topoEtiqueta}>
                    {botaoVoltar}
                    <Image
                        source={require('../../assets/psiconecta-logo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.linha}>
                    {etiqueta && (
                        <View style={styles.etiqueta}>
                            <Ionicons name={iconeEtiqueta} size={12} color={colors.primaria} />
                            <Text style={styles.etiquetaTexto}>{etiqueta}</Text>
                        </View>
                    )}
                    <Text style={styles.passoTextoSolto}>
                        Passo {passoAtual} de {totalPassos}
                    </Text>
                </View>

                {barra}
            </View>
        );
    }

    // ===== Modelo padrão (paciente) =====
    return (
        <View style={styles.container}>
            <View style={styles.linha}>
                {botaoVoltar}

                <View style={styles.passo}>
                    {ultimoPasso ? (
                        <Ionicons name="checkmark-circle" size={14} color={colors.primaria} />
                    ) : (
                        <View style={styles.passoPonto} />
                    )}
                    <Text style={styles.passoTexto}>
                        Passo {passoAtual} de {totalPassos}
                    </Text>
                </View>

                <View style={styles.espaco} />
            </View>

            {barra}
        </View>
    );
}