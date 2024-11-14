import { checkSchema } from "express-validator";
import Camion from "../models/Camion.js";
import capacidad from "./enums/capacidad.js";
import marca from "./enums/marca.js";
import modelo from "./enums/modelo.js";
import { mongoIdValidator } from "./common.js";

/* -------------------------------------------------------------------------- */
/*                               Crear unidades                               */
/* -------------------------------------------------------------------------- */
export const createCamionValidationSchema = checkSchema({
  nombre_unidad: {
    trim: true,
    escape: true,
    custom: {
      options: async (name) => {
        const CamionExists = await Camion.findOne({
          nombre_unidad: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (CamionExists) {
          throw new Error("Nombre ya se encuentra en uso.");
        }
      },
      bail: true,
    },
    isLength: {
      options: { min: 4 },
      errorMessage: "Nombre debe de tener al menos 4 caracteres.",
    },
    in: ["body"],
    exists: { errorMessage: "El nombre del producto es requerido." },
  },
  matricula: {
    exists: { errorMessage: "Matricula es requerida." },
    isLength: {
      options: { min: 4 },
      errorMessage: "Matricula debe de ser de al menos 4 caracteres.",
    },
    in: ["body"],
  },
  marca: {
    exists: { errorMessage: "Marca es requerida." },
    isIn: {
      options: [Object.values(marca)],
      errorMessage: `Marca Invalida las opciones son:  ${Object.values(marca)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
  modelo: {
    exists: { errorMessage: "Modelo es requerida." },
    isIn: {
      options: [Object.values(modelo)],
      errorMessage: `Modelo Invalida las opciones son:  ${Object.values(modelo)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
  capacidad: {
    exists: { errorMessage: "Capacidad es requerida." },
    isIn: {
      options: [Object.values(capacidad)],
      errorMessage: `Capacidad Invalida las opciones son:  ${Object.values(capacidad)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
});

/* -------------------------------------------------------------------------- */
/*                                 Actualizar                                 */
/* -------------------------------------------------------------------------- */
export const updateCamionValidationSchema = checkSchema({
  id: mongoIdValidator,
  name: {
    optional: true,
    trim: true,
    escape: true,
    custom: {
      options: async (name, { req }) => {
        const CamionExists = await Camion.findOne({
          _id: { $ne: req.params.id },
          name: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (CamionExists) {
          throw new Error("Nombre ya se encuentra en uso.");
        }
      },
      bail: true,
    },
    isLength: {
      options: { min: 4 },
      errorMessage: "Nombre debe de tener al menos 4 caracteres.",
    },
    in: ["body"],
  },
  matricula: {
    optional: true,
    isLength: {
      options: { min: 4 },
      errorMessage: "Matricula debe de ser de al menos 4 caracteres.",
    },
    in: ["body"],
  },
  marca: {
    optional: true,
    isIn: {
      options: [Object.values(marca)],
      errorMessage: `Marca Invalida las opciones son ${Object.values(marca)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
  modelo: {
    optional: true,
    isIn: {
      options: [Object.values(modelo)],
      errorMessage: `Modelo Invalida las opciones son ${Object.values(modelo)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
  capacidad: {
    optional: true,
    isIn: {
      options: [Object.values(capacidad)],
      errorMessage: `Capacidad Invalida las opciones son ${Object.values(capacidad)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
});
