import { Linking, Platform } from 'react-native';
import { LOJA } from '../theme/cores';
import { formatarPreco } from './util';

export function montarMensagem(usuario, itens, total, obs) {
  const linhas = [];
  linhas.push('*Novo pedido - JP Imports*');
  if (usuario && usuario.nome) linhas.push('Cliente: ' + usuario.nome);
  linhas.push('');
  itens.forEach((it, i) => {
    linhas.push((i + 1) + '. ' + it.nome);
    const v = Object.entries(it.selecoes || {}).map(([k, val]) => k + ': ' + val).join(' | ');
    if (v) linhas.push('   ' + v);
    linhas.push('   Qtd: ' + it.quantidade + '  -  ' + formatarPreco(it.precoUnit * it.quantidade));
  });
  linhas.push('');
  linhas.push('*Total: ' + formatarPreco(total) + '*');
  if (obs && obs.trim()) { linhas.push(''); linhas.push('Obs: ' + obs.trim()); }
  return linhas.join('\n');
}

export async function enviarWhatsApp(mensagem) {
  const url = 'https://wa.me/' + LOJA.whatsapp + '?text=' + encodeURIComponent(mensagem);
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && !window.open(url, '_blank', 'noopener,noreferrer')) {
      window.location.href = url;
    }
    return true;
  }
  await Linking.openURL(url);
  return true;
}
