import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Navbar from "../components/Common/Navbar";

const LeaderboardPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Leaderboard</h1>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
