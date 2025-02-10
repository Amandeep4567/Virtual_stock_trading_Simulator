// controllers/stockController.js
import asyncHandler from "express-async-handler";
import { getStockPrice, searchStocks } from "../services/stockService.js";

// @desc    Get stock price
// @route   GET /api/stocks/:symbol
// @access  Public
const getStock = asyncHandler(async (req, res) => {
  const { symbol } = req.params;

  const price = await getStockPrice(symbol);

  if (price !== null) {
    res.json({ symbol: symbol.toUpperCase(), price });
  } else {
    res.status(404);
    throw new Error("Stock not found or price unavailable");
  }
});

// @desc    Search for stocks
// @route   GET /api/stocks/search/:query
// @access  Public
const searchForStocks = asyncHandler(async (req, res) => {
  const { query } = req.params;

  const results = await searchStocks(query);

  res.json(results);
});

export { getStock, searchForStocks };
