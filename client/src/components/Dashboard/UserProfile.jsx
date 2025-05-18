import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/auth/authSlice";
import { toast } from "react-toastify";
import { format } from "date-fns";

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
    <div className="p-6 bg-white shadow rounded-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>

      <div className="flex items-center space-x-6">
        <img
          src={user?.profilePic || "https://i.pravatar.cc/100"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{user?.fullname || "User"}</h3>
          <p className="text-gray-600">{user?.email || "No email provided"}</p>
          <p className="text-sm text-gray-500">User ID: {user?.id || user?._id || "Unknown"}</p>
          <p className="text-sm text-gray-500">
            Joined: {user?.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : "Unknown"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Account Actions</h4>
        <div className="space-y-3">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
