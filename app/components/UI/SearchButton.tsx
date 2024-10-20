import React from "react";
import { FaLayerGroup } from "react-icons/fa6";

interface SearchButtonProps {
  isQueryIsNotEmpty: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isQueryIsNotEmpty }) => {
  return (
    <button
      type='submit'
      style={{ padding: "10px 20px", cursor: "pointer" }}
      disabled={!isQueryIsNotEmpty}
    >
      <FaLayerGroup />
    </button>
  );
};

export default SearchButton;
