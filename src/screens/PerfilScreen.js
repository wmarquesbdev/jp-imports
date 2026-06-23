import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES, ESPACO, RAIO, SOMBRA, LOJA } from '../theme/cores';
import BotaoPrimario from '../components/BotaoPrimario';
import { useAuth } from '../context/AuthContext';

function Linha({ icone, texto, onPress }) {
  const Cont = onPress ? TouchableOpacity : View;
  return (
    <Cont style={s.linha} onPress={onPress}>
      <Ionicons name={icone} size={20} color={CORES.azul} />
      <Text style={s.linhaTxt}>{texto}</Text>
    </Cont>
  );
}

export default function PerfilScreen() {
  const { usuario, sair } = useAuth();
  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <View style={s.cabecalho}>
        <Image source={require('../../logo-jpimports.jpeg')} style={s.logo} resizeMode="cover" />
        <Text style={s.nome}>{usuario?.nome}</Text>
        <Text style={s.email}>{usuario?.email}</Text>
      </View>

      <View style={s.bloco}>
        <Text style={s.blocoTit}>Sobre a loja</Text>
        <Linha icone="logo-whatsapp" texto={LOJA.whatsappExibicao} onPress={() => Linking.openURL('https://wa.me/' + LOJA.whatsapp)} />
        <Linha icone="location-outline" texto={LOJA.endereco} />
        <Linha icone="storefront-outline" texto={LOJA.nomeCompleto} />
        {LOJA.email ? <Linha icone="mail-outline" texto={LOJA.email} onPress={() => Linking.openURL('mailto:' + LOJA.email)} /> : null}
        {LOJA.site ? <Linha icone="globe-outline" texto="Loja na Shopee" onPress={() => Linking.openURL(LOJA.site)} /> : null}
      </View>

      <View style={{ height: ESPACO.xl }} />
      <BotaoPrimario titulo="Sair" cor={CORES.vermelho} onPress={sair} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo },
  conteudo: { padding: ESPACO.lg, width: '100%', maxWidth: 560, alignSelf: 'center' },
  cabecalho: { alignItems: 'center', marginTop: ESPACO.sm },
  logo: { width: 96, height: 96, borderRadius: 48, backgroundColor: CORES.branco, ...SOMBRA.card },
  nome: { textAlign: 'center', fontSize: 20, fontWeight: '800', color: CORES.texto, marginTop: ESPACO.md },
  email: { textAlign: 'center', color: CORES.textoClaro, marginBottom: ESPACO.sm },
  bloco: { backgroundColor: CORES.branco, borderRadius: RAIO.md, padding: ESPACO.lg, marginTop: ESPACO.lg, borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  blocoTit: { fontWeight: '800', color: CORES.texto, marginBottom: ESPACO.md, fontSize: 15 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: ESPACO.md, paddingVertical: ESPACO.sm },
  linhaTxt: { color: CORES.texto, fontSize: 14 },
});
