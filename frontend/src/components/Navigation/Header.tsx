import React from "react";
import WeatherWidget from "../Weather/WeatherWidget";
import GlobalSearch from "../GlobalSearch";

const Header: React.FC = () => (
  <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent">
    <WeatherWidget />
    <GlobalSearch />
  </header>
);

export default Header;
