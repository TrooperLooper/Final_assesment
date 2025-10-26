import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import your page components
import Register from "./pages/Register.tsx";
import Users from "./pages/Users.tsx";
import Games from "./pages/Games.tsx";
import Play from "./pages/Play.tsx";
import Stats from "./pages/Stats.tsx";

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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
