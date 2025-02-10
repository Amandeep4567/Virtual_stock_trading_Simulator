// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const portfolioSchema = mongoose.Schema(
  {
    stockSymbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    averagePrice: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    balance: {
      type: Number,
      default: 100000, // Starting virtual currency
    },
    portfolio: [portfolioSchema],
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
