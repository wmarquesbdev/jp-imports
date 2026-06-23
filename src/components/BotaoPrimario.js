import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { CORES, ESPACO, RAIO } from '../theme/cores';

export default function BotaoPrimario({ titulo, onPress, cor = CORES.azul, carregando = false, desabilitado = false }) {
  return (
    <TouchableOpacity
      style={[s.botao, { backgroundColor: cor }, (desabilitado || carregando) && s.desab]}
      onPress={onPress}
      disabled={desabilitado || carregando}
      activeOpacity={0.85}
    >
      {carregando ? <ActivityIndicator color={CORES.branco} /> : <Text style={s.txt}>{titulo}</Text>}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  botao: { paddingVertical: ESPACO.lg, paddingHorizontal: ESPACO.lg, borderRadius: RAIO.md, alignItems: 'center', justifyContent: 'center' },
  desab: { opacity: 0.5 },
  txt: { color: CORES.branco, fontWeight: '700', fontSize: 16 },
});
