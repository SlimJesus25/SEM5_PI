import mongoose from 'mongoose';
import { IMapaPisoPersistence } from '../../dataschema/IMapaPisoPersistence';

const MapaPisoSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    piso: { type: String, unique: true},
    mapaLargura: { type: Number, unique: false},
    mapaProfundidade: { type: Number, unique: false},
    mapaPiso: { type: [[Number]], unique: false},
    mapaSaidaLocalizacao: { type: [Number], unique: false},
    mapaElevador: { type: [Number], unique: false},
    mapaSaidas: { type: [[Number]], unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMapaPisoPersistence & mongoose.Document>('MapaPiso', MapaPisoSchema);
