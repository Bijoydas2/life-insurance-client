import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";

const Navbar = () => {
  const { user, SignOut } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();


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
      <NavLink to="/blogs" className={navLinkClass}>Blog/Articles</NavLink>
      {user && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
    </>
  );

  return (
    <nav className="bg-indigo-50 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-blue-600 text-xl font-bold">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span>LifeSecure</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 items-center text-gray-700 font-medium">
          {links}
        </div>

        {/* User Profile (Desktop) */}
        <div
          className="hidden md:flex items-center space-x-4 relative"
          ref={profileRef}
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
        >
          {!user ? (
            <Link to="/login" className="btn bg-primary text-white border-none">Login</Link>
          ) : (
            <>
              <button onClick={toggleProfile} className="focus:outline-none">
                {user.photoURL ? (
                  <img src={user.photoURL} className="h-10 w-10 rounded-full border-2 border-blue-600" alt="User" />
                ) : (
                  <FaUserCircle className="text-3xl text-blue-600" />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-2 w-56 bg-white shadow-lg rounded-md text-gray-700 z-50">
                  <div className="flex flex-col items-center border-b pb-4 mb-4">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="h-16 w-16 rounded-full mb-2" />
                    ) : (
                      <FaUserCircle className="text-primary text-5xl mb-2" />
                    )}
                    <p className="text-lg font-semibold text-primary">{user.displayName || "User"}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <NavLink to="/profile" className="block py-2 text-center hover:bg-gray-100">My Profile</NavLink>
                  <button onClick={() => { SignOut(); setProfileOpen(false); }} className="w-full text-red-600 py-2 hover:bg-red-100">Logout</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div onClick={toggleMenu} className="fixed top-0 right-0 w-64 bg-white z-50 p-6 shadow-lg rounded-bl-lg" />
          <div className="fixed top-0 right-0 w-64 bg-white z-50 p-6 shadow-lg rounded-bl-lg">
            <button onClick={toggleMenu} className="self-end text-xl text-primary mb-4"><FaTimes /></button>

            {user && (
              <div className="flex flex-col items-center mb-4 border-b pb-4">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="h-16 w-16 rounded-full mb-2" />
                ) : (
                  <FaUserCircle className="text-blue-600 text-5xl" />
                )}
                <p className="text-sm font-medium text-primary">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}

            <div className="flex flex-col space-y-3 text-gray-700 font-medium">
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
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
