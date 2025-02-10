import api from "./api";

const executeTrade = async (stockSymbol, quantity, tradeType) => {
  const response = await api.post("/trade", {
    stockSymbol,
    quantity,
    tradeType,
  });
  return response.data;
};

export default { executeTrade };
