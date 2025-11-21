import React from "react";
import RetroTimer from "./RetroTimer";
import { GameMessage } from "./GameMessage";

interface GameTimerProps {
  elapsedSeconds: number;
  isStopped: boolean;
  hasStarted: boolean;
  isPlaying: boolean;
  hasStopped: boolean;
  gameImage?: string;
  gameColor?: string;
  onButtonClick?: () => void;
  buttonState?: "START" | "STOP" | "EXIT";
}

export const GameTimer: React.FC<GameTimerProps> = ({
  elapsedSeconds,
  isStopped,
  hasStarted,
  isPlaying,
  hasStopped,
  gameImage,
  gameColor = "bg-pink-500",
  onButtonClick,
  buttonState = "START",
}) => {
  return (
    <RetroTimer
      elapsedSeconds={elapsedSeconds}
      isStopped={isStopped}
      gameImage={gameImage}
      gameColor={gameColor}
      onButtonClick={onButtonClick}
      buttonState={buttonState}
      message={
        <GameMessage
          hasStarted={hasStarted}
          isPlaying={isPlaying}
          hasStopped={hasStopped}
          elapsedSeconds={elapsedSeconds}
        />
      }
    />
  );
};

export default GameTimer;
