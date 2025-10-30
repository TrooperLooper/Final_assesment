import Star from "./Star"; // Adjust the import path as necessary

const YourComponent = ({ gameStats }) => (
  <div className="grid grid-cols-2 gap-4">
    {gameStats.map((game) => (
      <div
        key={game.gameName}
        className="flex flex-col items-center bg-white/10 rounded-xl p-4 shadow"
      >
        <img
          src={game.iconUrl || defaultAvatar}
          alt={game.gameName}
          className="w-12 h-12 mb-2"
        />
        <span className="text-white font-bold mb-2">{game.gameName}</span>
        <PieChart data={[game]} />
      </div>
    ))}
  </div>
);

export default YourComponent;
