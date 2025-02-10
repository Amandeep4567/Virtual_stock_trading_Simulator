// controllers/tradeController.js
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { getStockPrice } from "../services/stockService.js";
import updateLeaderboard from "../services/leaderboardService.js";

// @desc    Execute a trade (buy/sell)
// @route   POST /api/trade
// @access  Private
const executeTrade = asyncHandler(async (req, res) => {
  const { stockSymbol, quantity, tradeType } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Get current stock price
  const price = await getStockPrice(stockSymbol);

  if (!price) {
    res.status(400);
    throw new Error("Invalid stock symbol or price not available");
  }

  const totalCost = price * quantity;

  if (tradeType === "buy") {
    if (user.balance < totalCost) {
      res.status(400);
      throw new Error("Insufficient balance");
    }

    // Deduct balance
    user.balance -= totalCost;

    // Update portfolio
    const existingStock = user.portfolio.find(
      (item) => item.stockSymbol === stockSymbol
    );

    if (existingStock) {
      // Update average price and quantity
      const newQuantity = existingStock.quantity + quantity;
      existingStock.averagePrice =
        (existingStock.averagePrice * existingStock.quantity + totalCost) /
        newQuantity;
      existingStock.quantity = newQuantity;
    } else {
      // Add new stock to portfolio
      user.portfolio.push({
        stockSymbol,
        quantity,
        averagePrice: price,
      });
    }
  } else if (tradeType === "sell") {
    // Check if user has the stock
    const existingStock = user.portfolio.find(
      (item) => item.stockSymbol === stockSymbol
    );

    if (!existingStock || existingStock.quantity < quantity) {
      res.status(400);
      throw new Error("Insufficient stock quantity");
    }

    // Increase balance
    user.balance += totalCost;

    // Update portfolio
    existingStock.quantity -= quantity;

    if (existingStock.quantity === 0) {
      // Remove stock from portfolio
      user.portfolio = user.portfolio.filter(
        (item) => item.stockSymbol !== stockSymbol
      );
    }
  } else {
    res.status(400);
    throw new Error("Invalid trade type");
  }

  // Save transaction
  const transaction = await Transaction.create({
    user: user._id,
    stockSymbol,
    quantity,
    price,
    type: tradeType,
  });

  user.transactions.push(transaction._id);

  await user.save();
  await user.save();

  await updateLeaderboard();

  res.status(201).json({
    message: "Trade executed successfully",
    balance: user.balance,
    portfolio: user.portfolio,
  });
});

export { executeTrade };
