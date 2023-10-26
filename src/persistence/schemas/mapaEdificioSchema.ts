import mongoose from 'mongoose';
import { IMapaEdificioPersistence } from '../../dataschema/IMapaEdificioPersistence';

const MapaEdificioSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    grelha: { type: [[String]], unique: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMapaEdificioPersistence & mongoose.Document>('MapaEdificio', MapaEdificioSchema);
