import axios from "axios";

const API_URL = "http://localhost:3000/leaderboard";

export const fetchLeaderboardData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
    throw error;
  }
};

export const fetchPlayerDataById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}?playerId=${id}`);

    return response.data.surroundingPlayers;
  } catch (error) {
    console.error("Error fetching player data", error);
    throw error;
  }
};

export const distributePrizePool = async () => {
  try {
    const response = await axios.post(`${API_URL}/distributePrizePool`);
    return response.data;
  } catch (error) {
    console.error("Error distributing prize pool", error);
    throw error;
  }
};

export const nextWeek = async () => {
  try {
    const response = await axios.post(`${API_URL}/nextWeek`);
    return response.data;
  } catch (error) {
    console.error("Error going to next week", error);
    throw error;
  }
};
