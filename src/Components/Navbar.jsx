import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router"; 
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import UseAuth from "../hooks/UseAuth";
import LifeSecure from "../Components/LifeSecure";
import { ThemeContext } from "../Context/ThemeContext";

const Navbar = () => {
  const { user, SignOut } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const dark = theme === "dark";
  
  const primaryTextColor = dark ? "text-primary-light" : "text-primary";
  const defaultTextColor = dark ? "text-gray-200" : "text-gray-700";
  const hoverBgClass = dark ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const dropdownBgClass = dark ? "bg-gray-800" : "bg-white";

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const navLinkClass = ({ isActive }) =>
    isActive
      ? `${primaryTextColor} font-semibold border-b-2 border-primary-light dark:border-primary-light pb-1`
      : `${defaultTextColor} hover:${primaryTextColor} transition duration-200`;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/allPolicies" className={navLinkClass}>
        All Policies
      </NavLink>
      <NavLink to="/blogs" className={navLinkClass}>
        Blogs
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav
      className={`shadow sticky top-0 z-50 transition-colors duration-300 ${
        dark ? "bg-gray-900 shadow-gray-800" : "bg-indigo-100 shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 lg:py-3 flex justify-between items-center">
        
        <div className={`flex items-center gap-2 text-xl font-bold ${dark ? 'text-white' : 'text-blue-600'}`}>
          <LifeSecure />
        </div>

        
        <div className="hidden md:flex flex-1 justify-center space-x-6 items-center font-medium">
          {links}
        </div>

     
        <div
          className="hidden md:flex items-center space-x-4 relative"
          ref={profileRef}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`text-2xl p-2 rounded-full transition ${dark ? 'hover:bg-gray-700 text-amber-400' : 'hover:bg-gray-300 text-slate-600'}`}
            aria-label="Toggle Theme"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Profile/Login */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button onClick={toggleProfile} className="focus:outline-none">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="h-10 w-10 rounded-full border-2 border-blue-600 object-cover"
                    alt="User"
                  />
                ) : (
                  <FaUserCircle className={`text-3xl ${dark ? 'text-white' : 'text-blue-600'}`} />
                )}
              </button>

              {profileOpen && (
                <div
                  className={`absolute right-0 top-12 w-56 pt-4 ${dropdownBgClass} shadow-2xl rounded-md ${defaultTextColor} z-[60]`}
                >
                  <div className={`flex flex-col items-center border-b pb-4 mb-4 ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="h-16 w-16 rounded-full mb-2 object-cover"
                      />
                    ) : (
                      <FaUserCircle className={`${primaryTextColor} text-5xl mb-2`} />
                    )}
                    <p className={`text-lg font-semibold ${primaryTextColor}`}>
                      {user.displayName || "User"}
                    </p>
                    <p className={`text-sm ${dark? "text-ray-400": "text-[#27445D]"} `}>
                      {user.email}
                    </p>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className={`block py-2 px-4 text-center ${dark ? 'hover:bg-primary/20' : 'hover:bg-primary/20'}  ${dark ? 'text-gray-400' : 'text-[#27445D]'}`}
                  >
                    My Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      SignOut();
                      setProfileOpen(false);
                    }}
                    className={`w-full text-red-500 py-2 ${dark ? 'hover:bg-primary/20' : 'hover:bg-primary/20'} transition`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-3">
           {/* Mobile Theme Toggle */}
            <button
                onClick={toggleTheme}
                className={`text-2xl p-2 rounded-full transition ${dark ? 'text-amber-400' : 'text-slate-600'}`}
                aria-label="Toggle Theme"
            >
                {dark ? <FiSun /> : <FiMoon />}
            </button>

          <button onClick={toggleMenu} className={`${defaultTextColor} text-2xl`}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full ${
          dark ? "bg-gray-900" : "bg-white"
        } z-[70] p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={toggleMenu}
          className={`absolute top-4 right-4 text-2xl ${primaryTextColor}`}
        >
          <FaTimes />
        </button>

        {/* User Info */}
        {user && (
          <div className={`flex flex-col items-center mb-6 border-b pb-4 ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="h-16 w-16 rounded-full mb-2 object-cover"
              />
            ) : (
              <FaUserCircle className={`${primaryTextColor} text-5xl mb-2`} />
            )}
            <p className={`text-sm font-medium ${primaryTextColor}`}>{user.displayName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col space-y-4 font-medium">
          {links}
          {!user ? (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          ) : (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                My Profile
              </NavLink>
              <button onClick={SignOut} className="text-red-500 text-left hover:underline pt-2">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] md:hidden"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;