import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type='text'
      placeholder='Search players...'
      value={searchTerm}
      onChange={handleSearch}
      style={{
        padding: "10px",
        margin: "20px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default SearchBar;
