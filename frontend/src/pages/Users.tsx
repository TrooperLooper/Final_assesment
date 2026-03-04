import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import { apiClient, API_BASE_URL } from "../components/api/apiClient";
import defaultAvatar from "../components/assets/user_default.jpeg";
import { FiPlus } from "react-icons/fi";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
};

// Helper to get correct image URL
const getImageUrl = (profilePictureUrl: string | undefined): string => {
  if (!profilePictureUrl) return defaultAvatar;
  // If it's already a full URL (starts with http), use it as-is
  if (profilePictureUrl.startsWith("http")) return profilePictureUrl;
  // If it's an /uploads path, prepend API_BASE_URL
  if (profilePictureUrl.startsWith("/uploads"))
    return `${API_BASE_URL}${profilePictureUrl}`;
  // Otherwise use as-is
  return profilePictureUrl;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-start pt-2 px-2 sm:px-8">
          {/* Header and main content */}

          <div className="flex-1 flex flex-col">
            {/* Headline row */}
            <div className="grid grid-cols-3 items-center px-12 pb-2 mt-2">
              <div></div>
              <div className="flex justify-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-center font-['Jersey_20'] sm:mt-4 mb-1 text-white drop-shadow-lg">
                  ALL USERS
                </h1>
              </div>
              <div></div>
            </div>

            {/* Second row: Add User button in third column */}
            <div className="grid grid-cols-3 items-center px-12 pb-2">
              <div></div>
              <div>
                {" "}
                <div className="text-center mb-8">
                  <p className="text-white text-xs sm:text-sm text-center">
                    Pick a user to track game statistics
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-20 sm:-mt-0">
                <button
                  className="flex items-center gap-2 text-white "
                  style={{ fontSize: "0.9rem" }}
                  onClick={() => navigate("/")}
                >
                  Add User
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white ml-1">
                    <FiPlus className="text-blue-900 w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
            <div className="filler h-6"></div>
            {/* User grid */}
            <div className="px-4 pb-12 w-full mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    onClick={() => {
                      localStorage.setItem("currentUser", JSON.stringify(user));
                      navigate(`/stats/${user._id}`);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Go to stats page for ${user.firstName} ${user.lastName}`}
                  >
                    <div className="w-32 h-32  bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={getImageUrl(user.profilePicture)}
                        alt={
                          user.firstName && user.lastName
                            ? `Profile picture of ${user.firstName} ${user.lastName}`
                            : "Default user avatar"
                        }
                        className="object-cover w-28 h-28"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = defaultAvatar;
                        }}
                      />
                    </div>
                    <div className="text-base font-['Winky_Sans'] text-white drop-shadow text-center">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Users;
