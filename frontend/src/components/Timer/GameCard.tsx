import React from "react";
import { GameImage } from "./GameImage";
import { GameControlButton } from "./GameControlButton";
import { GameTimer } from "./GameTimer";

interface GameCardProps {
  gameName: string;
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
  gameName,
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
    <div
      className={`
        flex flex-col md:flex-row items-center md:items-start rounded-3xl shadow-2xl
        ${gameColor}
        p-8 w-full max-w-2xl min-h-[220px]
      `}
    >
      {/* Mobile: Timer first */}
      <div className="block md:hidden w-full mb-6">
        <GameTimer
          elapsedSeconds={elapsedSeconds}
          isStopped={isStopped}
          hasStarted={hasStarted}
          isPlaying={isPlaying}
          hasStopped={hasStopped}
        />
      </div>

      {/* Left: Image and button */}
      <div
        className="flex flex-col items-center justify-between"
        style={{ minWidth: 160 }}
      >
        <GameImage src={gameImage} alt={gameName} />
        <GameControlButton state={buttonState} onClick={onButtonClick} />
      </div>

      {/* Desktop: Timer on right */}
      <div className="hidden md:block">
        <GameTimer
          elapsedSeconds={elapsedSeconds}
          isStopped={isStopped}
          hasStarted={hasStarted}
          isPlaying={isPlaying}
          hasStopped={hasStopped}
        />
      </div>
    </div>
  );
};
