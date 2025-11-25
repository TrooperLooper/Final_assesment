// @ts-nocheck
import { useState } from "react";
import { z } from "zod";
import LeftStar from "../components/Stars/LeftStar";
import RightStar from "../components/Stars/RightStar";
import { createUser } from "../components/api/apiClient";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../components/assets/user_default.jpeg";
import Layout from "../components/Navigation/Layout";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imagePreview, setImagePreview] = useState(defaultAvatar);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isFormValid = registerSchema.safeParse({
    email,
    firstName,
    lastName,
  }).success;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert("File is too large! Max 5MB allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = registerSchema.safeParse({ email, firstName, lastName });
    if (!result.success) {
      const formErrors = {};
      result.error.errors.forEach((error) => {
        formErrors[error.path[0]] = error.message;
      });
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      // Only include profilePicture if it's not the default
      const userData: any = {
        email,
        firstName,
        lastName,
      };

      // Only send profilePicture if user uploaded a custom one
      if (imagePreview !== defaultAvatar) {
        userData.profilePicture = imagePreview;
      }

      const newUser = await createUser(userData);

      localStorage.setItem("currentUser", JSON.stringify(newUser));
      navigate(`/stats/${newUser._id}`);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      alert(
        `Registration failed: ${
          error.response?.data?.message || error.message || "Please try again"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Gradient background as a -z layer */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-t from-pink-400 via-pink-700 to-red-700" />
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-start pt-5 px-2 sm:px-8">
          {/* Headline on top, centered */}
          <div className="w-full flex justify-center mt-2 mb-4">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-normal font-['Jersey_20'] text-yellow-300 drop-shadow-lg text-center">
              GAME TIMER
            </h1>
          </div>
          {/* Main content below headline */}
          <div className="flex flex-col items-center w-full">
            {/* Grid row for mushroom and stars */}
            <div
              className="grid grid-cols-8 w-full mb-2"
              style={{ maxWidth: 600 }}
            >
              {/* Left star (columns 1-2) */}
              <div className="col-span-2 flex items-center justify-center">
                <LeftStar size={20} color="gold" />
              </div>
              {/* Mushroom (columns 3-6) */}
              <div className="col-span-4 flex flex-col items-center justify-center">
                <div className="mb-2">
                  <RightStar size={16} color="gold" />
                </div>
                <img
                  src="./src/components/assets/svamp_animation.gif"
                  alt="Animated mushroom character for registration"
                  height={120}
                  width={120}
                  className="mb-2 sm:h-[180px] sm:w-[180px]"
                />
              </div>
              {/* Empty right cell (columns 7-8) */}
              <div className="col-span-2" />
            </div>
            {/* Grid row for headline and right star */}
            <div
              className="grid grid-cols-8 w-full mb-6"
              style={{ maxWidth: 600 }}
            >
              {/* Empty left cell (columns 1-2) */}
              <div className="col-span-2" />
              {/* Headline (columns 3-6) */}
              <div className="col-span-4 flex items-center justify-center"></div>
              {/* Right star (columns 7-8) */}
              <div className="col-span-2 flex items-center justify-center">
                <RightStar size={12} color="gold" />
              </div>
            </div>
            <div className="w-full sm:max-w-xl max-w-xs mx-auto bg-rose-800 rounded-tl-xl text-center rounded-tr-xl px-4 py-2">
              <h3 className="Create_user text-yellow-300 font-['Jersey_20'] font-normal self-start text-2xl">
                CREATE A NEW USER
              </h3>
            </div>
            <div className="w-full sm:max-w-xl max-w-xs mx-auto bg-pink-500 bg-opacity-40 rounded-b-xl rounded-br-xl shadow-lg px-2 sm:px-8 py-6 flex flex-col items-center gap-4">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col sm:flex-row gap-8 font-['Winky_Sans'] px-2 sm:px-0"
              >
                {/* First div: Form fields (left aligned) */}
                <div className="flex flex-col gap-4 w-full sm:w-1/2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-yellow-200 font-semibold mb-1 text-sm"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded px-3 py-1 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-yellow-200 font-semibold mb-1 text-sm"
                    >
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full rounded px-3 py-1 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-xs">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-yellow-200 font-semibold mb-1 text-sm"
                    >
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full rounded px-3 py-1 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-xs">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Second div: Image uploader (pink column) */}
                <div className="flex flex-col gap-4 w-full sm:w-1/2 rounded-lg ">
                  {/* 1st: Label */}
                  <label className="text-yellow-200 font-semibold text-sm">
                    PROFILE PICTURE
                  </label>

                  {/* 2nd: Image preview and upload prompt */}
                  <div
                    className="flex flex-row gap-4 mb-2 items-center border-2 border-dashed bg-pink-400 border-white rounded-lg p-3 cursor-pointer w-full"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <img
                      src={imagePreview}
                      alt="Profile picture preview for registration"
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
                    disabled={!isFormValid || loading}
                    className={`z-10 self-end mt-3 py-1 px-4 rounded-lg font-bold text-base shadow-lg transition-all
                    active:scale-95 active:shadow-inner
                    ${
                      isFormValid && !loading
                        ? "bg-yellow-400 text-pink-900 hover:bg-yellow-300"
                        : "bg-gray-400 opacity-50 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "REGISTERING..." : "REGISTER"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
