import { useNavigate } from "react-router-dom";

interface RetroGameCardProps {
  gameId: string;
  gameName: string;
  imageUrl?: string;
}

const RetroGameCard: React.FC<RetroGameCardProps> = ({
  gameId,
  gameName,
  imageUrl,
}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/play/${gameId}`)}>
      <img
        src={imageUrl || "/assets/default_gameicon.png"}
        alt={gameName}
        width={48}
      />
      <div>{gameName}</div>
    </div>
  );
};

// In your GamesList or Dashboard component
const games = [
  { gameId: "1", gameName: "Pac-man", imageUrl: "/assets/pacman_gameicon.gif" },
  { gameId: "2", gameName: "Tetris", imageUrl: "/assets/tetris_gameicon.gif" },
  {
    gameId: "3",
    gameName: "Space Invaders",
    imageUrl: "/assets/space_gameicon.gif",
  },
  {
    gameId: "4",
    gameName: "Asteroids",
    imageUrl: "/assets/asteroids_gameicon.gif",
  },
];

<div style={{ display: "flex", gap: "1rem" }}>
  {games.map((game) => (
    <RetroGameCard
      key={game.gameId}
      gameId={game.gameId}
      gameName={game.gameName}
      imageUrl={game.imageUrl}
    />
  ))}
</div>;
