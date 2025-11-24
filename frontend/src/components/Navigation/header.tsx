import React from "react";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "../Weather/WeatherWidget";
import GlobalSearch from "../GlobalSearch";
import CurrentUserBadge from "../Navigation/CurrentUserBadge";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="w-full grid grid-cols-[auto_1fr_auto] items-center px-2 sm:px-8 py-3 bg-transparent">
      {/* Left: Weather */}
      <div className="justify-self-start ml-3 sm:ml-0">
        <WeatherWidget />
      </div>
      {/* Center: Search */}
      <div className="justify-self-center">
        <GlobalSearch onSearch={handleSearch} />
      </div>
      {/* Right: User badge */}
      <div className="justify-self-end">
        <CurrentUserBadge />
      </div>
    </header>
  );
};

export default Header;
