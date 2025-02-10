// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stockSymbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
