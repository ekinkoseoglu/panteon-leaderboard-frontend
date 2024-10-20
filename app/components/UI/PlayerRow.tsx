import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const Td = styled.td`
  border: 1px solid black;
  padding: 8px;
  color: white;
`;
const Tr = styled.tr`
  background-color: #251e40;
`;

interface Player {
  id: number;
  name: string;
  country: string;
  money: string;
  rank: number;
}

const PlayerRow = ({
  player,
  highlightedPlayerId,
}: {
  player: Player;
  highlightedPlayerId: number | null;
}) => {
  return (
    <Tr
      style={{
        backgroundColor:
          player.id === highlightedPlayerId ? "#3d2f5e" : "#251e40",
      }}
    >
      <Td style={{ width: "10%" }}>{player.rank}</Td>
      <Td style={{ width: "20%" }}>{player.name}</Td>
      <Td style={{ width: "40%" }}>{player.country}</Td>
      <Td style={{ width: "30%" }}>{player.money}</Td>
    </Tr>
  );
};

export default PlayerRow;