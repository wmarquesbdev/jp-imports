import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { CORES, ESPACO, RAIO, SOMBRA } from '../theme/cores';
import CampoTexto from '../components/CampoTexto';
import BotaoPrimario from '../components/BotaoPrimario';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function CadastroScreen() {
  const { cadastrar } = useAuth();
  const { mostrar } = useToast();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function aoCadastrar() {
    setCarregando(true);
    const r = await cadastrar(nome, email, senha);
    setCarregando(false);
    if (!r.ok) mostrar(r.erro, 'erro');
  }

  return (
    <KeyboardAvoidingView style={s.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.cont} keyboardShouldPersistTaps="handled">
        <View style={s.cartao}>
          <Text style={s.titulo}>Criar conta</Text>
          <Text style={s.sub}>Leva menos de um minuto</Text>
          <CampoTexto rotulo="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
          <CampoTexto rotulo="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="seu@email.com" />
          <CampoTexto rotulo="Senha" value={senha} onChangeText={setSenha} secureTextEntry placeholder="minimo 4 caracteres" />
          <BotaoPrimario titulo="Cadastrar" onPress={aoCadastrar} carregando={carregando} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo },
  cont: { flexGrow: 1, justifyContent: 'center', padding: ESPACO.xl },
  cartao: { width: '100%', maxWidth: 420, alignSelf: 'center', backgroundColor: CORES.branco, borderRadius: RAIO.lg, padding: ESPACO.xl, borderWidth: 1, borderColor: CORES.borda, ...SOMBRA.card },
  titulo: { fontSize: 24, fontWeight: '800', color: CORES.texto, textAlign: 'center' },
  sub: { fontSize: 14, color: CORES.textoClaro, textAlign: 'center', marginBottom: ESPACO.xl },
});
