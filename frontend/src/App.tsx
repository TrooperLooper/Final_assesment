import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Play from "./pages/Play";
import Stats from "./pages/Stats";
import Games from "./pages/Games";
import Users from "./pages/Users";
import NavigationBar from "./components/Navigation/NavigationBar";
import Header from "./components/Navigation/header";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <NavigationBar />
        <div className="flex-1 flex flex-col">
          <div className="ml-10 sm:ml-20">
            <Header />
          </div>
          <main className="flex-1 px-4 ml-0 sm:ml-20">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/users" element={<Users />} />
              <Route path="/games" element={<Games />} />
              <Route path="/play/:gameId" element={<Play />} />
              <Route path="/stats/:userId" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
