// @ts-nocheck
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "/src/assets/user_default.jpeg"
  ); // updated default image path

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to backend (username, password, profileImage)
    console.log({ username, password, profileImage });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-yellow-400 via-pink-700 to-purple-900">
      <div className="flex flex-col items-center w-full">
        <img
          src="./src/assets/svamp_animation.gif"
          alt="A cute mushroom animation"
          height={180}
          width={180}
          className="mb-2"
        />
        <h1 className="text-6xl font-bold font-['Pixelify_Sans'] text-yellow-300 drop-shadow-lg mb-18">
          Game Timer
        </h1>

        <div className="w-full max-w-3xl bg-pink-500 bg-opacity-40 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-4">
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
                  className="w-full rounded px-3 py-2 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                />
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
                  className="w-full rounded px-3 py-2 bg-white opacity-80 text-black border-2 border-pink-400 focus:outline-none focus:border-yellow-300 text-sm"
                />
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
                className={`self-end py-2 px-6 rounded-lg font-bold text-base shadow-lg transition-all ${
                  isFormValid
                    ? "bg-yellow-400 text-pink-900 hover:bg-yellow-300"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
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
