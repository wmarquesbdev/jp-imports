import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CORES, ESPACO, RAIO, SOMBRA, LARGURA_MAXIMA } from '../theme/cores';
import { imagemDoProduto } from '../data/imagens';
import { formatarPreco } from '../services/util';
import BotaoPrimario from '../components/BotaoPrimario';
import { useCarrinho } from '../context/CarrinhoContext';

export default function CarrinhoScreen({ navigation }) {
  const { itens, mudarQtd, remover, total } = useCarrinho();
  const insets = useSafeAreaInsets();

  if (itens.length === 0) {
    return (
      <View style={s.vazio}>
        <Ionicons name="cart-outline" size={60} color={CORES.borda} />
        <Text style={s.vazioTxt}>Seu carrinho esta vazio</Text>
      </View>
    );
  }

  return (
    <View style={s.tela}>
      <FlatList
        data={itens}
        keyExtractor={i => i.chave}
        contentContainerStyle={s.conteudo}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Image source={imagemDoProduto(item.imagem)} style={s.img} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <Text style={s.nome} numberOfLines={2}>{item.nome}</Text>
              {Object.entries(item.selecoes || {}).length > 0 ? (
                <Text style={s.var}>{Object.entries(item.selecoes).map(([k, v]) => k + ': ' + v).join(' - ')}</Text>
              ) : null}
              <Text style={s.preco}>{formatarPreco(item.precoUnit)}</Text>
              <View style={s.qtdLinha}>
                <TouchableOpacity style={s.qtdBtn} onPress={() => mudarQtd(item.chave, -1)}><Text style={s.qtdSinal}>-</Text></TouchableOpacity>
                <Text style={s.qtd}>{item.quantidade}</Text>
                <TouchableOpacity style={s.qtdBtn} onPress={() => mudarQtd(item.chave, 1)}><Text style={s.qtdSinal}>+</Text></TouchableOpacity>
                <TouchableOpacity style={s.lixo} onPress={() => remover(item.chave)}>
                  <Ionicons name="trash-outline" size={20} color={CORES.vermelho} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={[s.rodape, { paddingBottom: ESPACO.lg + insets.bottom }]}>
        <View style={s.rodapeConteudo}>
          <View style={s.totalLinha}>
            <Text style={s.totalLabel}>Total</Text>
            <Text style={s.totalValor}>{formatarPreco(total)}</Text>
          </View>
          <BotaoPrimario titulo="Finalizar pedido" cor={CORES.verde} onPress={() => navigation.navigate('Finalizacao')} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo },
  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo, gap: ESPACO.md },
  vazioTxt: { color: CORES.textoClaro, fontSize: 16 },
  conteudo: { padding: ESPACO.lg, gap: ESPACO.md, width: '100%', maxWidth: LARGURA_MAXIMA, alignSelf: 'center' },
  item: { flexDirection: 'row', gap: ESPACO.md, backgroundColor: CORES.branco, borderRadius: RAIO.md, padding: ESPACO.md, borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  img: { width: 76, height: 76, borderRadius: RAIO.sm, backgroundColor: CORES.branco },
  nome: { fontSize: 14, fontWeight: '700', color: CORES.texto },
  var: { fontSize: 12, color: CORES.textoClaro, marginTop: 2 },
  preco: { fontSize: 14, fontWeight: '800', color: CORES.azul, marginTop: ESPACO.xs },
  qtdLinha: { flexDirection: 'row', alignItems: 'center', gap: ESPACO.md, marginTop: ESPACO.sm },
  qtdBtn: { width: 32, height: 32, borderRadius: RAIO.sm, borderWidth: 1, borderColor: CORES.borda, alignItems: 'center', justifyContent: 'center', backgroundColor: CORES.branco },
  qtdSinal: { fontSize: 18, color: CORES.texto },
  qtd: { fontSize: 15, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  lixo: { marginLeft: 'auto', padding: ESPACO.xs },
  rodape: { borderTopWidth: 1, borderTopColor: CORES.borda, backgroundColor: CORES.branco, ...SOMBRA.flutuante },
  rodapeConteudo: { width: '100%', maxWidth: LARGURA_MAXIMA, alignSelf: 'center', paddingHorizontal: ESPACO.lg, paddingTop: ESPACO.lg },
  totalLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: ESPACO.md, alignItems: 'center' },
  totalLabel: { fontSize: 16, color: CORES.texto },
  totalValor: { fontSize: 22, fontWeight: '900', color: CORES.azul },
});
