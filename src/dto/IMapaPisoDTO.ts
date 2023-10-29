
export default interface IMapaPisoDTO {
    id: string;
    piso: string;
    mapaLargura: number;
    mapaProfundidade: number;
    mapaPiso: number[][]; // Deve coincidir com a largura e a profunidade.
    mapaSaidaLocalizacao: number[]; // Deve estar dentro das medidas.
    mapaElevador: number[];
    mapaSaidas: number[][];
  }
  