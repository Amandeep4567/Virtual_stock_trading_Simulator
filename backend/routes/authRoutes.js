// routes/authRoutes.js
import express from "express";
const router = express.Router();
import { registerUser, authUser } from "../controllers/authController.js";

// Register user
router.post("/register", registerUser);

// Authenticate user
router.post("/login", authUser);

export default router;
