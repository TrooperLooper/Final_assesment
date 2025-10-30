import React from "react";
import WeatherWidget from "../Weather/WeatherWidget";
import GlobalSearch from "../GlobalSearch";

const Header: React.FC = () => (
  <header
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 50,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "rgba(255,255,255,0.8)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}
  >
    <WeatherWidget />
    <GlobalSearch />
  </header>
);

export default Header;