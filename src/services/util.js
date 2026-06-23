export function formatarPreco(valor) {
  return 'R$ ' + Number(valor || 0).toFixed(2).replace('.', ',');
}

export function precoExibicao(produto) {
  if (produto.precoAte && produto.precoAte !== produto.preco) {
    return 'A partir de ' + formatarPreco(produto.preco);
  }
  return formatarPreco(produto.preco);
}

export function precoDaVariacao(produto, selecoes) {
  for (const v of (produto.variacoes || [])) {
    if (v.precos) {
      const op = selecoes[v.tipo];
      if (op && v.precos[op] != null) return v.precos[op];
    }
  }
  return produto.preco;
}
