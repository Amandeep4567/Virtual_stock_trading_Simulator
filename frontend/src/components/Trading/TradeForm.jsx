import React, { useState } from "react";
import tradeService from "../../services/tradeService";

const TradeForm = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [tradeType, setTradeType] = useState("buy");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await tradeService.executeTrade(
        stockSymbol,
        quantity,
        tradeType
      );
      setMessage(response.message);
    } catch (error) {
      console.error("Trade failed:", error);
      setMessage("Trade failed.");
    }
  };

  return (
    <div>
      <h2>Execute Trade</h2>
      <form onSubmit={handleSubmit}>
        <label>Stock Symbol:</label>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          required
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
        <label>Trade Type:</label>
        <select
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value)}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TradeForm;
