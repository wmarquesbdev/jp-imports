import axios from 'axios';
import { PRODUTOS } from '../data/produtos';

export const URL_API = 'https://raw.githubusercontent.com/wmarquesbdev/jp-imports/main/products.json';

export async function buscarProdutos() {
  if (URL_API) {
    try {
      const resp = await axios.get(URL_API, { timeout: 5000 });
      if (Array.isArray(resp.data) && resp.data.length) {
        return { dados: resp.data, fonte: 'remoto' };
      }
    } catch (e) {}
  }
  return { dados: PRODUTOS, fonte: 'local' };
}
