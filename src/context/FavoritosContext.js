import React, { createContext, useState, useEffect, useContext } from 'react';
import { ler, salvar } from '../services/armazenamento';

const CHAVE = '@jpimports:favoritos';
export const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const [ids, setIds] = useState([]);

  useEffect(() => { (async () => { setIds(await ler(CHAVE, [])); })(); }, []);
  useEffect(() => { salvar(CHAVE, ids); }, [ids]);

  function alternar(id) {
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }
  function ehFavorito(id) { return ids.includes(id); }

  return (
    <FavoritosContext.Provider value={{ ids, alternar, ehFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export const useFavoritos = () => useContext(FavoritosContext);
