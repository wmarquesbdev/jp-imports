<div align="center">
  <img src="logo-jpimports.jpeg" width="120" alt="JP Imports" />

  # JP Imports

  App mobile de catálogo e-commerce da loja de variedades **JP Imports 2025** (Campo Grande - MS):
  garrafas e caixas térmicas, itens de tereré e chimarrão, camping, eletrônicos, brinquedos e mais.

  **🔗 App online (Android e iPhone): [jpimportsms.netlify.app](https://jpimportsms.netlify.app)**

  **📲 APK para Android: [baixar e instalar pelo Expo](https://expo.dev/accounts/denzsync/projects/app-jp-imports/builds/05cfb023-7666-4c01-a25c-22e8e3b51496)**

  `React Native` · `Expo` · `Android e Web`
</div>

---

## 📲 Baixar o app no Android (APK)

Além da versão web, há um **APK** instalável, gerado com **EAS Build** (Expo):

1. No celular Android, abra o link:
   <https://expo.dev/accounts/denzsync/projects/app-jp-imports/builds/05cfb023-7666-4c01-a25c-22e8e3b51496>
2. Toque em **Install** para baixar o arquivo `.apk`.
3. Abra o `.apk` e permita **instalar de fontes desconhecidas** → **Instalar**.

> O iPhone não instala APK — no iOS, use o link da web acima.

## Como funciona (resumo)

O cliente abre o app, **navega pelo catálogo** de produtos, **favorita** o que gostar,
escolhe as **variações** (cor, capacidade, tamanho…), monta o **carrinho** e, ao finalizar, o app
**abre o WhatsApp da loja com o pedido já escrito** — é só enviar.

- Não tem pagamento online nem servidor próprio.
- Login e dados (carrinho, favoritos, histórico) ficam **salvos no próprio aparelho**.
- Funciona **100% offline**, usando o catálogo local (14 produtos reais em 7 categorias).

## Tecnologias

- **Expo (SDK 54)** + **React Native 0.81** + **React 19**
- **react-native-web** — o mesmo código roda no navegador (publicado na Web)
- **React Navigation** (abas + pilha de telas)
- **AsyncStorage** (sessão, carrinho, favoritos, histórico)
- **expo-crypto** (senha guardada como hash SHA-256)
- **axios** (busca opcional em API REST, com retorno automático ao catálogo local)
- **Jest** (testes)

## Funcionalidades

- Cadastro e login (offline, no aparelho)
- Catálogo com busca, categorias e vitrine de destaques
- Tela de detalhe com seleção de variação e **preço que muda conforme a opção**
- Carrinho com somar/alterar/remover e total automático
- Favoritos e histórico de pedidos
- Finalização do pedido pelo **WhatsApp** (mensagem já formatada)
- Avisos (toast) próprios que funcionam tanto no app quanto na web
- Layout **responsivo** (celular, tablet e navegador)

## Como executar (local)

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
npm install          # instala as dependências
npx expo start       # roda o app
```

No terminal, tecle `w` para abrir no **navegador** ou `a` para abrir no **Android**.

### Rodar no iPhone

1. Instale o app **Expo Go** pela App Store.
2. Rode `npx expo start` e deixe o iPhone na **mesma rede Wi-Fi** do computador.
3. Abra a **Câmera**, aponte para o QR code do terminal e toque em "Abrir no Expo Go".

> Se o iPhone não conectar (firewall do Windows costuma bloquear), rode `npx expo start --tunnel`.

## Testes

```bash
npm test
```

## Build e publicação na Web

```bash
npm run build        # gera a versão web em dist/  (expo export --platform web)
```

O deploy é **contínuo no Netlify**: a cada `git push` na branch `main`, o site
[jpimportsms.netlify.app](https://jpimportsms.netlify.app) é reconstruído automaticamente
(config em `netlify.toml`).

## Estrutura

```
App.js                ponto de entrada (providers + navegação)
products.json         catálogo (espelho dos dados, para API opcional)
netlify.toml          configuração de build/deploy na Web
src/
  data/               produtos.js (catálogo) e imagens.js (mapa de imagens por id)
  services/           api, armazenamento, autenticação, pedido (WhatsApp), util
  context/            estado global (auth, carrinho, favoritos, histórico, toast)
  components/          componentes reutilizáveis (cartão, botão, campo, seletor)
  hooks/              hook de grade responsiva
  navigation/         navegação (login condicional + abas)
  screens/            as 9 telas do app
  theme/              cores, espaçamentos e dados da loja
assets/produtos/      imagens dos produtos (1.jpg … 14.jpg, padronizadas)
__tests__/            testes (Jest)
```

## API remota (opcional)

O app usa o catálogo local de `src/data/produtos.js`. Para ligar uma API REST
(ex.: MockAPI.io servindo o `products.json`), preencha `URL_API` em `src/services/api.js`.
Se a rede falhar, o app volta sozinho para o catálogo local.

## Projeto de extensão

Aplicativo desenvolvido em parceria com a empresa **SAFF Comércio de Importados** (nome fantasia
**JP Imports**), de Campo Grande/MS, representada pelo proprietário **Juliano César Saff**. O objetivo
é dar à loja um canal de vendas digital próprio e valorizar a cultura regional do tereré.

- **Loja parceira:** SAFF Comércio de Importados — [Shopee: jpimports801](https://shopee.com.br/jpimports801)
- **Equipe:** William Marques Barbosa · Breno Soares Dourado · Helen Sofia Pereira de Melo
- **Orientação:** Profa. Enilda Caceres

---

Trabalho acadêmico de extensão — Análise e Desenvolvimento de Sistemas (Estácio),
disciplina de Programação para Dispositivos Móveis em Android.
