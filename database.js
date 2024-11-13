import mongoose from "mongoose";

export async function setupDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conexion Exitosa");
  } catch (err) {
    console.error("Fallo en Conexion", err);
    process.exit(1);
  }
}