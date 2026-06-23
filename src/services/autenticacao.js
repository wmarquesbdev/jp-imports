import * as Crypto from 'expo-crypto';
import { ler, salvar, remover } from './armazenamento';

const CHAVE_USUARIOS = '@jpimports:usuarios';
const CHAVE_SESSAO = '@jpimports:sessao';

export async function gerarHash(senha) {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, senha);
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function cadastrar(nome, email, senha) {
  if (!nome || !email || !senha) return { ok: false, erro: 'Preencha todos os campos.' };
  if (!emailValido(email)) return { ok: false, erro: 'E-mail invalido.' };
  if (senha.length < 4) return { ok: false, erro: 'A senha precisa de ao menos 4 caracteres.' };
  const usuarios = await ler(CHAVE_USUARIOS, []);
  const e = email.trim().toLowerCase();
  if (usuarios.some(u => u.email === e)) return { ok: false, erro: 'Este e-mail ja esta cadastrado.' };
  const hash = await gerarHash(senha);
  usuarios.push({ nome: nome.trim(), email: e, senha: hash });
  await salvar(CHAVE_USUARIOS, usuarios);
  return { ok: true, usuario: { nome: nome.trim(), email: e } };
}

export async function entrar(email, senha) {
  if (!email || !senha) return { ok: false, erro: 'Preencha e-mail e senha.' };
  const usuarios = await ler(CHAVE_USUARIOS, []);
  const e = email.trim().toLowerCase();
  const hash = await gerarHash(senha);
  const u = usuarios.find(x => x.email === e && x.senha === hash);
  if (!u) return { ok: false, erro: 'E-mail ou senha incorretos.' };
  const sessao = { nome: u.nome, email: u.email };
  await salvar(CHAVE_SESSAO, sessao);
  return { ok: true, usuario: sessao };
}

export async function lerSessao() { return await ler(CHAVE_SESSAO, null); }
export async function sair() { await remover(CHAVE_SESSAO); }
