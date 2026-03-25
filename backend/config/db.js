// config/db.js — cache connection for Vercel serverless (reuse within same isolate)
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CACHE_KEY = "__vst_mongoose_cache";

function getCache() {
  const g = globalThis;
  if (!g[CACHE_KEY]) {
    g[CACHE_KEY] = { conn: null, promise: null };
  }
  return g[CACHE_KEY];
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();
  if (
    !uri ||
    (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))
  ) {
    const msg =
      "MONGO_URI missing or invalid — must start with mongodb:// or mongodb+srv:// (Vercel env name: MONGO_URI)";
    console.error(msg);
    if (process.env.VERCEL !== "1") process.exit(1);
    throw new Error(msg);
  }

  const cached = getCache();
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20_000,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error(`MongoDB connection error: ${error.message}`);
    if (process.env.VERCEL !== "1") process.exit(1);
    throw error;
  }

  return cached.conn;
};

export default connectDB;
