import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaClipboardList,
  FaUserShield,
  FaFileAlt,
  FaMoneyBill,
  FaTasks,
  FaUserCheck,
  FaBlog,
  FaCreditCard,
  FaClipboardCheck,
  FaHome,
} from "react-icons/fa";
import LifeSecure from "../Components/lifeSecure";
import useUserRole from "../hooks/UseUserRole";

const DashboardLayout = () => {
  const { role, isLoading } = useUserRole();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-gray-100 border-l-4 border-primary font-semibold"
        : "hover:bg-gray-50"
    }`;

  return (
    <div className="drawer drawer-mobile lg:drawer-open min-h-screen bg-gray-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="lg:hidden flex items-center justify-between bg-indigo-50 shadow px-4 py-3">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
            title="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <h1 className="text-primary  font-bold text-lg">Dashboard</h1>
          <div className="w-8" />
        </div>

        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 md:h-full lg:h-full bg-white text-primary border-r p-6 shadow-md">
          <LifeSecure />

          <nav className="space-y-3 mt-10">
            {!isLoading && role === "admin" && (
              <>
                <h2 className="text-2xl font-bold mb-10 text-primary tracking-wide">
                  Admin Panel
                </h2>

                <NavLink to="/dashboard" end className={navLinkClass}>
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </NavLink>

                <NavLink to="/dashboard/applications" className={navLinkClass}>
                  <FaClipboardList className="text-lg" />
                  <span>Manage Applications</span>
                </NavLink>

                <NavLink to="/dashboard/users" className={navLinkClass}>
                  <FaUserShield className="text-lg" />
                  <span>Manage Users</span>
                </NavLink>

                <NavLink to="/dashboard/policies" className={navLinkClass}>
                  <FaFileAlt className="text-lg" />
                  <span>Manage Policies</span>
                </NavLink>

                <NavLink to="/dashboard/blogs" className={navLinkClass}>
                  <FaBlog className="text-lg" />
                  <span>Manage Blogs</span>
                </NavLink>

                <NavLink to="/dashboard/transactions" className={navLinkClass}>
                  <FaMoneyBill className="text-lg" />
                  <span>Manage Transactions</span>
                </NavLink>
              </>
            )}

            {role === "agent" && (
              <>
                <h2 className="text-2xl font-bold mb-10 text-primary tracking-wide">
                  Agent Panel
                </h2>

                <NavLink to="/dashboard" end className={navLinkClass}>
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </NavLink>

                <NavLink to="/dashboard/assigned" className={navLinkClass}>
                  <FaTasks className="text-lg" />
                  <span>Assigned Customer</span>
                </NavLink>

                <NavLink to="/dashboard/blogs" className={navLinkClass}>
                  <FaBlog className="text-lg" />
                  <span>Manage Blogs</span>
                </NavLink>

                <NavLink
                  to="/dashboard/policy-clearance"
                  className={navLinkClass}
                >
                  <FaClipboardCheck className="text-lg" />
                  <span>Policy Clearance</span>
                </NavLink>
              </>
            )}

            {role === "customer" && (
              <>
                <h2 className="text-2xl font-bold mb-5 text-primary tracking-wide">
                  Customer Panel
                </h2>

                <NavLink to="/dashboard" end className={navLinkClass}>
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </NavLink>

                <NavLink to="/dashboard/my-applications" className={navLinkClass}>
                  <FaUserCheck className="text-lg" />
                  <span>My Applications</span>
                </NavLink>

                <NavLink to="/dashboard/payment-status" className={navLinkClass}>
                  <FaCreditCard className="text-lg" />
                  <span>Payment Status</span>
                </NavLink>

                <NavLink to="/dashboard/claim-request" className={navLinkClass}>
                  <FaFileAlt className="text-lg" />
                  <span>Claim Request</span>
                </NavLink>
              </>
            )}
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
