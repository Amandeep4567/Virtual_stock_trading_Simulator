import api from "./api";

const getStockPrice = async (symbol) => {
  const response = await api.get(`/stocks/${symbol}`);
  return response.data;
};

const searchStocks = async (query) => {
  const response = await api.get(`/stocks/search/${query}`);
  return response.data;
};

export default { getStockPrice, searchStocks };
