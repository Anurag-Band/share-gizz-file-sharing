import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/auth/authSlice";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { FaUser, FaEnvelope, FaIdCard, FaCalendarAlt, FaSignOutAlt, FaTrashAlt, FaEdit, FaKey, FaShieldAlt } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // TODO: Implement account deletion
      toast.info("Account deletion functionality will be implemented soon");
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
          My Profile
        </h2>
        <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                  <img
                    src={user?.profilePic || "https://i.pravatar.cc/100"}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.fullname || "User"}</h3>
              <p className="text-gray-600 mb-4">{user?.email || "No email provided"}</p>

              <div className="flex justify-center space-x-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Premium User
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Verified
                </span>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center text-gray-600">
                  <FaIdCard className="w-5 h-5 mr-3 text-blue-500" />
                  <span>ID: {user?.id || user?._id || "Unknown"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Joined: {user?.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : "Unknown"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUser className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Username: @{user?.username || "username"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FaShieldAlt className="w-5 h-5 mr-2 text-blue-500" />
              Account Actions
            </h4>
            <div className="space-y-3">
              <button
                className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Logout
              </button>
              <button
                className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                onClick={handleDeleteAccount}
              >
                <FaTrashAlt className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaEdit className="w-5 h-5 mr-2 text-blue-500" />
              Edit Profile
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                  defaultValue={user?.fullname || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your username"
                  defaultValue={user?.username || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your email"
                  defaultValue={user?.email || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your phone number"
                  defaultValue={user?.phone || ""}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Tell us about yourself"
                rows={4}
                defaultValue={user?.bio || ""}
              ></textarea>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaKey className="w-5 h-5 mr-2 text-blue-500" />
              Security Settings
            </h4>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
