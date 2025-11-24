import React from "react";
import WeatherWidget from "../Weather/WeatherWidget";
import GlobalSearch from "./GlobalSearch";
import CurrentUserBadge from "./CurrentUserBadge";

const Header: React.FC = () => (
  <header className="w-full grid grid-cols-[auto_1fr_auto] items-center px-2 sm:px-8 py-1 bg-transparent">
    {/* Left: Weather */}
    <div className="justify-self-start ml-3 sm:ml-0">
      <WeatherWidget />
    </div>
    {/* Center: Search */}
    <div className="justify-self-center ">
      <GlobalSearch />
    </div>
    {/* Right: User badge */}
    <div className="justify-self-end mt-2 ">
      <CurrentUserBadge />
    </div>
  </header>
);

export default Header;
