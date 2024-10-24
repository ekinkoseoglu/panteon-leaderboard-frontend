import React, { useState } from "react";
import SearchButton from "./UI/SearchButton";
import { Tooltip } from "react-tooltip";

interface SearchBarProps {
  togglePlayerId: (playerId: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ togglePlayerId }) => {
  const [searchQuery, setSearchQuery] = useState<number>();

  const clickHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(searchQuery);

    if (searchQuery !== undefined) {
      togglePlayerId(searchQuery);
    }

    setSearchQuery(undefined);
  };

  return (
    <form onSubmit={clickHandler} className='mt-5'>
      <input
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Lütfn oyuncu ID giriniz. (Örnek: 136)'
        data-tooltip-place='top-start'
        type='number'
        placeholder='Search players...'
        onChange={(e) => setSearchQuery(parseInt(e.target.value))}
        value={searchQuery || ""}
        style={{
          backgroundColor: "#251E40",
          padding: "10px",
          margin: "20px 0 20px 0",
          borderRadius: "4px",
          border: "1px solid #251E40",
          width: "80%",
          color: "white",
          WebkitAppearance: "none",
          MozAppearance: "textfield",
          appearance: "textfield",
        }}
      />
      <SearchButton isQueryIsNotEmpty={searchQuery !== null} />
      <Tooltip id='my-tooltip' />
    </form>
  );
};

export default SearchBar;
