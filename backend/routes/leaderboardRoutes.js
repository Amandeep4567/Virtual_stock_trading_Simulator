// routes/leaderboardRoutes.js
import express from "express";
const router = express.Router();
import { getLeaderboard } from "../controllers/leaderboardController.js";

// Get leaderboard data
router.get("/", getLeaderboard);

export default router;
