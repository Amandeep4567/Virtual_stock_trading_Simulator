import React from "react";
import PortfolioList from "../components/Portfolio/PortfolioList";
import Navbar from "../components/Common/Navbar";

const PortfolioPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Your Portfolio</h1>
      <PortfolioList />
    </div>
  );
};

export default PortfolioPage;
