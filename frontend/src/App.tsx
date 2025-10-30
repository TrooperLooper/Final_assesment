import { Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Users from "./pages/Users";
import Games from "./pages/Games";
import Play from "./pages/Play";
import Stats from "./pages/Stats";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play/:Id" element={<Play />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  );
}

export default App;