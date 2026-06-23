import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES, ESPACO, LARGURA_MAXIMA } from '../theme/cores';
import { buscarProdutos } from '../services/api';
import ProdutoCard from '../components/ProdutoCard';
import { useFavoritos } from '../context/FavoritosContext';
import { useGrade } from '../hooks/useGrade';

export default function FavoritosScreen({ navigation }) {
  const { ids } = useFavoritos();
  const [produtos, setProdutos] = useState([]);
  const { colunas, larguraCelula } = useGrade();

  useEffect(() => { (async () => { const { dados } = await buscarProdutos(); setProdutos(dados); })(); }, []);

  const favoritos = produtos.filter(p => ids.includes(p.id));

  if (favoritos.length === 0) {
    return (
      <View style={s.vazio}>
        <Ionicons name="heart-outline" size={60} color={CORES.borda} />
        <Text style={s.txt}>Voce ainda nao favoritou nada</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={s.tela}
      key={'cols-' + colunas}
      data={favoritos}
      keyExtractor={p => String(p.id)}
      numColumns={colunas}
      columnWrapperStyle={s.linha}
      contentContainerStyle={s.conteudo}
      renderItem={({ item }) => (
        <View style={{ width: larguraCelula, marginBottom: ESPACO.md }}>
          <ProdutoCard produto={item} onPress={() => navigation.navigate('Detalhe', { produto: item })} />
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  tela: { backgroundColor: CORES.fundo },
  conteudo: { width: '100%', maxWidth: LARGURA_MAXIMA, alignSelf: 'center', paddingVertical: ESPACO.lg },
  linha: { gap: ESPACO.md, paddingHorizontal: ESPACO.lg },
  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo, gap: ESPACO.md },
  txt: { color: CORES.textoClaro, fontSize: 16 },
});
