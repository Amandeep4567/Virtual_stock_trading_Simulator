// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();
  if (
    !uri ||
    (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))
  ) {
    console.error(
      "MONGO_URI missing or invalid — must start with mongodb:// or mongodb+srv:// (check Vercel env name is exactly MONGO_URI)"
    );
    if (process.env.VERCEL !== "1") process.exit(1);
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // On Vercel, process.exit() tears down the serverless isolate and becomes a 500.
    if (process.env.VERCEL !== "1") process.exit(1);
  }
};

export default connectDB;
