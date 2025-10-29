// @ts-nocheck
import { useState } from "react";
import { z } from "zod";
import Star from "../components/Star";
import { apiClient } from "../components/api/apiClient";
import { useNavigate } from "react-router-dom";

// Zod schema for validation
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "/src/components/assets/user_default.jpeg"
  );
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Check if form is valid (username and password filled)
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // max 5MB ska detta vara med?
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("File size must be less than 5MB");
    }
  };

  // Validate form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zod validation
    const result = registerSchema.safeParse({ username, password });
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      // 1. Register user (no image)
      const userRes = await apiClient.post("/users", { username, password });
      if (userRes.status !== 201 && userRes.status !== 200) {
        alert("Registration failed!");
        return;
      }
      const userId = userRes.data.id || userRes.data._id;
      localStorage.setItem("currentUserId", userRes.data._id);

      // 2. Upload avatar (if selected)
      if (profileImage && userId) {
        const formData = new FormData();
        formData.append("avatar", profileImage);
        formData.append("userId", userId);

        const avatarRes = await apiClient.post(
          "/users/upload-avatar",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (avatarRes.status !== 201 && avatarRes.status !== 200) {
          alert("Avatar upload failed!");
          return;
        }
      }

      alert("Registration successful!");
      // Navigate to /users.tsx
      navigate("/users");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-pink-400 via-pink-700 to-red-700">
      <style>{`
        .star-animate {
          animation: twinkle 1s infinite ease-in-out, rotateStar 8s linear infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          70% { opacity: 1; transform: scale(10); }
        }
        @keyframes rotateStar {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Headline on top, centered */}
      <div className="w-full flex justify-center mt-8 mb-4">
        <h1 className="text-8xl font-bold font-['Pixelify_Sans'] text-yellow-300 drop-shadow-lg mb-0 text-center">
          GAME TIMER
        </h1>
      </div>

      {/* Main content below headline */}
      <div className="flex flex-col items-center w-full">
        {/* Grid row for mushroom and stars */}
        <div className="grid grid-cols-8 w-full mb-2" style={{ maxWidth: 600 }}>
          {/* Left star (columns 1-2) */}
          <div className="col-span-2 flex items-center justify-center">
            <Star size={20} delay="0s" />
          </div>
          {/* Mushroom (columns 3-6) */}
          <div className="col-span-4 flex items-center justify-center">
            <img
              src="./src/components/assets/svamp_animation.gif"
              alt="A cute mushroom animation"
              height={180}
              width={180}
              className="mb-2"
            />
          </div>
          {/* Empty right cell (columns 7-8) */}
          <div className="col-span-2" />
        </div>
        {/* Grid row for headline and right star */}
        <div className="grid grid-cols-8 w-full mb-6" style={{ maxWidth: 600 }}>
          {/* Empty left cell (columns 1-2) */}
          <div className="col-span-2" />
          {/* Headline (columns 3-6) */}
          <div className="col-span-4 flex items-center justify-center"></div>
          {/* Right star (columns 7-8) */}
          <div className="col-span-2 flex items-center justify-center">
            <Star size={12} delay="0.7s" />
          </div>
        </div>
        <div className="w-full max-w-xl bg-pink-500 bg-opacity-40 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-4">
          <h3 className="Create_user text-white font-bold self-start text-2xl  mb-2">
            Create user
          </h3>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row gap-8 font-['Winky_Sans']"
          >
            {/* First div: Form fields (left aligned) */}
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-yellow-200 font-semibold mb-1 text-sm"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded px-3 py-1 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                />
                {errors.username && (
                  <span className="text-red-500 text-xs">
                    {errors.username}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-yellow-200 font-semibold mb-1 text-sm"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded px-3 py-1 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            {/* Second div: Image uploader (pink column) */}
            <div className="flex flex-col gap-4 w-1/2 rounded-lg ">
              {/* 1st: Label */}
              <label className="text-yellow-200 font-semibold text-sm">
                USER AVATAR
              </label>

              {/* 2nd: Image preview and upload prompt */}
              <div
                className="flex flex-row gap-4 items-center border-2 border-dashed bg-pink-400 border-white rounded-lg p-3 cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <img
                  src={imagePreview}
                  alt="User avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-400"
                />
                <div className="flex flex-col">
                  <h4 className="text-black font-semibold text-base">
                    Upload image
                  </h4>
                  <p className="text-xs italic text-gray-600">
                    max. 5 mb filesize
                  </p>
                </div>
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* 3rd: Register button (right aligned) */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`self-end py-1 px-4 rounded-lg font-bold text-base shadow-lg transition-all ${
                  isFormValid
                    ? "bg-yellow-400 text-pink-900 hover:bg-yellow-300"
                    : "bg-gray-400 opacity-50 text-gray-700 cursor-not-allowed"
                }`}
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
