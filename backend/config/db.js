// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set");
    if (process.env.VERCEL !== "1") process.exit(1);
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // On Vercel, process.exit() tears down the serverless isolate and becomes a 500.
    if (process.env.VERCEL !== "1") process.exit(1);
  }
};

export default connectDB;
