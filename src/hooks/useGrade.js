import { useWindowDimensions } from 'react-native';
import { ESPACO, LARGURA_MAXIMA } from '../theme/cores';

export function useGrade(margem = ESPACO.lg, espaco = ESPACO.md) {
  const { width } = useWindowDimensions();
  const largura = Math.min(width, LARGURA_MAXIMA);
  const colunas = largura >= 1000 ? 4 : largura >= 680 ? 3 : 2;
  const larguraCelula = Math.floor((largura - margem * 2 - espaco * (colunas - 1)) / colunas);
  return { colunas, larguraCelula, larguraConteudo: largura, larguraTela: width };
}
