import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES, ESPACO, LARGURA_MAXIMA } from '../theme/cores';
import { imagemDoProduto } from '../data/imagens';
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

  const precoAtual = useMemo(() => precoDaVariacao(produto, selecoes), [selecoes, produto]);
  const temFaixa = produto.precoAte && produto.precoAte !== produto.preco;
  const mostrarFaixa = temFaixa && precoAtual === produto.preco;

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
      <View style={s.imgWrap}>
        <Image source={imagemDoProduto(produto.id)} style={s.img} resizeMode="cover" />
      </View>
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
            selecionado={selecoes[v.tipo]} onSelecionar={op => setSelecoes(prev => ({ ...prev, [v.tipo]: op }))} />
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
  imgWrap: { width: '100%', aspectRatio: 1, maxHeight: 420, backgroundColor: CORES.azulClaro, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  img: { width: '100%', height: '100%' },
  corpo: { padding: ESPACO.lg },
  linhaTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: ESPACO.md },
  nome: { flex: 1, fontSize: 20, fontWeight: '800', color: CORES.texto, lineHeight: 26 },
  faixa: { fontSize: 12, color: CORES.textoClaro, marginTop: ESPACO.sm },
  preco: { fontSize: 26, fontWeight: '900', color: CORES.azul, marginTop: 2 },
  cat: { fontSize: 13, color: CORES.textoClaro, marginTop: 2 },
  desc: { fontSize: 14, color: CORES.texto, lineHeight: 22, marginTop: ESPACO.md },
});
