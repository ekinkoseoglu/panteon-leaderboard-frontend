import axios from "axios";

const API_URL =
  "https://panteon-leaderboard-backend-production.up.railway.app/leaderboard";

interface LeaderboardResponse {
  data: Player[];

  prizePool: number;
  page: number;
  pageSize: number;
}

interface Player {
  id: number;
  name: string;
  country: string;
  money: string;
  rank: number;
}

export const fetchLeaderboardData = async (
  page: number = 1,
  pageSize: number = 20
): Promise<LeaderboardResponse> => {
  try {
    const response = await axios.get<LeaderboardResponse>(API_URL, {
      params: { page, pageSize },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
    throw error;
  }
};

export const fetchPlayerDataById = async (id: number): Promise<Player[]> => {
  try {
    const response = await axios.get<{ surroundingPlayers: Player[] }>(
      `${API_URL}?playerId=${id}`
    );
    return response.data.surroundingPlayers;
  } catch (error) {
    console.error("Error fetching player data", error);
    throw error;
  }
};

export const distributePrizePool = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/distributePrizePool`);
  } catch (error) {
    console.error("Error distributing prize pool", error);
    throw error;
  }
};

export const nextWeek = async () => {
  try {
    const response = await axios.get(`${API_URL}/nextWeek`);
    return response;
  } catch (error) {
    console.error("Error going to next week", error);
    throw error;
  }
};
