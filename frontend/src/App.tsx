import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Play from "./pages/Play";
import Stats from "./pages/Stats";
import Games from "./pages/Games";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
