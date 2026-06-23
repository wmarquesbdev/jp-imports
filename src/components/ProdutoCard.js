import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { CORES, ESPACO, RAIO, SOMBRA } from '../theme/cores';
import { imagemDoProduto } from '../data/imagens';
import { formatarPreco } from '../services/util';

export default function ProdutoCard({ produto, onPress, largura }) {
  const temFaixa = produto.precoAte && produto.precoAte !== produto.preco;
  return (
    <TouchableOpacity style={[s.card, largura ? { width: largura } : null]} onPress={onPress} activeOpacity={0.85}>
      <View style={s.imgWrap}>
        <Image source={imagemDoProduto(produto.id)} style={s.img} resizeMode="cover" />
        {produto.destaque ? <View style={s.tag}><Text style={s.tagTxt}>Destaque</Text></View> : null}
      </View>
      <View style={s.info}>
        <Text style={s.nome} numberOfLines={2}>{produto.nome}</Text>
        <View style={s.precoBloco}>
          {temFaixa ? <Text style={s.faixa}>A partir de</Text> : null}
          <Text style={s.preco} numberOfLines={1}>{formatarPreco(produto.preco)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: CORES.branco, borderRadius: RAIO.md, overflow: 'hidden', borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  imgWrap: { width: '100%', aspectRatio: 1, backgroundColor: CORES.branco },
  img: { width: '100%', height: '100%' },
  tag: { position: 'absolute', top: ESPACO.sm, left: ESPACO.sm, backgroundColor: CORES.vermelho, paddingHorizontal: ESPACO.sm, paddingVertical: 3, borderRadius: RAIO.sm },
  tagTxt: { color: CORES.branco, fontSize: 10, fontWeight: '700' },
  info: { padding: ESPACO.md },
  nome: { fontSize: 13, color: CORES.texto, fontWeight: '600', minHeight: 34, lineHeight: 17 },
  precoBloco: { marginTop: ESPACO.sm },
  faixa: { fontSize: 10, color: CORES.textoClaro },
  preco: { fontSize: 16, color: CORES.azul, fontWeight: '800' },
});
