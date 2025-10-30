import React from "react";
import WeatherWidget from "../Weather/WeatherWidget";
import GlobalSearch from "../Navigation/GlobalSearch";

const Header: React.FC = () => (
  <header className="w-full flex justify-between items-center px-8 py-2 bg-transparent">
    <WeatherWidget />
    <GlobalSearch />
  </header>
);

export default Header;
