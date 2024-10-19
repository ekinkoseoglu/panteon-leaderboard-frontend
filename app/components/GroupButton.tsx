import React from "react";

interface GroupButtonProps {
  onClick: () => void;
  groupByCountry: boolean;
}

const GroupButton: React.FC<GroupButtonProps> = ({
  onClick,
  groupByCountry,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ padding: "10px 20px", cursor: "pointer" }}
    >
      {groupByCountry ? "Ungroup by Country" : "Group by Country"}
    </button>
  );
};

export default GroupButton;
