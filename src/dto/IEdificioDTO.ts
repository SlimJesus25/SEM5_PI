
export default interface IEdificioDTO {
    id: string;
    dimensaoMaxima: number;
    descricao: string;
    nomeOpcional: string;
    codigoEdificio: string;
    elevador: string;
    pisos: Array<string>;
    mapaEdificio: string;
  }
  