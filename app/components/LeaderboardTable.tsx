"use client";

import React, { useEffect, useState } from "react";
import {
  distributePrizePool,
  fetchLeaderboardData,
  fetchPlayerDataById,
  nextWeek,
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

// Tabloya ait stil tanımlamaları
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
  // Oyuncu ve ödül havuzuna ait state'lerin yönetimi

  const [players, setPlayers] = useState<Player[]>([]);
  const [surroundingPlayers, setSurroundingPlayers] = useState<Player[]>([]);
  const [playerNameFilter, setPlayerNameFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [moneyFilter, setMoneyFilter] = useState<string>("");
  const [groupedByCountry, setGroupedByCountry] = useState<
    Record<string, Player[]>
  >({});
  const [isCountryGrouped, setIsCountryGrouped] = useState<boolean>(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] =
    useState<boolean>(true);
  const [isLoadingSurroundingPlayers, setIsLoadingSurroundingPlayers] =
    useState<boolean>(true);
  const [prizePool, setPrizePool] = useState<number>(0);
  const [isDistributeButtonEnabled, setIsDistributeButtonEnabled] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(100);

  // Sayfa ve bağımlılıklara göre oyuncu verilerini çeken useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLeaderboardData(page, pageSize);
        setPlayers(response.data);
        setPrizePool(response.prizePool);
        setIsLoadingLeaderboard(false);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
        setIsLoadingLeaderboard(false);
      }

      // Belirli bir oyuncuya ait veriyi çekme işlemi
      if (playerId !== null && playerId !== undefined && prizePool !== 0) {
        setSurroundingPlayers([]);
        setIsLoadingSurroundingPlayers(true);
        try {
          const playerData = await fetchPlayerDataById(playerId);
          setSurroundingPlayers(playerData);
          setIsLoadingSurroundingPlayers(false);
        } catch (error) {
          console.error("Error fetching player data", error);
          setIsLoadingSurroundingPlayers(false);
        }
      }
    };

    fetchData();
  }, [page, pageSize, playerId, prizePool]);

  // Filtreleme işlemleri için oyuncu verilerini filtreler
  const filteredPlayers = players.filter((player) => {
    return (
      player.name.toLowerCase().includes(playerNameFilter.toLowerCase()) &&
      player.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
      player.money.includes(moneyFilter)
    );
  });

  const handleGroupByCountry = () => {
    setIsCountryGrouped((prev) => !prev);

    if (!isCountryGrouped) {
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
    }
  };

  // Ödül havuzunu dağıtan fonksiyon
  const handleDistributePrize = async () => {
    try {
      await distributePrizePool();
      setPrizePool(0);
      setIsDistributeButtonEnabled(false);
      const response = await fetchLeaderboardData(page, pageSize);
      setPlayers(response.data);
    } catch (error) {
      console.error("Error distributing prize pool", error);
      toast.error("Ödül havuzu dağıtılamadı!");
    }
  };

  // Yeni haftaya geçiş işlemi
  const handleNextWeek = async () => {
    try {
      const data = await nextWeek();
      setPrizePool(data);
      setIsDistributeButtonEnabled(true);
    } catch (error) {
      console.error("Error fetching new week data", error);
    }
  };

  const sortedCountries = Object.keys(groupedByCountry).sort();

  const handlePageChange = (newPage: number) => {
    setIsLoadingLeaderboard(true);
    setPage(newPage);
  };

  return (
    <>
      <h3 className='text-white'>
        Prize Pool: {isDistributeButtonEnabled ? prizePool : 0}
      </h3>

      <div className='d-flex justify-content-between px-5'>
        <ResetButton
          type='button'
          onClick={() => {
            setPlayerNameFilter("");
            setCountryFilter("");
            setSurroundingPlayers([]);
            setMoneyFilter("");
            setIsCountryGrouped(false);
            setPage(1);
          }}
        >
          Filtreleri Sıfırla
        </ResetButton>
        <DistributePrizePoolButton
          onClick={handleDistributePrize}
          isDistributeButtonEnabled={isDistributeButtonEnabled}
        />
        <NextWeekButton onClick={handleNextWeek}>Next Week</NextWeekButton>
      </div>
      <Container>
        <FilterContainer>
          <label>
            Oyuncu Adı:
            <FaFilter
              onClick={() => {
                const filter = prompt("Oyuncu Adı Girin:");
                if (filter !== null) setPlayerNameFilter(filter);
              }}
            />
          </label>
          <label>
            Ülke:
            <FaFilter onClick={handleGroupByCountry} />
          </label>
          <label>
            Para:
            <FaFilter
              onClick={() => {
                const filter = prompt("Para Girin:");
                if (filter !== null) setMoneyFilter(filter);
              }}
            />
          </label>
        </FilterContainer>

        {isLoadingLeaderboard ? (
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Yükleniyor...</span>
          </div>
        ) : isCountryGrouped ? null : (
          <>
            <div style={{ width: "80%", overflow: "hidden" }}>
              {playerId !== null &&
              playerId !== undefined &&
              isLoadingSurroundingPlayers ? (
                <div className='spinner-border text-center mt-2' role='status'>
                  <span className='visually-hidden'>Yükleniyor...</span>
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
              {playerId !== null &&
                playerId !== undefined &&
                surroundingPlayers.length !== 0 && (
                  <EllipsisRow>
                    <div>...</div>
                  </EllipsisRow>
                )}
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
            </div>
            <div className='pagination'>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Önceki
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 20px",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#f0f0f0",
                    margin: "0 10px",
                  }}
                >
                  {page}
                </span>
              </div>
              <button onClick={() => handlePageChange(page + 1)}>
                Sonraki
              </button>
            </div>
          </>
        )}
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
