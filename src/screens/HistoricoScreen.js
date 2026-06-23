import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES, ESPACO, RAIO, SOMBRA, LARGURA_MAXIMA } from '../theme/cores';
import { formatarPreco } from '../services/util';
import { useHistorico } from '../context/HistoricoContext';

export default function HistoricoScreen() {
  const { pedidos } = useHistorico();

  if (pedidos.length === 0) {
    return (
      <View style={s.vazio}>
        <Ionicons name="receipt-outline" size={60} color={CORES.borda} />
        <Text style={s.txt}>Nenhum pedido ainda</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={s.tela}
      data={pedidos}
      keyExtractor={p => String(p.id)}
      contentContainerStyle={s.conteudo}
      renderItem={({ item }) => (
        <View style={s.card}>
          <View style={s.topo}>
            <Text style={s.data}>{new Date(item.data).toLocaleString('pt-BR')}</Text>
            <Text style={s.total}>{formatarPreco(item.total)}</Text>
          </View>
          {item.itens.map((it, idx) => (
            <Text key={idx} style={s.item}>{it.quantidade}x {it.nome}</Text>
          ))}
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  tela: { backgroundColor: CORES.fundo },
  conteudo: { padding: ESPACO.lg, gap: ESPACO.md, width: '100%', maxWidth: LARGURA_MAXIMA, alignSelf: 'center' },
  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo, gap: ESPACO.md },
  txt: { color: CORES.textoClaro, fontSize: 16 },
  card: { backgroundColor: CORES.branco, borderRadius: RAIO.md, padding: ESPACO.lg, borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  topo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: ESPACO.sm, alignItems: 'center' },
  data: { color: CORES.textoClaro, fontSize: 12 },
  total: { fontWeight: '800', color: CORES.azul, fontSize: 15 },
  item: { color: CORES.texto, fontSize: 13, marginBottom: 2 },
});
