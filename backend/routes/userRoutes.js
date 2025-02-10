// routes/userRoutes.js
import express from "express";
const router = express.Router();
import {
  getUserProfile,
  updateUserProfile,
  getUserPortfolio,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// Get user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Get user portfolio
router.get("/portfolio", protect, getUserPortfolio);

export default router;
