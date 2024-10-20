import { distributePrizePool } from "@/app/utils/leaderboardService";
import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
`;

interface DistributePrizePoolButtonProps {
  onClick: () => void;
  isDistributeButtonEnabled: boolean;
}

const DistributePrizePoolButton: React.FC<DistributePrizePoolButtonProps> = ({
  onClick,
  isDistributeButtonEnabled,
}) => {
  const distributeOnHandler = () => {
    distributePrizePool()
      .then(() => {
        toast.success("Prize pool distributed successfully");
        onClick();
      })
      .catch(() => {
        toast.error("Error distributing prize pool");
      });
  };
  return (
    <Button
      onClick={distributeOnHandler}
      style={{ padding: "10px 20px" }}
      disabled={!isDistributeButtonEnabled}
    >
      Distribute Prize Pool
    </Button>
  );
};

export default DistributePrizePoolButton;
