import { formatarPreco, precoDaVariacao, precoExibicao } from '../src/services/util';

describe('util de precos', () => {
  test('formatarPreco usa virgula e duas casas', () => {
    expect(formatarPreco(35)).toBe('R$ 35,00');
    expect(formatarPreco(7.5)).toBe('R$ 7,50');
    expect(formatarPreco(195.5)).toBe('R$ 195,50');
  });

  test('precoDaVariacao retorna o preco da opcao escolhida', () => {
    const jogos = {
      preco: 40,
      variacoes: [{ tipo: 'Opcao', opcoes: ['Cade?', '4 jogos'], precos: { 'Cade?': 40, '4 jogos': 102 } }],
    };
    expect(precoDaVariacao(jogos, { 'Opcao': '4 jogos' })).toBe(102);
    expect(precoDaVariacao(jogos, {})).toBe(40);
  });

  test('precoExibicao mostra "A partir de" quando ha faixa', () => {
    expect(precoExibicao({ preco: 18, precoAte: 35 })).toBe('A partir de R$ 18,00');
    expect(precoExibicao({ preco: 68 })).toBe('R$ 68,00');
  });
});
