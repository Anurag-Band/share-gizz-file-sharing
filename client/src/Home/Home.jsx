import { useState, useEffect } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { SiFsecure } from "react-icons/si";
import { GoFileSubmodule } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./home.css";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm"
            : "bg-gradient-to-r from-blue-600 to-indigo-800 text-white"
        } py-4 px-4 md:px-8 lg:px-20`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1
              className={`text-3xl font-bold bg-clip-text text-transparent ${
                scrolled
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "bg-gradient-to-r from-white to-blue-100"
              }`}
            >
              Share Gizz
            </h1>
            <p
              className={`ml-4 hidden md:block ${
                scrolled ? "text-gray-600" : "text-blue-100"
              }`}
            >
              Share files effortlessly, anywhere, anytime
            </p>
          </div>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`transition-all duration-300 ${
                    scrolled
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  } text-white px-4 py-2 rounded-full font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/upload"
                  className={`transition-all duration-300 ${
                    scrolled
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  } text-white px-4 py-2 rounded-full font-medium`}
                >
                  Upload
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`transition-all duration-300 ${
                    scrolled
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  } text-white px-4 py-2 rounded-full font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`transition-all duration-300 ${
                    scrolled
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  } text-white px-4 py-2 rounded-full font-medium`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer for fixed header */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-left md:pr-12 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 leading-tight">
                Simplified File Sharing for Everyone
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Upload, share, and access your files with ease. Secure, fast,
                and designed for seamless collaboration.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/upload"
                  className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium px-8 py-4 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative bg-white p-2 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl"></div>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-8 relative">
                  <IoMdCloudUpload
                    className="text-blue-600 mx-auto mb-4"
                    size={80}
                  />
                  <div className="w-full h-4 bg-gray-200 rounded-full mb-3">
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-3/4"></div>
                  </div>
                  <div className="text-center text-gray-700 font-medium">
                    Uploading your files...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              What makes Share Gizz special?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with simplicity and security in mind,
              making file sharing a breeze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                  <IoMdCloudUpload
                    size={30}
                    className="text-blue-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Easy File Uploads
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Drag and drop your files or browse to upload. Our intuitive
                  interface makes sharing files quick and effortless.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-colors duration-300">
                  <SiFsecure
                    size={26}
                    className="text-indigo-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Secure Sharing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  End-to-end encryption ensures your files remain private and
                  secure. Control who can access your shared content.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                  <GoFileSubmodule
                    size={26}
                    className="text-blue-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Quick Access
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Access your files from any device, anywhere in the world. Your
                  content is always just a click away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              How Share Gizz works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to share your files with anyone, anywhere
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    1
                  </div>
                  <div className="text-center">
                    <TbUpload
                      size={40}
                      className="mx-auto mb-4 text-blue-600"
                    />
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Upload your file
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Select and upload the file you want to share. We support
                      all file types up to 2GB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 md:mt-16">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    2
                  </div>
                  <div className="text-center">
                    <FaLink
                      size={36}
                      className="mx-auto mb-4 text-indigo-600"
                    />
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Get your shareable link
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Once uploaded, you&apos;ll receive a secure link that you
                      can copy with one click.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    3
                  </div>
                  <div className="text-center">
                    <FaShareSquare
                      size={36}
                      className="mx-auto mb-4 text-blue-600"
                    />
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Share with anyone
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Share the link via email, messaging apps, or social media
                      with anyone you choose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call-to-Action Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800"></div>
        <div className="absolute inset-0 opacity-10 bg-pattern-dots"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 text-white mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to start sharing?
              </h2>
              <p className="text-xl text-blue-100 mb-0 md:pr-10">
                Join thousands of users who trust Share Gizz for their file
                sharing needs. Start uploading and sharing in seconds.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Link
                to="/upload"
                className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Upload Your First File
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Share Gizz
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Share Gizz is the easiest way to share files with anyone.
                Secure, fast, and designed for seamless collaboration.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors duration-300"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Share Gizz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
