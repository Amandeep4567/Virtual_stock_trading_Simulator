import React, { useState, useEffect } from "react";
import api from "../../services/api";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/user/profile");
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  if (!transactions) return <div>Loading transactions...</div>;

  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Stock Symbol</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{new Date(txn.date).toLocaleString()}</td>
              <td>{txn.stockSymbol}</td>
              <td>{txn.type}</td>
              <td>{txn.quantity}</td>
              <td>${txn.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
