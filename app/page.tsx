"use client"; // Bu satırı ekleyerek Client Component olduğunu belirtiyoruz.

import React, { useState } from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import SearchBar from "./components/SearchBar";
import GroupButton from "./components/GroupButton";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [groupByCountry, setGroupByCountry] = useState<boolean>(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const toggleGroupByCountry = () => {
    setGroupByCountry(!groupByCountry);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Leaderboard</h1>
      <SearchBar onSearch={handleSearch} />
      <GroupButton
        onClick={toggleGroupByCountry}
        groupByCountry={groupByCountry}
      />
      <LeaderboardTable query={query} /> {/* Removed groupByCountry */}
    </div>
  );
};

export default HomePage;
