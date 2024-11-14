import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerOptions.js";
import jwtStrategy from "./auth/jtw-strategy.js";
import { setupDatabase } from "./database.js";
import authRoutes from "./routes/auth.js";
import camionRoutes from "./routes/Camiones.js";

/* -------------------------------------------------------------------------- */
export function createApp() {
  const app = express();
  setupDatabase();
  passport.use(jwtStrategy);

  // Middleware
  app.use(express.json()); //Parseo de cuerpo JSON
  app.use(express.urlencoded({ extended: true })); // 
  app.use(cors())  // CORS para acceso en HTML
  app.use(helmet()); // Seguridad con helmet
  app.use(morgan("tiny")); // Logueo
  app.use(passport.initialize()); // Autenticación 

  // Rutas
  app.use("/camiones", camionRoutes);
  app.use("/auth", authRoutes);
  app.use("/api/documents", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.get("/", (req, res) => {
    res.send("Bedu_Boot");
  });

  return app;
}