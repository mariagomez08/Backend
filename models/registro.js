import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RegistroSchema = new Schema({
  nombremascota: { type: String, required: [true, "Obligatorio"] },
  edadmascota: { type: String, required: [true, "Obligatorio"] },
  listaciudad: { type: String, required: [true, "Obligatorio"] },
  especie: { type: String, required: [true, "Nombre obligatorio"] },
  genero: { type: String, required: [true, "Nombre obligatorio"] },
  foto: { type: String },

  nombredueño: { type: String, required: [true, "Obligatorio"] },
  telefonodueño: { type: String, required: [true, "Nombre obligatorio"] },
  correodueño: { type: String, required: [true, "Nombre obligatorio"] },

  date: { type: Date, default: Date.now().toString() },
  activo: { type: Boolean, default: true },
});

const registro = mongoose.model("registro", RegistroSchema);
export default registro; 
