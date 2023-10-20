import { IPisoPersistence } from '../../dataschema/IPisoPersistence';
import mongoose from 'mongoose';

const Piso = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    descricao: {
      type: String,
      index: true,
    },

    designacao: {
      type: String,
      required: [true, 'Introduza designação'],
      index: true,
    },

    salas: {
      type: Array<String>,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPisoPersistence & mongoose.Document>('Piso', Piso);
