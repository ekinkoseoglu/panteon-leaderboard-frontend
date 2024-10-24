"use client";

import React, { useState } from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import SearchBar from "./components/SearchBar";
import Header from "./components/Layout/Header";

const HomePage: React.FC = () => {
  const [playerId, setPlayerId] = useState<number | null>(null);

  const togglePlayerId = (playerId: number) => {
    setPlayerId(playerId);
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#392F63",
      }}
    >
      <Header />
      <SearchBar togglePlayerId={togglePlayerId} />
      <LeaderboardTable playerId={playerId} />
    </div>
  );
};

export default HomePage;
