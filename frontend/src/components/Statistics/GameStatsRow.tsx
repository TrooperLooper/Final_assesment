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
          className="flex items-center justify-between w-full mb-3"
        >
          {/* Pie chart first */}
          <div className="flex items-center justify-center w-auto">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r={RADIUS}
                fill="#f3f3f3"
                stroke={backgroundColor}
                strokeWidth="6"
              />
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
                style={{
                  fontFamily: "'Sofia Sans Extra Condensed', sans-serif",
                  fontWeight: 800,
                }}
              >
                {game.percent}%
              </text>
            </svg>
          </div>
          {/* Game name second */}
          <span className="font-bold text-start text-white text-base flex-1 ml-4 w-auto">
            {game.name}
          </span>
        </div>
      );
    })}
  </div>
);

export default GameStatsRow;
