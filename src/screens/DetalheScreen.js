import React, { useState, useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES, ESPACO, RAIO, LARGURA_MAXIMA } from '../theme/cores';
import { imagensDoProduto } from '../data/imagens';
import { formatarPreco, precoDaVariacao } from '../services/util';
import SeletorVariacao from '../components/SeletorVariacao';
import BotaoPrimario from '../components/BotaoPrimario';
import { useCarrinho } from '../context/CarrinhoContext';
import { useFavoritos } from '../context/FavoritosContext';
import { useToast } from '../context/ToastContext';

export default function DetalheScreen({ route, navigation }) {
  const { produto } = route.params;
  const { adicionar } = useCarrinho();
  const { ehFavorito, alternar } = useFavoritos();
  const { mostrar } = useToast();
  const [selecoes, setSelecoes] = useState({});
  const [fotoAtual, setFotoAtual] = useState(0);
  const [larguraImg, setLarguraImg] = useState(0);
  const scrollRef = useRef(null);

  const fotos = useMemo(() => imagensDoProduto(produto.id), [produto.id]);
  const precoAtual = useMemo(() => precoDaVariacao(produto, selecoes), [selecoes, produto]);
  const temFaixa = produto.precoAte && produto.precoAte !== produto.preco;
  const mostrarFaixa = temFaixa && precoAtual === produto.preco;

  const irParaFoto = useCallback((indice) => {
    if (indice == null || indice < 0 || indice >= fotos.length) return;
    setFotoAtual(indice);
    if (scrollRef.current && larguraImg) {
      scrollRef.current.scrollTo({ x: indice * larguraImg, animated: true });
    }
  }, [fotos.length, larguraImg]);

  function aoSelecionar(tipo, opcao) {
    setSelecoes(prev => ({ ...prev, [tipo]: opcao }));
    const v = (produto.variacoes || []).find(x => x.tipo === tipo);
    if (v && v.imagens && v.imagens[opcao] != null) irParaFoto(v.imagens[opcao]);
  }

  function aoRolar(e) {
    if (!larguraImg) return;
    const i = Math.round(e.nativeEvent.contentOffset.x / larguraImg);
    if (i !== fotoAtual && i >= 0 && i < fotos.length) setFotoAtual(i);
  }

  function aoAdicionar() {
    for (const v of (produto.variacoes || [])) {
      if (!selecoes[v.tipo]) { mostrar('Selecione: ' + v.tipo, 'erro'); return; }
    }
    adicionar({
      produtoId: produto.id, nome: produto.nome, imagem: produto.id,
      selecoes: { ...selecoes }, precoUnit: precoAtual, quantidade: 1,
    });
    mostrar('Produto adicionado ao carrinho');
  }

  const fav = ehFavorito(produto.id);

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <View style={s.galeria} onLayout={e => setLarguraImg(e.nativeEvent.layout.width)}>
        {larguraImg > 0 ? (
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={aoRolar}
            scrollEventThrottle={16}
            style={StyleSheet.absoluteFill}
          >
            {fotos.map((src, i) => (
              <Image key={i} source={src} style={{ width: larguraImg, height: '100%' }} resizeMode="contain" />
            ))}
          </ScrollView>
        ) : null}
        {fotos.length > 1 ? (
          <View style={s.dots} pointerEvents="none">
            {fotos.map((_, i) => <View key={i} style={[s.dot, i === fotoAtual && s.dotAtivo]} />)}
          </View>
        ) : null}
      </View>

      {fotos.length > 1 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.thumbs}>
          {fotos.map((src, i) => (
            <TouchableOpacity key={i} onPress={() => irParaFoto(i)} activeOpacity={0.8}>
              <Image source={src} style={[s.thumb, i === fotoAtual && s.thumbAtivo]} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}

      <View style={s.corpo}>
        <View style={s.linhaTopo}>
          <Text style={s.nome}>{produto.nome}</Text>
          <TouchableOpacity onPress={() => alternar(produto.id)}>
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color={fav ? CORES.vermelho : CORES.textoClaro} />
          </TouchableOpacity>
        </View>
        {mostrarFaixa ? <Text style={s.faixa}>A partir de</Text> : null}
        <Text style={s.preco}>{formatarPreco(precoAtual)}</Text>
        <Text style={s.cat}>{produto.cat}</Text>
        <Text style={s.desc}>{produto.desc}</Text>
        {(produto.variacoes || []).map(v => (
          <SeletorVariacao key={v.tipo} tipo={v.tipo} opcoes={v.opcoes}
            selecionado={selecoes[v.tipo]} onSelecionar={op => aoSelecionar(v.tipo, op)} />
        ))}
        <View style={{ height: 20 }} />
        <BotaoPrimario titulo="Adicionar ao carrinho" onPress={aoAdicionar} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.branco },
  conteudo: { paddingBottom: ESPACO.xxl, width: '100%', maxWidth: LARGURA_MAXIMA, alignSelf: 'center' },
  galeria: { width: '100%', aspectRatio: 1, maxHeight: 440, backgroundColor: CORES.azulClaro, overflow: 'hidden' },
  dots: { position: 'absolute', bottom: ESPACO.md, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 999, backgroundColor: 'rgba(11,61,128,0.25)' },
  dotAtivo: { backgroundColor: CORES.azul, width: 18 },
  thumbs: { gap: ESPACO.sm, paddingHorizontal: ESPACO.lg, paddingVertical: ESPACO.md },
  thumb: { width: 56, height: 56, borderRadius: RAIO.sm, borderWidth: 2, borderColor: 'transparent', backgroundColor: CORES.branco },
  thumbAtivo: { borderColor: CORES.azul },
  corpo: { padding: ESPACO.lg, paddingTop: ESPACO.sm },
  linhaTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: ESPACO.md },
  nome: { flex: 1, fontSize: 20, fontWeight: '800', color: CORES.texto, lineHeight: 26 },
  faixa: { fontSize: 12, color: CORES.textoClaro, marginTop: ESPACO.sm },
  preco: { fontSize: 26, fontWeight: '900', color: CORES.azul, marginTop: 2 },
  cat: { fontSize: 13, color: CORES.textoClaro, marginTop: 2 },
  desc: { fontSize: 14, color: CORES.texto, lineHeight: 22, marginTop: ESPACO.md },
});
