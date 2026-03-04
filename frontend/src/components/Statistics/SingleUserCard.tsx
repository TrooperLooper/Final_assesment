import { useNavigate } from "react-router-dom";
import StarIcon from "../Stars/StarIcon";
import defaultAvatar from "../assets/user_default.jpeg";

interface SingleUserCardProps {
  user: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  totalTimePlayed: number;
}

const SingleUserCard: React.FC<SingleUserCardProps> = ({
  user,
  totalTimePlayed,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-black/60 rounded-tr-xl rounded-tl-xl shadow-lg p-6 sm:p-8 w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-center">
        {/* Profile Picture */}
        <div className="flex items-center justify-center md:justify-start">
          <img
            src={
              user.profilePicture && user.profilePicture.trim()
                ? user.profilePicture
                : defaultAvatar
            }
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-white object-cover shrink-0"
          />
        </div>

        {/* Name and Time */}
        <div className="flex flex-col justify-center min-w-[200px] max-w-[600px]">
          <div className="flex items-center justify-center md:justify-start font-['Jersey_20'] text-yellow-300 font-bold text-3xl sm:text-5xl mb-4">
            {user.firstName} {user.lastName}
            <StarIcon className="ml-2 mt-1" size={25} color="#facc15" />
          </div>
          <div className="text-white/60  text-xs sm:text-sm text-center md:text-start ">
            Total time played
          </div>
          <div className="text-white font-bold text-xl sm:text-2xl text-center md:text-start font-['Winky_Sans']">
            {totalTimePlayed} min
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4 items-center justify-center md:justify-end">
          <div className="flex flex-col items-center">
            <span className="text-xs text-white mb-1">Pick user</span>

            <button
              type="button"
              className="
                w-12 h-12 rounded-full bg-red-600
                border-3 border-black/70
                flex items-center justify-center
                shadow-xl transition-all
                active:scale-95 active:shadow-inner
                hover:border-yellow-400
                focus:outline-none
              "
              onClick={() => navigate("/users")}
              aria-label="Choose user"
            >
              <span className="text-white/60 text-xl font-bold">A</span>
            </button>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-white mb-1">Pick game</span>

            <button
              type="button"
              className="
                w-12 h-12 rounded-full bg-red-600
                border-3 border-black/70
                flex items-center justify-center
                shadow-xl transition-all
                active:scale-95 active:shadow-inner
                hover:border-yellow-400
                focus:outline-none
              "
              onClick={() => navigate("/games")}
              aria-label="New game"
            >
              <span className="text-white/60 text-xl font-bold">B</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserCard;
