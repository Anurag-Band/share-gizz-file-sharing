import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/auth/authSlice";
import { toast } from "react-toastify";
import Header from "./Header";
import Sidebar from "./SideBar";
import StatsGrid from "./StatesGrid";
import UserProfile from "./UserProfile";
import UploadPage from "./UploadPage";
import FileShow from "./FileShow";
import "./dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Handle logout when the logout tab is selected
  useEffect(() => {
    if (activeTab === "logout") {
      const logoutTimer = setTimeout(() => {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/");
      }, 1000);

      return () => clearTimeout(logoutTimer);
    }
  }, [activeTab, dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-blue-600 border-r-indigo-600 border-b-blue-600 border-l-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar sidebarOpen={sidebarOpen} setActiveTab={setActiveTab} activeTab={activeTab}/>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="flex flex-col flex-1">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            {activeTab === "upload" && <UploadPage />}
            {activeTab === "profile" && <UserProfile />}
            {activeTab === "logout" && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-t-blue-600 border-r-indigo-600 border-b-blue-600 border-l-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                    Logging out...
                  </h1>
                </div>
              </div>
            )}
            {activeTab === "home" && (
              <>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                    Dashboard Overview
                  </h2>
                  <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </div>
                <StatsGrid />
                <FileShow />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
