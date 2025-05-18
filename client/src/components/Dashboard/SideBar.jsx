import { Link } from "react-router-dom";
import { FaHome, FaUpload, FaSignOutAlt, FaUser, FaChartBar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setActiveTab, activeTab }) => {
  const { user } = useSelector((state) => state.auth);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { name: "Dashboard", icon: <FaHome className="w-5 h-5" />, id: "home" },
    { name: "Upload Files", icon: <FaUpload className="w-5 h-5" />, id: "upload" },
    { name: "Profile", icon: <FaUser className="w-5 h-5" />, id: "profile" },
    { name: "Logout", icon: <FaSignOutAlt className="w-5 h-5" />, id: "logout" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 ease-in-out z-40 w-72 bg-white shadow-xl md:translate-x-0 md:static md:inset-0 custom-scrollbar`}
    >
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <FaChartBar className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Share Gizz</h1>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={user?.profilePic || "https://via.placeholder.com/150"}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{user?.fullname || "User Dashboard"}</h2>
              <p className="text-xs text-gray-500">{user?.email || "Manage your files"}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link
            to="/"
            className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
              <FaHome className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Home Page</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main Menu
            </p>
          </div>

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                activeTab === tab.id
                  ? "bg-white/20"
                  : "bg-blue-100 group-hover:bg-blue-200"
              }`}>
                {tab.icon}
              </div>
              <span className="text-sm font-medium">{tab.name}</span>

              {activeTab === tab.id && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Need Help?</h3>
            <p className="text-xs text-blue-600 mb-3">Contact our support team for assistance with your account.</p>
            <button className="w-full py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
