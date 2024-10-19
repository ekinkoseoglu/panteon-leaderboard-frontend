"use client";

import React, { useEffect, useState } from "react";
import { fetchLeaderboardData } from "../utils/fetchLeaderboard"; // Importing the fetch function

interface Player {
  id: number;
  name: string;
  country: string;
  money: string;
  rank: number;
}

interface LeaderboardTableProps {
  query: string; // To filter players based on the query
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ query }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNameFilter, setPlayerNameFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [moneyFilter, setMoneyFilter] = useState("");
  const [groupedByCountry, setGroupedByCountry] = useState<
    Record<string, Player[]>
  >({});
  const [isCountryGrouped, setIsCountryGrouped] = useState(false); // To track when we click the "Group by Country" button

  // Fetching data from the API using the fetchLeaderboardData function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderboardData(); // Use the utility function
        setPlayers(data); // Set the players in state
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
      }
    };

    fetchData();
  }, []);

  // Filtering players by name, country, and money
  const filteredPlayers = players.filter((player) => {
    const matchesName = player.name
      .toLowerCase()
      .includes(playerNameFilter.toLowerCase());
    const matchesCountry = player.country
      .toLowerCase()
      .includes(countryFilter.toLowerCase());
    const matchesMoney = player.money.includes(moneyFilter);

    return matchesName && matchesCountry && matchesMoney;
  });

  // Group players by country when button is clicked
  const handleGroupByCountry = () => {
    const grouped = filteredPlayers.reduce<Record<string, Player[]>>(
      (result, player) => {
        if (!result[player.country]) {
          result[player.country] = [];
        }
        result[player.country].push(player);
        return result;
      },
      {}
    );

    setGroupedByCountry(grouped);
    setIsCountryGrouped(true); // Set grouping active
  };

  // Sorting the countries alphabetically
  const sortedCountries = Object.keys(groupedByCountry).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div>
      {/* Filter Inputs */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>
          Player Name:
          <input
            type='text'
            value={playerNameFilter}
            onChange={(e) => setPlayerNameFilter(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
        </label>

        <label style={{ marginRight: "10px" }}>
          Country:
          <input
            type='text'
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
        </label>

        <label style={{ marginRight: "10px" }}>
          Money:
          <input
            type='text'
            value={moneyFilter}
            onChange={(e) => setMoneyFilter(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
        </label>

        {/* Group by Country Button */}
        <button onClick={handleGroupByCountry} style={{ marginLeft: "10px" }}>
          Group by Country
        </button>
      </div>

      {/* Conditionally Render Grouped Players or All Players */}
      {isCountryGrouped ? (
        // Display Players Grouped by Country
        sortedCountries.map((country) => (
          <div key={country} style={{ marginBottom: "30px" }}>
            <h2 style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
              {country}
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Rank
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Name
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Money
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedByCountry[country].map((player) => (
                  <tr key={player.id}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {player.rank}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {player.name}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {player.money}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        // Display All Players in a Simple Table if not grouped
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Rank
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Country
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Money
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {player.rank}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {player.name}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {player.country}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {player.money}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardTable;
