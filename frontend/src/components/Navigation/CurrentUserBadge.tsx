import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/user_default.jpeg";

export const CurrentUserBadge: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load user on mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing currentUser:", error);
        setUser(null);
      }
    }

    // Listen for user changes from GlobalSearch
    const handleUserChanged = () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing currentUser:", error);
          setUser(null);
        }
      }
    };

    window.addEventListener("userChanged", handleUserChanged);
    return () => window.removeEventListener("userChanged", handleUserChanged);
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-end mr-4">
      <img
        src={
          user.profilePicture && user.profilePicture.trim()
            ? user.profilePicture
            : defaultAvatar
        }
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border border-gray-300"
      />
      <span className="text-xs mt-1 text-white/50 font-semibold text-center">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default CurrentUserBadge;
