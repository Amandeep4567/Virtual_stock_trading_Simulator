// services/leaderboardService.js
import User from "../models/User.js";
import Leaderboard from "../models/Leaderboard.js";
import { getStockPrice } from "./stockService.js";

const updateLeaderboard = async () => {
  try {
    console.log("Starting leaderboard update...");

    // Fetch all users
    const users = await User.find();
    console.log(`Found ${users.length} users.`);

    // Array to hold leaderboard entries
    const leaderboardEntries = [];

    // Iterate over each user
    for (const user of users) {
      let portfolioValue = 0;
      console.log(`Calculating portfolio for user: ${user.username}`);

      // Calculate the total value of the user's portfolio
      for (const holding of user.portfolio) {
        console.log(`Fetching price for ${holding.stockSymbol}`);
        const currentPrice = await getStockPrice(holding.stockSymbol);

        if (currentPrice !== null) {
          const holdingValue = currentPrice * holding.quantity;
          portfolioValue += holdingValue;
          console.log(
            `Holding: ${holding.stockSymbol}, Quantity: ${holding.quantity}, Current Price: ${currentPrice}, Holding Value: ${holdingValue}`
          );
        } else {
          console.error(`Failed to fetch price for ${holding.stockSymbol}`);
        }
      }

      // Add user's cash balance to portfolio value
      portfolioValue += user.balance;
      console.log(`User balance: ${user.balance}`);
      console.log(
        `Total portfolio value for ${user.username}: ${portfolioValue}`
      );

      // Create or update leaderboard entry
      leaderboardEntries.push({
        user: user._id,
        username: user.username,
        portfolioValue,
      });
    }

    // Clear existing leaderboard
    await Leaderboard.deleteMany({});
    console.log("Cleared existing leaderboard entries.");

    // Insert new leaderboard entries
    await Leaderboard.insertMany(leaderboardEntries);
    console.log("Inserted new leaderboard entries.");

    console.log("Leaderboard updated successfully.");
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};

export default updateLeaderboard;
