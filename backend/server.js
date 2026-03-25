// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import updateLeaderboard from "./services/leaderboardService.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Wait for MongoDB before /api routes (avoids Mongoose "buffering timed out" on Vercel)
app.use(async (req, res, next) => {
  if (!req.originalUrl.startsWith("/api")) {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("connectDB middleware:", err);
    res.status(503).json({ message: "Database unavailable" });
  }
});

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Virtual stock trading API — use routes under /api" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Full recomputation on boot is slow for serverless (cold start); trades still refresh via tradeController.
if (process.env.VERCEL !== "1") {
  updateLeaderboard();
}

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
