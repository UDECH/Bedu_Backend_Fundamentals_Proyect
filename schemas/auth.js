import { checkSchema } from "express-validator";
import User from "../models/User.js";

/* ---------------------------------- login --------------------------------- */
export const loginValidationSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Proporcione Correo Valido",
    },
    normalizeEmail: true,
    exists: {
      errorMessage: "Correo es requerido",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Contrasena debe de tener al menos 8 caracteres",
    },
    exists: {
      errorMessage: "Contrasena es requerida",
    },
  },
});
/* ------------------------------- suscripcion ------------------------------ */
export const signupValidationSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Proporcione correo valido",
    },
    normalizeEmail: true,
    custom: {
      options: async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Correo ya se encuentra en uso.");
        }
      },
      bail: true,
    },
    exists: {
      errorMessage: "Correo es requerido",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Contrasena debe de tener al menos 8 caracteres",
    },
    exists: {
      errorMessage: "Contrasena es requerida",
    },
  },
  name: {
    in: ["body"],
    isLength: {
      options: { min: 2 },
      errorMessage: "El nombre de tener al menos 4 caracteres",
    },
    trim: true,
    escape: true,
    exists: {
      errorMessage: "El nombre es requerido",
    },
  },
});
