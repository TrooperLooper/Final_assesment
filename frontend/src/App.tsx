import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { WeatherProvider } from "./context/WeatherContext";
import Register from "./pages/Register";
import Play from "./pages/Play";
import Stats from "./pages/Stats";
import Games from "./pages/Games";
import Users from "./pages/Users";

function AnimatedRoutes() {
  const location = useLocation();

  const handleExitComplete = () => {
    // Scroll to top after exit animation completes, before enter animation starts
    // window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={handleExitComplete}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play/:gameId" element={<Play />} />
        <Route path="/stats/:userId" element={<Stats />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <WeatherProvider>
      <Router>
        <div className="min-h-screen">
          <AnimatedRoutes />
        </div>
      </Router>
    </WeatherProvider>
  );
}

export default App;
