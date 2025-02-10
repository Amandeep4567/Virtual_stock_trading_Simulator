import React, { useState, useEffect } from "react";
import PortfolioItem from "./PortfolioItem";
import api from "../../services/api";

const PortfolioList = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/user/portfolio");
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, []);

  if (!portfolio) return <div>Loading portfolio...</div>;

  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {portfolio.portfolio.map((holding) => (
          <PortfolioItem key={holding.stockSymbol} holding={holding} />
        ))}
      </ul>
    </div>
  );
};

export default PortfolioList;
