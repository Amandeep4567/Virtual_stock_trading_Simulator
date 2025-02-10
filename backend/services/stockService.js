// services/stockService.js
import axios from "axios";
import cacheService from "./cacheService.js";
import dotenv from "dotenv";

dotenv.config();

const STOCK_API_KEY = process.env.STOCK_API_KEY;

// Fetch current stock price
const getStockPrice = async (symbol) => {
  // Convert symbol to uppercase
  symbol = symbol.toUpperCase();

  // Check cache first
  const cachedPrice = cacheService.get(`price_${symbol}`);
  if (cachedPrice) {
    return cachedPrice;
  }

  try {
    const response = await axios.get("https://finnhub.io/api/v1/quote", {
      params: {
        symbol: symbol,
        token: STOCK_API_KEY,
      },
    });

    const price = response.data.c; // 'c' is the current price

    // Validate price
    if (price === null || price === undefined) {
      throw new Error("Price not available");
    }

    // Cache the price
    cacheService.set(`price_${symbol}`, price, 60); // Cache for 60 seconds

    return price;
  } catch (error) {
    console.error(`Error fetching stock price for ${symbol}: ${error}`);
    return null;
  }
};

// Search for stocks
const searchStocks = async (query) => {
  // Check cache first
  const cachedResults = cacheService.get(`search_${query}`);
  if (cachedResults) {
    return cachedResults;
  }

  try {
    const response = await axios.get("https://finnhub.io/api/v1/search", {
      params: {
        q: query,
        token: STOCK_API_KEY,
      },
    });

    const results = response.data.result;

    // Cache the results
    cacheService.set(`search_${query}`, results, 300); // Cache for 5 minutes

    return results;
  } catch (error) {
    console.error(`Error searching stocks with query "${query}": ${error}`);
    return [];
  }
};

export { getStockPrice, searchStocks };
