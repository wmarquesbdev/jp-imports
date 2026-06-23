import React, { createContext, useState, useEffect, useContext } from 'react';
import { ler, salvar } from '../services/armazenamento';

const CHAVE = '@jpimports:carrinho';
export const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  useEffect(() => { (async () => { setItens(await ler(CHAVE, [])); })(); }, []);
  useEffect(() => { salvar(CHAVE, itens); }, [itens]);

  function adicionar(item) {
    setItens(prev => {
      const chave = item.produtoId + JSON.stringify(item.selecoes || {});
      const i = prev.findIndex(x => x.chave === chave);
      if (i >= 0) {
        const c = [...prev];
        c[i] = { ...c[i], quantidade: c[i].quantidade + item.quantidade };
        return c;
      }
      return [...prev, { ...item, chave }];
    });
  }

  function remover(chave) { setItens(prev => prev.filter(x => x.chave !== chave)); }

  function mudarQtd(chave, delta) {
    setItens(prev => prev.map(x => x.chave === chave ? { ...x, quantidade: Math.max(1, x.quantidade + delta) } : x));
  }

  function limpar() { setItens([]); }

  const total = itens.reduce((s, x) => s + x.precoUnit * x.quantidade, 0);
  const quantidadeTotal = itens.reduce((s, x) => s + x.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, remover, mudarQtd, limpar, total, quantidadeTotal }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);
