import { IElevadorPersistence } from '../../dataschema/IElevadorPersistence';
import mongoose from 'mongoose';

const ElevadorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    designacao: { type: String, unique: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IElevadorPersistence & mongoose.Document>('Elevador', ElevadorSchema);
