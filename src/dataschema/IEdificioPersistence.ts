export interface IEdificioPersistence {
	_id: string;
	codigo: string;
	nomeOpcional: string;
	descricao: string;
	dimensaoMaxima: number;
	elevadores: number; // Número identificativo do elevador.
	pisos: string[]; // Designação (única).
    mapa: string;
  }