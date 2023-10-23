
export default interface IEdificioDTO {
    id: string;
    dimensaoMaxima: number;
    descricao: string;
    nomeOpcional: string;
    codigoEdificio: string;
    elevador: number; // number: número identificativo.
    pisos: string[]; // string[]: designações (únicas) de pisos.
    mapaEdificio: string; // ver algo que identifique o mapa para além de ID.
  }
  