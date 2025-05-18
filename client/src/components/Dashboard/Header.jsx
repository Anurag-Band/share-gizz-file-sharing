import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ sidebarOpen, setSidebarOpen }) => {

   const {user}=useSelector((state)=>state.auth)
  //  console.log(user);



    return (
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
    <button
      className="text-gray-700 focus:outline-none md:hidden"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {sidebarOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-semibold text-gray-800">Welcome</h1>
      <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
        Home Page
      </Link>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">Hi, {user?.fullname}</span>
      <img src={user?.profilePic} alt="Avatar" className="w-8 h-8 rounded-full" />
    </div>
  </header>
    )
}

export default Header;
