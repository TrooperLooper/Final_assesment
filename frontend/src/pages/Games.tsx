import Header from "../components/Navigation/Header";

function Games() {
  const games = [
    {
      name: "Pac-Man",
      image: "./src/components/assets/pacman_gameicon.gif",
      color: "bg-yellow-400",
      small: true,
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
    <div className="min-h-screen flex flex-col items-center py-12 bg-gradient-to-b from-purple-700 via-blue-800 to-blue-950">
      <Header />
      <h1 className="text-5xl font-['Pixelify_Sans'] mt-18 text-white mb-15 drop-shadow text-center">
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
              className="overflow-hidden rounded-lg border-4 border-white mb-3 bg-black flex items-center justify-center"
              style={{ width: "140px", height: "140px" }}
            >
              <img
                src={game.image}
                alt={`${game.name} game animation`}
                className={
                  game.small
                    ? "object-cover w-4/5 h-4/5"
                    : "object-cover w-full h-full"
                }
                style={game.small ? { width: "80px", height: "80px" } : {}}
              />
            </div>
            <h4 className="text-lg font-['Winky_Sans'] font-bold text-white text-center drop-shadow tracking-widest uppercase">
              {game.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
