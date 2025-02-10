// models/Leaderboard.js
import mongoose from "mongoose";

const leaderboardSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    portfolioValue: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
