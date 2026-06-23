import React, { createContext, useState, useEffect, useContext } from 'react';
import { ler, salvar } from '../services/armazenamento';

const CHAVE = '@jpimports:historico';
export const HistoricoContext = createContext(null);

export function HistoricoProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => { (async () => { setPedidos(await ler(CHAVE, [])); })(); }, []);

  async function registrar(pedido) {
    const novo = [{ ...pedido, id: Date.now(), data: new Date().toISOString() }, ...pedidos];
    setPedidos(novo);
    await salvar(CHAVE, novo);
  }

  return (
    <HistoricoContext.Provider value={{ pedidos, registrar }}>
      {children}
    </HistoricoContext.Provider>
  );
}

export const useHistorico = () => useContext(HistoricoContext);
