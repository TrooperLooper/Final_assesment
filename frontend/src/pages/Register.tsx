// @ts-nocheck
import { useState } from "react";
import { z } from "zod";
import Star from "../components/Star";
import { apiClient } from "../components/api/apiClient";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../components/assets/user_default.jpeg";
import Layout from "../components/Navigation/Layout";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/users/register', {
        username,
        email
      });

      console.log('Registration successful:', response.data);
      
      // Navigate to games page after successful registration
      navigate('/games');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Gradient background as a -z layer */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-t from-pink-400 via-pink-700 to-red-700" />
      <div className="min-h-screen flex flex-col items-center justify-start pt-5 px-2 sm:px-8">
        {/* Headline on top, centered */}
        <div className="w-full flex justify-center mt-2 mb-4">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold font-['Pixelify_Sans'] text-yellow-300 drop-shadow-lg text-center">
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/games')}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            {/* Empty left cell (columns 1-2) */}
            <div className="col-span-2" />
            {/* Headline (columns 3-6) */}
            <div className="col-span-4 flex items-center justify-center"></div>
            {/* Right star (columns 7-8) */}
            <div className="col-span-2 flex items-center justify-center">
              <Star size={12} delay="0.7s" />
            </div>
          </div>
          <div className="w-full max-w-xl bg-pink-500 bg-opacity-40 rounded-xl shadow-lg px-2 sm:px-8 py-6 flex flex-col items-center gap-4">
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
                    <span className="text-red-500 text-xs">{errors.email}</span>
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
              <div className="flex flex-col gap-4 w-1/2 rounded-lg ">
                {/* 1st: Label */}
                <label className="text-yellow-200 font-semibold text-sm">
                  PROFILE PICTURE
                </label>

                {/* 2nd: Image preview and upload prompt */}
                <div
                  className="flex flex-row gap-4 mb-2 items-center border-2 border-dashed bg-pink-400 border-white rounded-lg p-3 cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <img
                    src={imagePreview}
                    alt="Profile avatar"
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
                  className={`z-10 self-end py-1 px-4 rounded-lg font-bold text-base shadow-lg transition-all ${
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
    </Layout>
  );
  
};

export default Register;
