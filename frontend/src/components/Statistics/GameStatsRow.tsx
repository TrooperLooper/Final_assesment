import React from "react";

interface GameStatsRowProps {
  games: {
    name: string;
    icon: string;
    percent: number;
  }[];
}

const indicatorColor = "#FF5E5B"; // red
const backgroundColor = "#FFD800"; // yellow

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const GameStatsRow: React.FC<GameStatsRowProps> = ({ games }) => (
  <div className="bg-white/10 rounded-b-xl p-4 shadow flex flex-col items-center justify-center w-full max-w-xl mx-auto">
    {games.map((game) => {
      const percentArc = (game.percent / 100) * CIRCUMFERENCE;
      return (
        <div
          key={game.name}
          className="flex items-center justify-between w-full py-2 border-b border-gray-300 last:border-b-0"
        >
          <img
            src={game.icon}
            alt={game.name}
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-center text-white text-base flex-1">
            {game.name}
          </span>
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48">
              {/* Full yellow background ring */}
              <circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="#f3f3f3"
                stroke={backgroundColor}
                strokeWidth="6"
              />
              {/* Red indicator arc, always starts at top */}
              <circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="none"
                stroke={indicatorColor}
                strokeWidth="6"
                strokeDasharray={`${percentArc} ${CIRCUMFERENCE - percentArc}`}
                strokeDashoffset={CIRCUMFERENCE * 0.25}
                transform="rotate(0 24 24)"
                style={{ transition: "stroke-dasharray 0.3s" }}
              />
              <text
                x="24"
                y="30"
                textAnchor="middle"
                fontSize="20"
                fill="#111"
                fontWeight="bold"
                style={{ fontFamily: "'Tulpen One', cursive" }}
              >
                {game.percent}%
              </text>
            </svg>
          </div>
        </div>
      );
    })}
  </div>
);

export default GameStatsRow;
