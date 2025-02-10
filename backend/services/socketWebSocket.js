// services/stockWebSocket.js
import WebSocket from "ws";
import dotenv from "dotenv";

dotenv.config();

const STOCK_API_KEY = process.env.STOCK_API_KEY;

const connectStockWebSocket = (symbols, onMessage) => {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${STOCK_API_KEY}`);

  socket.on("open", () => {
    symbols.forEach((symbol) => {
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: symbol.toUpperCase() })
      );
    });
  });

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.type === "trade") {
      onMessage(parsedData.data);
    }
  });

  socket.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed");
  });

  return socket;
};

export default connectStockWebSocket;
