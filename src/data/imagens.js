const PLACEHOLDER = require('../../logo-jpimports.jpeg');

export const IMAGENS = {
  1: require('../../assets/produtos/1.jpg'),
  2: require('../../assets/produtos/2.jpg'),
  3: require('../../assets/produtos/3.jpg'),
  4: require('../../assets/produtos/4.jpg'),
  5: require('../../assets/produtos/5.jpg'),
  6: require('../../assets/produtos/6.jpg'),
  7: require('../../assets/produtos/7.jpg'),
  8: require('../../assets/produtos/8.jpg'),
  9: require('../../assets/produtos/9.jpg'),
  10: require('../../assets/produtos/10.jpg'),
  11: require('../../assets/produtos/11.jpg'),
  12: require('../../assets/produtos/12.jpg'),
  13: require('../../assets/produtos/13.jpg'),
  14: require('../../assets/produtos/14.jpg'),
};

export const imagemDoProduto = (id) => IMAGENS[id] || PLACEHOLDER;
