import React from "react";
import { GameTimer } from "./GameTimer";

interface GameCardProps {
  gameImage: string;
  gameColor: string;
  buttonState: "START" | "STOP" | "EXIT";
  onButtonClick: () => void;
  elapsedSeconds: number;
  isStopped: boolean;
  hasStarted: boolean;
  isPlaying: boolean;
  hasStopped: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  gameImage,
  gameColor,
  buttonState,
  onButtonClick,
  elapsedSeconds,
  isStopped,
  hasStarted,
  isPlaying,
  hasStopped,
}) => {
  return (
    <GameTimer
      elapsedSeconds={elapsedSeconds}
      isStopped={isStopped}
      hasStarted={hasStarted}
      isPlaying={isPlaying}
      hasStopped={hasStopped}
      gameImage={gameImage}
      gameColor={gameColor}
      onButtonClick={onButtonClick}
      buttonState={buttonState}
    />
  );
};
