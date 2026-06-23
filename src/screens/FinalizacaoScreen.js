import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, TextInput } from 'react-native';
import { CORES, ESPACO, RAIO } from '../theme/cores';
import { formatarPreco } from '../services/util';
import { montarMensagem, enviarWhatsApp } from '../services/pedido';
import BotaoPrimario from '../components/BotaoPrimario';
import { useCarrinho } from '../context/CarrinhoContext';
import { useAuth } from '../context/AuthContext';
import { useHistorico } from '../context/HistoricoContext';
import { useToast } from '../context/ToastContext';

export default function FinalizacaoScreen({ navigation }) {
  const { itens, total, limpar } = useCarrinho();
  const { usuario } = useAuth();
  const { registrar } = useHistorico();
  const { mostrar } = useToast();
  const [obs, setObs] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function finalizar() {
    if (itens.length === 0) { mostrar('Seu carrinho esta vazio', 'erro'); return; }
    setEnviando(true);
    const msg = montarMensagem(usuario, itens, total, obs);
    enviarWhatsApp(msg);
    await registrar({ itens, total, observacao: obs });
    limpar();
    setEnviando(false);
    mostrar('Pedido enviado pelo WhatsApp');
    navigation.navigate('Tabs');
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>Resumo do pedido</Text>
      {itens.map(it => (
        <View key={it.chave} style={s.linha}>
          <Text style={s.item} numberOfLines={1}>{it.quantidade}x {it.nome}</Text>
          <Text style={s.val}>{formatarPreco(it.precoUnit * it.quantidade)}</Text>
        </View>
      ))}
      <View style={s.divisor} />
      <View style={s.linha}>
        <Text style={s.totalL}>Total</Text>
        <Text style={s.totalV}>{formatarPreco(total)}</Text>
      </View>
      <Text style={s.rotulo}>Observacao (opcional)</Text>
      <TextInput style={s.obs} value={obs} onChangeText={setObs} placeholder="Ex.: ponto de referencia, time do copo..." multiline placeholderTextColor={CORES.textoClaro} />
      <View style={{ height: ESPACO.lg }} />
      <BotaoPrimario titulo="Enviar pedido pelo WhatsApp" cor={CORES.verde} onPress={finalizar} carregando={enviando} />
      <Text style={s.aviso}>O pedido sera aberto no WhatsApp da loja para voce confirmar.</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.branco },
  conteudo: { padding: ESPACO.lg, width: '100%', maxWidth: 640, alignSelf: 'center' },
  titulo: { fontSize: 18, fontWeight: '800', color: CORES.texto, marginBottom: ESPACO.lg },
  linha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: ESPACO.md, gap: ESPACO.md },
  item: { flex: 1, color: CORES.texto },
  val: { fontWeight: '700', color: CORES.texto },
  divisor: { height: 1, backgroundColor: CORES.borda, marginVertical: ESPACO.sm },
  totalL: { fontSize: 17, fontWeight: '800', color: CORES.texto },
  totalV: { fontSize: 20, fontWeight: '900', color: CORES.azul },
  rotulo: { marginTop: ESPACO.lg, marginBottom: ESPACO.sm, fontWeight: '600', color: CORES.texto },
  obs: { borderWidth: 1, borderColor: CORES.borda, borderRadius: RAIO.md, padding: ESPACO.md, minHeight: 80, textAlignVertical: 'top', color: CORES.texto, backgroundColor: CORES.branco, outlineStyle: 'none' },
  aviso: { fontSize: 12, color: CORES.textoClaro, textAlign: 'center', marginTop: ESPACO.md },
});
