import mongoose from 'mongoose';

const EstadoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  elemento: { type: String, required: true },
  valor: { type: Number, required: true },
  unidad_modelo: { type: String, required: true },
  fecha_hora: { type: Date, default: Date.now }
});

export default mongoose.model('Estado', EstadoSchema);