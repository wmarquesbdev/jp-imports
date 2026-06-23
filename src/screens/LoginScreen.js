import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { CORES, ESPACO, RAIO, SOMBRA } from '../theme/cores';
import CampoTexto from '../components/CampoTexto';
import BotaoPrimario from '../components/BotaoPrimario';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginScreen({ navigation }) {
  const { entrar } = useAuth();
  const { mostrar } = useToast();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function aoEntrar() {
    setCarregando(true);
    const r = await entrar(email, senha);
    setCarregando(false);
    if (!r.ok) mostrar(r.erro, 'erro');
  }

  return (
    <KeyboardAvoidingView style={s.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.cont} keyboardShouldPersistTaps="handled">
        <View style={s.cartao}>
          <Image source={require('../../logo-jpimports.jpeg')} style={s.logo} resizeMode="cover" />
          <Text style={s.titulo}>JP Imports</Text>
          <Text style={s.sub}>Entre para continuar suas compras</Text>
          <CampoTexto rotulo="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="seu@email.com" />
          <CampoTexto rotulo="Senha" value={senha} onChangeText={setSenha} secureTextEntry placeholder="sua senha" />
          <BotaoPrimario titulo="Entrar" onPress={aoEntrar} carregando={carregando} />
          <TouchableOpacity style={s.link} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={s.linkTxt}>Nao tem conta? <Text style={s.linkForte}>Cadastre-se</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo },
  cont: { flexGrow: 1, justifyContent: 'center', padding: ESPACO.xl },
  cartao: { width: '100%', maxWidth: 420, alignSelf: 'center', backgroundColor: CORES.branco, borderRadius: RAIO.lg, padding: ESPACO.xl, borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  logo: { alignSelf: 'center', width: 96, height: 96, borderRadius: 48, marginBottom: ESPACO.lg, backgroundColor: CORES.branco },
  titulo: { fontSize: 26, fontWeight: '800', color: CORES.texto, textAlign: 'center' },
  sub: { fontSize: 14, color: CORES.textoClaro, textAlign: 'center', marginBottom: ESPACO.xl },
  link: { marginTop: ESPACO.lg, alignItems: 'center' },
  linkTxt: { color: CORES.textoClaro },
  linkForte: { fontWeight: '700', color: CORES.azul },
});
