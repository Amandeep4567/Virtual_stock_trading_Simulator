// controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("transactions");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      balance: updatedUser.balance,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user portfolio
// @route   GET /api/user/portfolio
// @access  Private
const getUserPortfolio = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("portfolio balance");

  if (user) {
    res.json({
      balance: user.balance,
      portfolio: user.portfolio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUserProfile, updateUserProfile, getUserPortfolio };
