import React, { useState, useEffect } from "react";
import stockService from "../../services/stockService";

const PortfolioItem = ({ holding }) => {
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      try {
        const data = await stockService.getStockPrice(holding.stockSymbol);
        setCurrentPrice(data.price);
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };

    fetchCurrentPrice();
  }, [holding.stockSymbol]);

  const totalValue = currentPrice
    ? (currentPrice * holding.quantity).toFixed(2)
    : "Loading...";

  return (
    <li>
      <h3>{holding.stockSymbol}</h3>
      <p>Quantity: {holding.quantity}</p>
      <p>Average Purchase Price: ${holding.averagePrice.toFixed(2)}</p>
      <p>
        Current Price: ${currentPrice ? currentPrice.toFixed(2) : "Loading..."}
      </p>
      <p>Total Value: ${totalValue}</p>
    </li>
  );
};

export default PortfolioItem;
