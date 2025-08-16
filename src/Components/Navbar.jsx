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
      ? "text-primary font-semibold border-b-2 border-primary pb-1"
      : "hover:text-primary transition duration-200";

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/allPolicies" className={navLinkClass}>All Policies</NavLink>
      <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
      {user && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
    </>
  );

  return (
    <nav className="bg-indigo-50 dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 text-blue-600 dark:text-white text-xl font-bold">
          <LifeSecure />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 items-center text-gray-700 dark:text-gray-200 font-medium">
          {links}
        </div>

        {/* User Profile + Theme Button (Desktop) */}
      <div className="hidden md:flex items-center space-x-4 relative" ref={profileRef}>
  {/* Theme Toggle */}
  <button
    onClick={toggleTheme}
    className="text-2xl p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
    aria-label="Toggle Theme"
  >
    {theme === "light" ? (
      <FiMoon className="text-slate-600" />
    ) : (
      <FiSun className="text-amber-400" />
    )}
  </button>

  {/* Profile */}
  {!user ? (
    <Link to="/login" className="btn bg-primary text-white border-none">
      Login
    </Link>
  ) : (
    <div
      className="relative"
      onMouseEnter={() => setProfileOpen(true)}
      onMouseLeave={() => setProfileOpen(false)}
    >
      <button onClick={toggleProfile} className="focus:outline-none">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            className="h-10 w-10 rounded-full border-2 border-blue-600"
            alt="User"
          />
        ) : (
          <FaUserCircle className="text-3xl text-blue-600 dark:text-white" />
        )}
      </button>

      {profileOpen && (
        <div className="absolute right-0 top-12 w-56 pt-4 bg-white dark:bg-gray-800 shadow-lg rounded-md text-gray-700 dark:text-gray-200 z-50">
          <div className="flex flex-col items-center border-b pb-4 mb-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="h-16 w-16 rounded-full mb-2"
              />
            ) : (
              <FaUserCircle className="text-primary text-5xl mb-2" />
            )}
            <p className="text-lg font-semibold text-primary">
              {user.displayName || "User"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <NavLink
            to="/profile"
            className="block py-2 text-center hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            My Profile
          </NavLink>
          <button
            onClick={() => {
              SignOut();
              setProfileOpen(false);
            }}
            className="w-full text-red-600 py-2 hover:bg-red-100 dark:hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}
</div>


        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-200 text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 z-50 p-6 shadow-lg rounded-bl-lg flex flex-col">
          <button onClick={toggleMenu} className="self-end text-xl text-primary mb-4">
            <FaTimes />
          </button>

          {/* User Info */}
          {user && (
            <div className="flex flex-col items-center mb-4 border-b pb-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="h-16 w-16 rounded-full mb-2" />
              ) : (
                <FaUserCircle className="text-blue-600 text-5xl dark:text-white" />
              )}
              <p className="text-sm font-medium text-primary">{user.displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col space-y-3 text-gray-700 dark:text-gray-200 font-medium">
            {links}
            {!user ? (
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
            ) : (
              <>
                <NavLink to="/profile" className={navLinkClass}>My Profile</NavLink>
                <button onClick={SignOut} className="text-red-600 text-left">Logout</button>
              </>
            )}
          </div>

          {/* Theme Button in Mobile Drawer */}
          <div className="mt-6">
            <button
              onClick={toggleTheme}
              className="text-2xl p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <FiMoon className="text-slate-600" />
              ) : (
                <FiSun className="text-amber-400" />
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
