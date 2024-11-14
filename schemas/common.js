import { checkSchema } from "express-validator";

export const mongoIdValidator = {
  in: ["params"],
  isMongoId: {
    errorMessage: "Formato no valido. Debe ser un objeto de MongoDB valido",
  },
};

export const mongoIdValidationSchema = checkSchema({
  id: mongoIdValidator,
});

export const paginationValidationSchema = checkSchema({
  page: {
    in: ["query"],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 1 },
      errorMessage: "La pagina debe de ser un entero positivo",
    },
    toInt: true,
  },
  limit: {
    in: ["query"],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 1 },
      errorMessage: "El limite de paginas debe de ser un numero entero positivo",
    },
    toInt: true,
  },
});
