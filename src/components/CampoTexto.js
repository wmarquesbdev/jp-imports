import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CORES, ESPACO, RAIO } from '../theme/cores';

export default function CampoTexto({ rotulo, ...props }) {
  return (
    <View style={s.wrap}>
      {rotulo ? <Text style={s.rotulo}>{rotulo}</Text> : null}
      <TextInput style={s.input} placeholderTextColor={CORES.textoClaro} {...props} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: ESPACO.lg },
  rotulo: { fontSize: 13, color: CORES.texto, marginBottom: ESPACO.xs, fontWeight: '600' },
  input: { backgroundColor: CORES.branco, borderWidth: 1, borderColor: CORES.borda, borderRadius: RAIO.md, paddingHorizontal: ESPACO.lg, paddingVertical: ESPACO.md, fontSize: 15, color: CORES.texto, outlineStyle: 'none' },
});
