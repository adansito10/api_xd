import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  valor: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;
  