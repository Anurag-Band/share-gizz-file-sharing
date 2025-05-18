import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      }`}
    >
      <button
        className={`focus:outline-none md:hidden transition-colors ${
          scrolled ? "text-gray-700" : "text-white"
        }`}
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
        <h1 className={`text-xl font-bold ${
          scrolled
            ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
            : "text-white"
        }`}>
          Welcome to Share Gizz
        </h1>
        <Link
          to="/"
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          } text-white px-4 py-2 rounded-full text-sm font-medium`}
        >
          Home Page
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <span className={`font-medium ${scrolled ? "text-gray-700" : "text-white"}`}>
          Hi, {user?.fullname}
        </span>
        <div className="relative">
          <img
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
