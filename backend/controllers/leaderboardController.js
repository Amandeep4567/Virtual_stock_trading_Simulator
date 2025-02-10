// controllers/leaderboardController.js
import asyncHandler from "express-async-handler";
import Leaderboard from "../models/Leaderboard.js";

// @desc    Get leaderboard data
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = asyncHandler(async (req, res) => {
  // Fetch the top 10 users from the leaderboard
  const leaderboard = await Leaderboard.find()
    .sort({ portfolioValue: -1 })
    .limit(10)
    .populate("user", "username");

  res.json(leaderboard);
});

export { getLeaderboard };
