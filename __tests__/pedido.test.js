import { montarMensagem } from '../src/services/pedido';

describe('montagem do pedido', () => {
  const usuario = { nome: 'Maria' };
  const itens = [
    { nome: 'Copo Termico', selecoes: { Cor: 'Azul' }, precoUnit: 35, quantidade: 2 },
    { nome: 'Squishy', selecoes: {}, precoUnit: 18, quantidade: 1 },
  ];

  test('inclui cliente, itens, variacoes e total', () => {
    const msg = montarMensagem(usuario, itens, 88, '');
    expect(msg).toContain('JP Imports');
    expect(msg).toContain('Cliente: Maria');
    expect(msg).toContain('1. Copo Termico');
    expect(msg).toContain('Cor: Azul');
    expect(msg).toContain('Qtd: 2');
    expect(msg).toContain('2. Squishy');
    expect(msg).toContain('*Total: R$ 88,00*');
  });

  test('inclui observacao apenas quando preenchida', () => {
    expect(montarMensagem(usuario, itens, 88, 'sem pressa')).toContain('Obs: sem pressa');
    expect(montarMensagem(usuario, itens, 88, '   ')).not.toContain('Obs:');
  });
});
