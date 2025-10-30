import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navigation/Header";
import { apiClient } from "../components/api/apiClient";
import defaultAvatar from "../components/assets/user_default.jpeg";
import { FiPlus } from "react-icons/fi";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700 flex flex-col">
      {/* Header (search bar should be inside Header component only) */}
      <Header />
      {/* Main content */}
      <div className="flex-1 flex flex-col pt-8">
        {/* Title and Add User button in 3 columns */}
        <div className="grid grid-cols-3 items-center px-12 pb-2">
          {/* First column: empty */}
          <div></div>
          {/* Second column: headline centered */}
          <div className="flex justify-center">
            <h1 className="text-4xl font-['Pixelify_Sans'] text-white drop-shadow">
              USERS
            </h1>
          </div>
          {/* Third column: Add User button right aligned */}
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 bg-white/80 text-blue-900 font-bold px-4 py-2 rounded-full shadow hover:bg-white transition"
              onClick={() => navigate("/register")}
            >
              Add User <FiPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="filler h-10"></div>
        {/* User grid */}
        <div className="px-12 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {users.map((user) => (
              <div key={user._id} className="flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={
                      user.profilePicture?.startsWith("/uploads")
                        ? `http://localhost:3000${user.profilePicture}`
                        : user.profilePicture || defaultAvatar
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                    className="object-cover w-40 h-40"
                  />
                </div>
                <div className="text-lg font-['Winky_Sans'] text-white drop-shadow text-center">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
