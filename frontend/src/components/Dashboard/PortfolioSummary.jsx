import React, { useState, useEffect } from "react";
import api from "../../services/api";

const PortfolioSummary = () => {
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
      <h2>Portfolio Summary</h2>
      <p>Balance: ${portfolio.balance.toFixed(2)}</p>
      <h3>Holdings:</h3>
      <ul>
        {portfolio.portfolio.map((holding) => (
          <li key={holding.stockSymbol}>
            {holding.stockSymbol}: {holding.quantity} shares @ $
            {holding.averagePrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSummary;
