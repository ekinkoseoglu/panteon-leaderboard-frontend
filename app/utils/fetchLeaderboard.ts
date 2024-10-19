// utils/fetchLeaderboard.ts
import axios from "axios";

export const fetchLeaderboardData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/leaderboard");
    return response.data.data.topPlayers; // Returning the topPlayers array
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
    throw error; // Rethrowing error so it can be caught in the component
  }
};
