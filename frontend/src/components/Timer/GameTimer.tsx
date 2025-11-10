import React from "react";
import RetroTimer from "./RetroTimer";
import { GameMessage } from "./GameMessage";

interface GameTimerProps {
  elapsedSeconds: number;
  isStopped: boolean;
  hasStarted: boolean;
  isPlaying: boolean;
  hasStopped: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  elapsedSeconds,
  isStopped,
  hasStarted,
  isPlaying,
  hasStopped,
}) => {
  return (
    <div className="flex flex-col items-center justify-start flex-1 md:ml-6">
      <div className="w-full flex justify-center">
        <RetroTimer elapsedSeconds={elapsedSeconds} isStopped={isStopped} />
      </div>
      <GameMessage
        hasStarted={hasStarted}
        isPlaying={isPlaying}
        hasStopped={hasStopped}
        elapsedSeconds={elapsedSeconds}
      />
    </div>
  );
};

export default GameTimer;
