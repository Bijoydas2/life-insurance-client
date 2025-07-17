import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "hover:text-blue-600 transition duration-200";

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-blue-600 text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span>LifeSecure</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/policies" className={navLinkClass}>All Policies</NavLink>
          <NavLink to="/blogs" className={navLinkClass}>Blog/Articles</NavLink>
          <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          <NavLink to="/register" className={navLinkClass}>Register</NavLink>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow text-gray-700 font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/policies" className={navLinkClass}>All Policies</NavLink>
          <NavLink to="/blogs" className={navLinkClass}>Blog/Articles</NavLink>
          <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          <NavLink to="/register" className={navLinkClass}>Register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
