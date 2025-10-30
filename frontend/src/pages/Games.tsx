function Games() {
  const games = [
    {
      name: "Pac-Man",
      image: "./src/components/assets/pacman_gameicon.gif",
      color: "bg-yellow-400",
    },
    {
      name: "Asteroids",
      image: "./src/components/assets/asteroids_gameicon.gif",
      color: "bg-blue-500",
    },
    {
      name: "Tetris",
      image: "./src/components/assets/tetris_gameicon.gif",
      color: "bg-pink-500",
    },
    {
      name: "Space Invaders",
      image: "./src/components/assets/space_gameicon.gif",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-12">
      <h1 className="text-5xl font-extrabold text-white mb-10 retro-shadow text-center">
        Choose a game to play
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {games.map((game) => (
          <div
            key={game.name}
            className={`flex flex-col items-center rounded-xl shadow-lg ${game.color} p-4 transition-transform hover:scale-105`}
            style={{ width: "180px" }}
          >
            <div
              className="overflow-hidden rounded-lg border-4 border-white mb-3"
              style={{ width: "140px", height: "140px" }}
            >
              <img
                src={game.image}
                alt={`${game.name} game animation`}
                className="object-cover w-full h-full"
              />
            </div>
            <h4 className="text-lg font-bold text-white text-center drop-shadow retro-shadow">
              {game.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
