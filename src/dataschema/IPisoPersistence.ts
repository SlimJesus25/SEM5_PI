export interface IPisoPersistence {
	_id: string;
	descricao: string;
	designacao: string;
	salas: string[]; // Designações das salas (que identificam-nas).
  }