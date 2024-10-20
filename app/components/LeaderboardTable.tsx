"use client";

import React, { useEffect, useState } from "react";
import {
  fetchLeaderboardData,
  fetchPlayerDataById,
} from "../utils/leaderboardService";
import { FaFilter } from "react-icons/fa";
import styled from "styled-components";
import PlayerRow from "./UI/PlayerRow";
import DistributePrizePoolButton from "./UI/DistributePrizePoolButton";
import { ToastContainer, toast } from "react-toastify";

interface Player {
  id: number;
  name: string;
  country: string;
  money: string;
  rank: number;
}

interface LeaderboardTableProps {
  playerId: number | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #706f78;
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1c172b;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  width: 80%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

const NextWeekButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

const EllipsisRow = styled.div`
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ playerId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [surroundingPlayers, setSurroundingPlayers] = useState<Player[]>([]);
  const [playerNameRank, setPlayerNameRank] = useState(0);
  const [playerNameFilter, setPlayerNameFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [moneyFilter, setMoneyFilter] = useState("");
  const [groupedByCountry, setGroupedByCountry] = useState<
    Record<string, Player[]>
  >({});
  const [isCountryGrouped, setIsCountryGrouped] = useState(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [isLoadingSurroundingPlayers, setIsLoadingSurroundingPlayers] =
    useState(true);
  const [prizePool, setPrizePool] = useState(0);
  const [isDistributeButtonEnabled, setIsDistributeButtonEnabled] =
    useState(false);

  // Leaderboard datasını çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLeaderboardData();
        setPlayers(response.data.topPlayers);
        setPrizePool(response.prizePool);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
      } finally {
        setIsLoadingLeaderboard(false);
      }

      if (playerId !== null && prizePool !== 0) {
        setSurroundingPlayers([]);
        setIsLoadingSurroundingPlayers(true);
        scrollToBottom();
        try {
          const playerData = await fetchPlayerDataById(playerId);
          setSurroundingPlayers(playerData);
        } catch (error) {
          console.error("Error fetching player data", error);
        } finally {
          setIsLoadingSurroundingPlayers(false);
        }
      }
    };

    fetchData();
  }, [playerId, prizePool]);

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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

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
    setIsCountryGrouped(!isCountryGrouped);
    scrollToBottom();
  };

  const handleDistributePrize = async () => {
    try {
      setPrizePool(0);
      const response = await fetchLeaderboardData();
      setPlayers(response.data.topPlayers);
      setIsDistributeButtonEnabled(false);
    } catch (error) {
      console.error("Error distributing prize pool", error);
      toast.error("Error distributing prize pool");
    }
  };

  const handleNextWeek = async () => {
    try {
      const response = await fetchLeaderboardData();
      setPrizePool(response.prizePool);
      setIsDistributeButtonEnabled(true);
    } catch (error) {
      console.error("Error fetching new week data", error);
    }
  };

  const sortedCountries = Object.keys(groupedByCountry).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <>
      <h3 className='text-white'>
        Prize Pool: {isDistributeButtonEnabled ? prizePool : 0}
      </h3>
      {/* Buton Grupları */}
      <div className='d-flex justify-content-between px-5'>
        <ResetButton
          type='button'
          onClick={() => {
            setPlayerNameFilter("");
            setCountryFilter("");
            setMoneyFilter("");
            setIsCountryGrouped(false);
          }}
        >
          Reset Filters
        </ResetButton>

        <DistributePrizePoolButton
          onClick={handleDistributePrize}
          isDistributeButtonEnabled={isDistributeButtonEnabled}
        />
        <NextWeekButton onClick={handleNextWeek}>Next Week</NextWeekButton>
      </div>
      <Container>
        {/* Filterlar */}
        <FilterContainer>
          <label>
            Player Name:
            <FaFilter
              onClick={() => {
                const filter = prompt("Enter Player Name:");
                if (filter !== null) {
                  setPlayerNameFilter(filter);
                }
              }}
            />
          </label>

          <label>
            Country:
            <FaFilter onClick={handleGroupByCountry} />
          </label>

          <label>
            Money:
            <FaFilter
              onClick={() => {
                const filter = prompt("Enter Money:");
                if (filter !== null) {
                  setMoneyFilter(filter);
                }
              }}
            />
          </label>
        </FilterContainer>

        {/* Top Playerlar için Tablo */}
        {isLoadingLeaderboard ? (
          <div className='d-flex justify-content-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : isCountryGrouped ? null : (
          <div style={{ width: "80%", overflow: "hidden" }}>
            <Table>
              <tbody>
                {filteredPlayers.map((player) => (
                  <PlayerRow
                    key={player.id}
                    player={player}
                    highlightedPlayerId={playerId}
                  />
                ))}
              </tbody>
            </Table>
            {playerId !== null && surroundingPlayers.length !== 0 && (
              <EllipsisRow>
                <div>...</div>
              </EllipsisRow>
            )}

            {/* İlişkili Oyuncular için Tablo */}
            {playerId !== null && isLoadingSurroundingPlayers ? (
              <div className='spinner-border text-center mt-2' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : (
              surroundingPlayers.length !== 0 && (
                <Table>
                  <tbody>
                    {surroundingPlayers.map((player) => (
                      <PlayerRow
                        key={player.id}
                        player={player}
                        highlightedPlayerId={playerId}
                      />
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </div>
        )}

        {/* Ülkelere Göre Gruplandırılmış Tablo */}
        {isCountryGrouped &&
          sortedCountries.map((country) => (
            <div key={country} className='w-75'>
              <h2 style={{ backgroundColor: "#f0f0f0" }}>{country}</h2>
              <Table>
                <tbody>
                  {groupedByCountry[country].map((player) => (
                    <PlayerRow
                      key={player.id}
                      player={player}
                      highlightedPlayerId={playerId}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
      </Container>

      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default LeaderboardTable;
