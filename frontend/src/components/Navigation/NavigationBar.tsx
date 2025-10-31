import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiUsers,
  FiBarChart2,
  FiPlayCircle,
  FiGrid,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { name: "Register", path: "/", icon: <FiUser /> },
  { name: "Games", path: "/games", icon: <FiGrid /> },
  { name: "Play", path: "/play/1", icon: <FiPlayCircle /> },
  { name: "Stats", path: "/stats/1", icon: <FiBarChart2 /> },
  { name: "Users", path: "/users", icon: <FiUsers /> },
];

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile only */}
      <button
        className="fixed top-4 left-4 z-40 sm:hidden bg-white/80 rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <FiMenu className="w-6 h-6 text-blue-900" />
      </button>

      {/* Sidebar for medium and large screens */}
      <nav className="fixed top-0 left-0 h-full w-20 bg-white/20 flex flex-col items-center py-8 gap-6 shadow-lg hidden sm:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs text-black/80 hover:text-blue-700 transition ${
                isActive ? "font-bold text-blue-900" : ""
              }`
            }
            end
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Mobile drawer sidebar */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
        >
          <nav
            className="absolute top-0 left-0 h-full w-40 bg-white/90 flex flex-col items-center pt-20 gap-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-white/80 rounded-full p-2"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <FiX className="w-6 h-6 text-blue-900" />
            </button>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-row items-center gap-2 text-xs text-black/80 hover:text-blue-700 transition ${
                    isActive ? "font-bold text-blue-900" : ""
                  }`
                }
                end
                onClick={() => setOpen(false)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
