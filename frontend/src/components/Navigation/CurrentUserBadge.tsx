import React, { useState, useEffect } from "react";
import defaultAvatarImage from "../assets/user_default.jpeg";

const defaultAvatar = defaultAvatarImage;

export const CurrentUserBadge: React.FC = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  useEffect(() => {
    // Listen for changes to localStorage
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );
      setUser(updatedUser);
    };

    // Listen to storage events (works across tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (same tab updates)
    window.addEventListener("currentUserChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("currentUserChanged", handleStorageChange);
    };
  }, []);

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
