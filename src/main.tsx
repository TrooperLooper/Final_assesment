import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import your page components
import Register from "./pages/Register";
import Users from "./pages/Users";
import Games from "./pages/Games";
import Play from "./pages/Play";
import Stats from "./pages/Stats";
import Leaderboard from "./pages/Leaderboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play" element={<Play />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
