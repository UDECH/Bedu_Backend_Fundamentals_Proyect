import { Router } from "express";
import { validationResult } from "express-validator";
import passport from "passport";
import { mongoIdValidationSchema, paginationValidationSchema } from "../schemas/common.js";
import { createCamionValidationSchema, updateCamionValidationSchema } from "../schemas/camiones.js";
import Camion from "../models/Camion.js";

const router = Router();

// Crear Camion

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCamionValidationSchema,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const camion = await Camion.create(req.body);

    return res.json(camion);
  }
);

// Obtener Camion

router.get("/", paginationValidationSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;

  const Camiones = await Camion.find().skip(startIndex).limit(limit);
  const totalCamiones = await Camion.countDocuments();

  return res.json({
    page,
    limit,
    totalPages: Math.ceil(totalCamiones / limit),
    totalCamiones,
    Camiones,
  });
});

router.get("/:id", mongoIdValidationSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const camion = await Camion.findById(req.params.id);

  if (!camion) {
    return res.status(404).json({ message: "Camion no encontrado" });
  }

  res.json(camion);
});

// Actualizar Camion

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateCamionValidationSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedCamion = await Camion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCamion) {
      return res.status(404).json({ message: "Camion no encontrado" });
    }

    res.json(updatedCamion);
  }
);

// Eliminar Camion

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  mongoIdValidationSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deletedCamion = await Camion.findByIdAndDelete(req.params.id);

    if (!deletedCamion) {
      return res.status(404).json({ message: "Camion no encontrado" });
    }

    res.json({ message: "Producto eliminado exitosamente", deletedCamion });
  }
);

export default router;
