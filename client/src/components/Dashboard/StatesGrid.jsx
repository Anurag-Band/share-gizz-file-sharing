import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/auth/authThunk";
import {
  FaFileUpload,
  FaDownload,
  FaVideo,
  FaImage,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";

const StatsGrid = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (user && !hasFetched.current) {
      // Handle different user ID formats
      const userId = user.id || user._id;
      if (userId) {
        console.log("Dispatching getUser with ID:", userId);
        dispatch(getUser(userId));
        hasFetched.current = true;
      } else {
        console.error("No valid user ID found in user object:", user);
      }
    }
  }, [user, dispatch]);

  const cards = [
    {
      title: "Total Uploads",
      value: user?.totalUploads ?? 0,
      icon: <FaFileUpload className="text-blue-500" size={24} />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Downloads",
      value: user?.totalDownloads ?? 0,
      icon: <FaDownload className="text-green-500" size={24} />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Videos Uploaded",
      value: user?.videoCount ?? 0,
      icon: <FaVideo className="text-purple-500" size={24} />,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Images Uploaded",
      value: user?.imageCount ?? 0,
      icon: <FaImage className="text-pink-500" size={24} />,
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Documents Uploaded",
      value: user?.documentCount ?? 0,
      icon: <FaFileAlt className="text-amber-500" size={24} />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Last Login",
      value: user?.lastLogin
        ? new Date(user.lastLogin).toLocaleString()
        : "N/A",
      icon: <FaClock className="text-cyan-500" size={24} />,
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50",
    },
  ].filter((card) => card.value !== undefined); // Remove invalid cards if any

  return (
    <div className="mt-6 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-1">
              <img
                src={user?.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.fullname || "User"}
            </h2>
            <p className="text-gray-500 mb-1">
              {user?.email || "user@example.com"}
            </p>
            <p className="text-sm text-gray-400 mb-3">
              @{user?.username || "username"}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Premium User
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Verified
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="md:ml-auto flex flex-col items-center md:items-end mt-4 md:mt-0">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full text-sm font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-md ${card.bgColor} border border-gray-100 card-hover-effect overflow-hidden relative`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-r from-white/0 to-white/20 rounded-bl-full"></div>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-gray-600 font-medium mb-1">{card.title}</h4>
                <p
                  className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${card.color}`}
                >
                  {card.value}
                </p>
              </div>
              <div className="p-3 rounded-full bg-white/80 shadow-sm">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
