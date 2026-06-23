import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/autenticacao';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      const s = await auth.lerSessao();
      setUsuario(s);
      setCarregando(false);
    })();
  }, []);

  async function entrar(email, senha) {
    const r = await auth.entrar(email, senha);
    if (r.ok) setUsuario(r.usuario);
    return r;
  }

  async function cadastrar(nome, email, senha) {
    const r = await auth.cadastrar(nome, email, senha);
    if (r.ok) {
      const e = await auth.entrar(email, senha);
      if (e.ok) setUsuario(e.usuario);
    }
    return r;
  }

  async function sair() {
    await auth.sair();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, entrar, cadastrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
