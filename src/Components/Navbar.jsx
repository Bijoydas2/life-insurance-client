import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";

const Navbar = () => {
  const { user,SignOut } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openProfile = () => setProfileOpen(true);
  const closeProfile = () => setProfileOpen(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);

 const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-blue-600 pb-1"
      : "hover:text-primary transition duration-200";

  const links =<>
    <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>Home</NavLink>
    <NavLink to="/policies" className={navLinkClass} onClick={toggleMenu}>All Policies</NavLink>
    <NavLink to="/blogs" className={navLinkClass} onClick={toggleMenu}>Blog/Articles</NavLink>
    {user && <NavLink to="/dashboard" className={navLinkClass} onClick={toggleMenu}>Dashboard</NavLink>}
  </>

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        closeProfile();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 text-blue-600 text-xl font-bold">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span>LifeSecure</span>
          </NavLink>
        </div>

        {/* Middle: Nav links (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 items-center text-gray-700 font-medium">
          {links}
        </div>

        {/* Right: User/Login (desktop only) */}
        <div
          className="hidden md:flex items-center space-x-4 relative"
          ref={profileRef}
          onMouseEnter={openProfile}
          onMouseLeave={closeProfile}
        >
          {!user ? (
            <>
            
              <button className="btn bg-primary border-none">   <Link to="/login"  className={navLinkClass}>Login</Link></button>
             
              
            </>
          ) : (
            <div>
              {/* Profile Image - click toggles too */}
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 focus:outline-none"
                aria-expanded={profileOpen}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-blue-600"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-blue-600" />
                )}
                
              </button>

              {/* Show dropdown if hovered or clicked */}
              {profileOpen && (
                <div className="absolute right-0  w-56 bg-white shadow-lg rounded-md  text-gray-700 z-50">
                  <div className="flex flex-col items-center border-b pb-4 mb-4">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="h-16 w-16 rounded-full object-cover mb-2"
                      />
                    ) : (
                      <FaUserCircle className="text-primary text-5xl mb-2" />
                    )}
                    <p className="text-lg text-primary font-semibold">{user.displayName || "User"}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <NavLink
                    to="/profile"
                    className="block w-full text-center py-2 rounded hover:bg-gray-100 mb-2"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      SignOut();
                      setProfileOpen(false);
                    }}
                    className="w-full text-center py-2 rounded text-red-600 hover:bg-red-100"
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
          <button onClick={toggleMenu} className="text-gray-700 text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
  {isOpen && (
  <>
    {/* Backdrop */}
    <div
      onClick={toggleMenu}
      className="fixed inset-0 bg-black bg-opacity-40 z-40"
    />

    {/* Sidebar Drawer */}
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg z-50 p-6 flex flex-col space-y-6 transition-transform duration-300 rounded-bl-lg max-h-screen overflow-y-auto dark:bg-gray-900 dark:shadow-gray-700">
      
      {/* Close Button */}
      <button
        onClick={toggleMenu}
        className="self-end text-xl text-gray-700 mb-2 dark:text-gray-300"
      >
        <FaTimes />
      </button>

      {/* Mobile Profile Section */}
      {user && (
        <div className="flex flex-col items-center border-b pb-4 mb-4 space-y-1 border-gray-200 dark:border-gray-700">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-blue-600 dark:text-blue-400 text-5xl" />
          )}
          <p className="text-sm font-medium text-[#0A7EA4]">
            {user.displayName || "User"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex flex-col space-y-3 text-gray-700  font-medium">
        {links}

        {!user ? (
          <NavLink
            to="/login"
            className={navLinkClass}
            onClick={toggleMenu}
          >
            Login
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/profile"
              className={navLinkClass}
              onClick={toggleMenu}
            >
              My Profile
            </NavLink>
            <button
              onClick={() => {
                SignOut();
                toggleMenu();
              }}
              className="text-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </>
)}
    </nav>
  );
};

export default Navbar;