import AsyncStorage from '@react-native-async-storage/async-storage';

export async function salvar(chave, valor) {
  try { await AsyncStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}

export async function ler(chave, padrao = null) {
  try {
    const v = await AsyncStorage.getItem(chave);
    return v != null ? JSON.parse(v) : padrao;
  } catch (e) {
    return padrao;
  }
}

export async function remover(chave) {
  try { await AsyncStorage.removeItem(chave); } catch (e) {}
}
