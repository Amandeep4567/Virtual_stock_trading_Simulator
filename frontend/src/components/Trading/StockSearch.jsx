import React, { useState } from "react";
import stockService from "../../services/stockService";

const StockSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    try {
      const data = await stockService.searchStocks(query);
      setResults(data);
    } catch (error) {
      console.error("Error searching stocks:", error);
    }
  };

  return (
    <div>
      <h2>Search Stocks</h2>
      <input
        type="text"
        placeholder="Enter company name or symbol"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((stock) => (
          <li key={stock.symbol} onClick={() => onSelect(stock.symbol)}>
            {stock.symbol} - {stock.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockSearch;
