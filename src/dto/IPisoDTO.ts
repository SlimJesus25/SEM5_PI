export default interface IPisoDTO {
    id: string;
    descricao: string;
    designacao: string; 
    sala: string[]; // string[]: designação (única) sala
  }
  