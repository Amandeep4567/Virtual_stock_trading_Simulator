import React from "react";
import PortfolioSummary from "./PortfolioSummary";
import Leaderboard from "../Leaderboard/Leaderboard";
import Navbar from "../Common/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <PortfolioSummary />
      <Leaderboard />
    </div>
  );
};

export default Dashboard;
