// routes/stockRoutes.js
import express from "express";
const router = express.Router();
import { getStock, searchForStocks } from "../controllers/stockController.js";

// Search for stocks
router.get("/search/:query", searchForStocks);

// Get stock price
router.get("/:symbol", getStock);

export default router;
