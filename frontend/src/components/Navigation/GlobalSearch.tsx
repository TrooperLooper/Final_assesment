import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import playerIcon from "../assets/searchIcon_players.png";
import gameIcon from "../assets/searchIcon_games.png";

interface SearchResult {
  type: "user" | "game";
  id: string;
  name: string;
  route: string;
}

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search function
  useEffect(() => {
    const searchData = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        const [usersData, gamesData] = await Promise.all([
          apiClient.get("/users"),
          apiClient.get("/games"),
        ]);

        const users = usersData.data;
        const games = gamesData.data;

        const lowerQuery = query.toLowerCase();

        // Search users by firstName + lastName
        const userResults: SearchResult[] = users
          .filter((user: any) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return fullName.includes(lowerQuery);
          })
          .map((user: any) => ({
            type: "user" as const,
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            route: `/stats/${user._id}`,
          }));

        // Search games by name
        const gameResults: SearchResult[] = games
          .filter((game: any) => game.name.toLowerCase().includes(lowerQuery))
          .map((game: any) => ({
            type: "game" as const,
            id: game._id,
            name: game.name,
            route: `/games`,
          }));

        setResults([...userResults, ...gameResults]);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.route);
    setQuery("");
    setIsOpen(false);
  };

  // Separate users and games for grouped display
  const userResults = results.filter((r) => r.type === "user");
  const gameResults = results.filter((r) => r.type === "game");

  return (
    <div ref={searchRef} className="relative w-32 sm:w-40 md:w-[300px]">
      <input
        type="text"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
        className="w-full rounded text-sm px-3 py-1 pr-10 bg-white/50 text-gray-900 outline-none focus:bg-white/70 transition-colors placeholder:text-white"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900" />

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
          {loading ? (
            <div className="px-4 py-3 text-gray-500 text-sm">Searching...</div>
          ) : userResults.length > 0 || gameResults.length > 0 ? (
            <div className="py-2">
              {/* Users Section */}
              {userResults.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider font-['Winky_Sans']">
                    Players
                  </div>
                  {userResults.map((result) => (
                    <button
                      key={`user-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-4"
                    >
                      <img
                        src={playerIcon}
                        alt="Player"
                        className="w-5 h-5 hidden sm:block"
                      />
                      <span className="text-xs sm:text-sm text-gray-900">
                        {result.name}
                      </span>
                    </button>
                  ))}
                </>
              )}

              {/* Divider */}
              {userResults.length > 0 && gameResults.length > 0 && (
                <div className="my-1 border-t border-gray-200" />
              )}

              {/* Games Section */}
              {gameResults.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider font-['Winky_Sans']">
                    Games
                  </div>
                  {gameResults.map((result) => (
                    <button
                      key={`game-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-2 text-left hover:bg-pink-50 transition-colors flex items-center gap-4"
                    >
                      <img
                        src={gameIcon}
                        alt="Game"
                        className="w-5 h-5 hidden sm:block"
                      />
                      <span className="text-xs sm:text-sm text-gray-900">
                        {result.name}
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
          ) : query.length >= 2 ? (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
