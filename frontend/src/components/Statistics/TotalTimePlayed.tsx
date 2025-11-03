import React from "react";

interface TotalTimePlayedProps {
  userId?: string;
  mockMinutes?: number;
}

const TotalTimePlayed = ({ userId, mockMinutes }: TotalTimePlayedProps) => {
  // Use mock data if provided, otherwise fallback to 0
  const totalMinutes = mockMinutes ?? 164;

  return (
    <div className="px-8 py-6 flex flex-col items-center justify-center">
      <span className="text-4xl font-bold text-white mb-1">
        {totalMinutes} min
      </span>
      <span className="text-base text-white font-normal">
        Total time played
      </span>
    </div>
  );
};

// Example usage with mock data
// <TotalTimePlayed mockMinutes={164} />

export default TotalTimePlayed;
