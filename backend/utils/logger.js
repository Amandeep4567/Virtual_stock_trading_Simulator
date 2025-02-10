// utils/logger.js
// Simple logger utility
const logger = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

export default logger;
