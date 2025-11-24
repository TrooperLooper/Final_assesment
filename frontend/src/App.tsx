import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Play from "./pages/Play";
import Stats from "./pages/Stats";
import Games from "./pages/Games";
import Users from "./pages/Users";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/games" element={<Games />} />
          <Route path="/play/:gameId" element={<Play />} />
          <Route path="/stats/:userId" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
