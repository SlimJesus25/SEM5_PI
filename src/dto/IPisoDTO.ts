export default interface IPisoDTO {
    id: string;
    descricao: string;
    designacao: string; 
    salas: string[]; // string[]: designação (única) sala
  }
  