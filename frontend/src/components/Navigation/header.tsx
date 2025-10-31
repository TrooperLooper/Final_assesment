import React from "react";
import WeatherWidget from "../Weather/WeatherWidget";
import GlobalSearch from "../Navigation/GlobalSearch";

const Header: React.FC = () => (
  <header className="w-full flex flex-col sm:flex-row justify-between items-center px-2 sm:px-8 py-1 bg-transparent">
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
      <WeatherWidget />
      <div className="w-full sm:w-auto">
        <GlobalSearch />
      </div>
    </div>
  </header>
);

export default Header;
