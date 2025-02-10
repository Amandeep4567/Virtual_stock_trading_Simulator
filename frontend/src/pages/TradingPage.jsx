import React from "react";
import TradeForm from "../components/Trading/TradeForm";
import StockSearch from "../components/Trading/StockSearch";
import Navbar from "../components/Common/Navbar";

const TradingPage = () => {
  const handleStockSelect = (symbol) => {
    // You can pre-fill the trade form with the selected stock symbol
  };

  return (
    <div>
      <Navbar />
      <h1>Trading</h1>
      <StockSearch onSelect={handleStockSelect} />
      <TradeForm />
    </div>
  );
};

export default TradingPage;
