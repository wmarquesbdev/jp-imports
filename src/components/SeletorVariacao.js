import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CORES, ESPACO, RAIO } from '../theme/cores';

export default function SeletorVariacao({ tipo, opcoes, selecionado, onSelecionar }) {
  return (
    <View style={s.bloco}>
      <Text style={s.titulo}>{tipo}</Text>
      <View style={s.linha}>
        {opcoes.map(op => {
          const ativo = selecionado === op;
          return (
            <TouchableOpacity key={op} style={[s.chip, ativo && s.chipAtivo]} onPress={() => onSelecionar(op)} activeOpacity={0.8}>
              <Text style={[s.chipTxt, ativo && s.chipTxtAtivo]}>{op}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  bloco: { marginTop: ESPACO.lg },
  titulo: { fontSize: 14, fontWeight: '700', color: CORES.texto, marginBottom: ESPACO.sm },
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: ESPACO.sm },
  chip: { borderWidth: 1, borderColor: CORES.borda, borderRadius: RAIO.pill, paddingHorizontal: ESPACO.lg, paddingVertical: ESPACO.sm, backgroundColor: CORES.branco },
  chipAtivo: { borderColor: CORES.azul, backgroundColor: CORES.azulClaro },
  chipTxt: { color: CORES.texto, fontSize: 13 },
  chipTxtAtivo: { color: CORES.azul, fontWeight: '700' },
});
