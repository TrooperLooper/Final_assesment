import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Play from "./pages/Play";
import Stats from "./pages/Stats";
import Games from "./pages/Games";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play/:gameId" element={<Play />} />
        <Route path="/stats/:userId" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;