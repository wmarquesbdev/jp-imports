import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES, ESPACO, RAIO, SOMBRA, LARGURA_MAXIMA } from '../theme/cores';
import { buscarProdutos } from '../services/api';
import ProdutoCard from '../components/ProdutoCard';
import { useCarrinho } from '../context/CarrinhoContext';
import { useGrade } from '../hooks/useGrade';

export default function CatalogoScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const { quantidadeTotal } = useCarrinho();
  const { colunas, larguraCelula } = useGrade();
  const larguraDestaque = Math.min(larguraCelula, 180);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')} style={{ marginRight: ESPACO.sm }}>
          <Ionicons name="cart" size={24} color={CORES.branco} />
          {quantidadeTotal > 0 ? <View style={s.badge}><Text style={s.badgeTxt}>{quantidadeTotal}</Text></View> : null}
        </TouchableOpacity>
      ),
    });
  }, [navigation, quantidadeTotal]);

  useEffect(() => {
    (async () => {
      const { dados } = await buscarProdutos();
      setProdutos(dados);
      setCarregando(false);
    })();
  }, []);

  const categorias = useMemo(() => ['Todos', ...Array.from(new Set(produtos.map(p => p.cat)))], [produtos]);
  const destaques = useMemo(() => produtos.filter(p => p.destaque), [produtos]);
  const filtrados = useMemo(() => produtos.filter(p => {
    const okCat = categoria === 'Todos' || p.cat === categoria;
    const okBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    return okCat && okBusca;
  }), [produtos, categoria, busca]);

  if (carregando) {
    return <View style={s.centro}><ActivityIndicator size="large" color={CORES.azul} /></View>;
  }

  return (
    <View style={s.tela}>
      <FlatList
        key={'cols-' + colunas}
        data={filtrados}
        keyExtractor={p => String(p.id)}
        numColumns={colunas}
        columnWrapperStyle={s.linha}
        contentContainerStyle={s.conteudo}
        ListHeaderComponent={
          <View>
            <View style={s.buscaWrap}>
              <Ionicons name="search" size={18} color={CORES.textoClaro} />
              <TextInput style={s.buscaInput} placeholder="Buscar produtos..." value={busca} onChangeText={setBusca} placeholderTextColor={CORES.textoClaro} />
              {busca ? (
                <TouchableOpacity onPress={() => setBusca('')}>
                  <Ionicons name="close-circle" size={18} color={CORES.textoClaro} />
                </TouchableOpacity>
              ) : null}
            </View>
            {destaques.length > 0 && busca === '' && categoria === 'Todos' ? (
              <View>
                <Text style={s.secao}>Destaques</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.carrossel}>
                  {destaques.map(p => <ProdutoCard key={p.id} produto={p} largura={larguraDestaque} onPress={() => navigation.navigate('Detalhe', { produto: p })} />)}
                </ScrollView>
              </View>
            ) : null}
            <Text style={s.secao}>{categoria === 'Todos' ? 'Todos os produtos' : categoria}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
              {categorias.map(c => (
                <TouchableOpacity key={c} style={[s.cat, categoria === c && s.catAtiva]} onPress={() => setCategoria(c)}>
                  <Text style={[s.catTxt, categoria === c && s.catTxtAtiva]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: larguraCelula, marginBottom: ESPACO.md }}>
            <ProdutoCard produto={item} onPress={() => navigation.navigate('Detalhe', { produto: item })} />
          </View>
        )}
        ListEmptyComponent={<Text style={s.vazio}>Nenhum produto encontrado.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo },
  conteudo: { width: '100%', maxWidth: LARGURA_MAXIMA, alignSelf: 'center', paddingBottom: ESPACO.xl },
  linha: { gap: ESPACO.md, paddingHorizontal: ESPACO.lg },
  badge: { position: 'absolute', right: -8, top: -6, backgroundColor: CORES.vermelho, borderRadius: RAIO.pill, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: ESPACO.xs },
  badgeTxt: { color: CORES.branco, fontSize: 11, fontWeight: '700' },
  buscaWrap: { flexDirection: 'row', alignItems: 'center', gap: ESPACO.sm, backgroundColor: CORES.branco, margin: ESPACO.lg, marginBottom: ESPACO.sm, paddingHorizontal: ESPACO.md, borderRadius: RAIO.md, borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  buscaInput: { flex: 1, paddingVertical: ESPACO.md, color: CORES.texto, outlineStyle: 'none' },
  secao: { fontSize: 16, fontWeight: '800', color: CORES.texto, paddingHorizontal: ESPACO.lg, marginBottom: ESPACO.md, marginTop: ESPACO.sm },
  carrossel: { gap: ESPACO.md, paddingHorizontal: ESPACO.lg, paddingBottom: ESPACO.sm },
  chips: { gap: ESPACO.sm, paddingHorizontal: ESPACO.lg, paddingBottom: ESPACO.md },
  cat: { paddingHorizontal: ESPACO.lg, paddingVertical: ESPACO.sm, borderRadius: RAIO.pill, backgroundColor: CORES.branco, borderWidth: 1, borderColor: CORES.borda },
  catAtiva: { backgroundColor: CORES.azul, borderColor: CORES.azul },
  catTxt: { color: CORES.texto, fontSize: 13 },
  catTxtAtiva: { color: CORES.branco, fontWeight: '700' },
  vazio: { textAlign: 'center', color: CORES.textoClaro, marginTop: 40, width: '100%' },
});
