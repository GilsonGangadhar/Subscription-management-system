import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to database via ${NODE_ENV} mode`);
  } catch (err) {
    console.error("Error connecting to database", err);
    process.exit(1);
  }
}

export default connectToDatabase;
