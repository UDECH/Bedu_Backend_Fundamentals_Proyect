import { Schema, model } from "mongoose";
import capacidad from "./enums/capacidad.js";
import marca from "./enums/marca.js";
import modelo from "./enums/modelo.js";

const camionSchema = new Schema({
    nombre_unidad: {
        type: String,
        required: true,
        unique: true,
    },
    matricula: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
        enum: Object.values(marca),
    },
    modelo: {
        type: String,
        required: true,
        enum: Object.values(modelo),
    },
    capacidad: {
        type: String,
        required: true,
        enum: Object.values(capacidad),
    },
});

export default model("Camion", camionSchema);
