
export default interface IPassagemDTO {
    id: string;
    designacao: string; // identificador de passagem.
    edificioOrigem: string; // string: código edificio
    edificioDestino: string; // string: código edificio
    pisoOrigem: string; // string: designação (única) 
    pisoDestino: string; // string: designação (única) edificio
  }
  