// routes/tradeRoutes.js
import express from "express";
const router = express.Router();
import { executeTrade } from "../controllers/tradeController.js";
import { protect } from "../middleware/authMiddleware.js";

// Execute trade
router.post("/", protect, executeTrade);

export default router;
