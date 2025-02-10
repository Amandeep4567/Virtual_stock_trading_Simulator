import React from "react";
import TransactionHistory from "../components/Transactions/TransactionHistory";
import Navbar from "../components/Common/Navbar";

const TransactionHistoryPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Transaction History</h1>
      <TransactionHistory />
    </div>
  );
};

export default TransactionHistoryPage;
