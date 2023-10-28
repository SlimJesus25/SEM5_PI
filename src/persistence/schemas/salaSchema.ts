import { ISalaPersistence } from '../../dataschema/ISalaPersistence';
import mongoose from 'mongoose';

const SalaSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    descricao: { type: String, unique: false },
    categoria: { type: String, unique: false },
    designacao: { type: String, unique: true },
    piso: { type: String, unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ISalaPersistence & mongoose.Document>('Sala', SalaSchema);
