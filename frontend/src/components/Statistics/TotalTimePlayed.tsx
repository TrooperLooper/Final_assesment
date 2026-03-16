interface TotalTimePlayedProps {
  mockMinutes?: number;
}

const TotalTimePlayed = ({ mockMinutes }: TotalTimePlayedProps) => {
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

export default TotalTimePlayed;
