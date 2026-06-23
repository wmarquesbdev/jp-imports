const PLACEHOLDER = require('../../logo-jpimports.jpeg');

export const IMAGENS = {
  1: [require('../../assets/produtos/1/1.jpg'), require('../../assets/produtos/1/2.jpg'), require('../../assets/produtos/1/3.jpg'), require('../../assets/produtos/1/4.jpg'), require('../../assets/produtos/1/5.jpg'), require('../../assets/produtos/1/6.jpg')],
  2: [require('../../assets/produtos/2/1.jpg'), require('../../assets/produtos/2/2.jpg'), require('../../assets/produtos/2/3.jpg')],
  3: [require('../../assets/produtos/3/1.jpg'), require('../../assets/produtos/3/2.jpg'), require('../../assets/produtos/3/3.jpg'), require('../../assets/produtos/3/4.jpg'), require('../../assets/produtos/3/5.jpg'), require('../../assets/produtos/3/6.jpg'), require('../../assets/produtos/3/7.jpg'), require('../../assets/produtos/3/8.jpg')],
  4: [require('../../assets/produtos/4/1.jpg'), require('../../assets/produtos/4/2.jpg'), require('../../assets/produtos/4/3.jpg')],
  5: [require('../../assets/produtos/5/1.jpg'), require('../../assets/produtos/5/2.jpg'), require('../../assets/produtos/5/3.jpg'), require('../../assets/produtos/5/4.jpg'), require('../../assets/produtos/5/5.jpg')],
  6: [require('../../assets/produtos/6/1.jpg'), require('../../assets/produtos/6/2.jpg'), require('../../assets/produtos/6/3.jpg')],
  7: [require('../../assets/produtos/7/1.jpg'), require('../../assets/produtos/7/2.jpg'), require('../../assets/produtos/7/3.jpg')],
  8: [require('../../assets/produtos/8/1.jpg'), require('../../assets/produtos/8/2.jpg'), require('../../assets/produtos/8/3.jpg'), require('../../assets/produtos/8/4.jpg')],
  9: [require('../../assets/produtos/9/1.jpg'), require('../../assets/produtos/9/2.jpg'), require('../../assets/produtos/9/3.jpg'), require('../../assets/produtos/9/4.jpg'), require('../../assets/produtos/9/5.jpg'), require('../../assets/produtos/9/6.jpg'), require('../../assets/produtos/9/7.jpg')],
  10: [require('../../assets/produtos/10/1.jpg'), require('../../assets/produtos/10/2.jpg'), require('../../assets/produtos/10/3.jpg'), require('../../assets/produtos/10/4.jpg'), require('../../assets/produtos/10/5.jpg'), require('../../assets/produtos/10/6.jpg'), require('../../assets/produtos/10/7.jpg'), require('../../assets/produtos/10/8.jpg'), require('../../assets/produtos/10/9.jpg')],
  11: [require('../../assets/produtos/11/1.jpg'), require('../../assets/produtos/11/2.jpg'), require('../../assets/produtos/11/3.jpg'), require('../../assets/produtos/11/4.jpg'), require('../../assets/produtos/11/5.jpg'), require('../../assets/produtos/11/6.jpg'), require('../../assets/produtos/11/7.jpg')],
  12: [require('../../assets/produtos/12/1.jpg'), require('../../assets/produtos/12/2.jpg'), require('../../assets/produtos/12/3.jpg'), require('../../assets/produtos/12/4.jpg'), require('../../assets/produtos/12/5.jpg')],
  13: [require('../../assets/produtos/13/1.jpg'), require('../../assets/produtos/13/2.jpg'), require('../../assets/produtos/13/3.jpg'), require('../../assets/produtos/13/4.jpg'), require('../../assets/produtos/13/5.jpg'), require('../../assets/produtos/13/6.jpg'), require('../../assets/produtos/13/7.jpg'), require('../../assets/produtos/13/8.jpg')],
  14: [require('../../assets/produtos/14/1.jpg'), require('../../assets/produtos/14/2.jpg'), require('../../assets/produtos/14/3.jpg'), require('../../assets/produtos/14/4.jpg')],
};

export const imagensDoProduto = (id) => (IMAGENS[id] && IMAGENS[id].length ? IMAGENS[id] : [PLACEHOLDER]);
export const imagemDoProduto = (id) => imagensDoProduto(id)[0];
