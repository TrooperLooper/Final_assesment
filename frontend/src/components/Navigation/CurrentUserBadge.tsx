import React from "react";

const defaultAvatar = "/path/to/default/avatar.png"; // Update path

export const CurrentUserBadge: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

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
