import React from "react";

interface GameStatsRowProps {
  games: Array<{
    name: string;
    icon: string;
    percent: number;
  }>;
  selectedGame?: string;
  onGameSelect?: (gameName: string) => void;
}

const GameStatsRow: React.FC<GameStatsRowProps> = ({ games, selectedGame, onGameSelect }) => {
  const RADIUS = 28;
  const STROKE_WIDTH = 4;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <div className="flex justify-center items-center gap-8 p-8">
      {games.map((game, index) => {
        const offset = CIRCUMFERENCE - (game.percent / 100) * CIRCUMFERENCE;
        
        return (
          <div 
            key={index} 
            className={`flex flex-col items-center gap-2 ${onGameSelect ? 'cursor-pointer' : ''}`}
            onClick={() => onGameSelect?.(game.name)}
          >
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                {/* Background circle - always visible */}
                <circle
                  cx="32"
                  cy="32"
                  r={RADIUS}
                  stroke="#FFD800"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  opacity="1"
                />
                {/* Progress circle - shows percentage */}
                <circle
                  cx="32"
                  cy="32"
                  r={RADIUS}
                  stroke="#FF5E5B"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  opacity="1"
                />
              </svg>
              {/* Game icon in center */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-all ${
                  selectedGame === game.name ? 'scale-110' : ''
                }`}
              >
                <img
                  src={game.icon}
                  alt={game.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            <span className="text-white text-sm font-semibold">{game.percent}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default GameStatsRow;
