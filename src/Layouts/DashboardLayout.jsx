import React from "react";
import { Link, Outlet, useLocation } from "react-router";
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
} from "react-icons/fa";
import LifeSecure from "../Components/lifeSecure";
import useUserRole from "../hooks/UseUserRole";
import Loading from '../Components/Loading'


const DashboardLayout = () => {
  const location = useLocation();
  const { role, isLoading } =useUserRole();
 console.log("DashboardLayout Role:", role, "Loading:", isLoading);
  const isActive = (path) => location.pathname.includes(path);
  
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-primary border-r p-6 shadow-md">
        {/* Logo or App Name */}
        <LifeSecure />

        {/* Navigation */}
        <nav className="space-y-3 mt-10">
          {!isLoading && role === "admin" && (
            <>
             <h2 className="text-2xl font-bold mb-10 text-primary tracking-wide">Admin Panel</h2>
              <Link
                to="/dashboard/applications"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive("applications")
                    ? "bg-gray-100 border-l-4 border-primary font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                <FaClipboardList className="text-lg" />
                <span>Manage Applications</span>
              </Link>

              <Link
                to="/dashboard/users"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive("users")
                    ? "bg-gray-100 border-l-4 border-primary font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                <FaUserShield className="text-lg" />
                <span>Manage Users</span>
              </Link>

              <Link
                to="/dashboard/policies"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive("policies")
                    ? "bg-gray-100 border-l-4 border-primary font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                <FaFileAlt className="text-lg" />
                <span>Manage Policies</span>
              </Link>
               <Link
              to="/dashboard/blogs"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("blogs")
                  ? "bg-gray-100 border-l-4 border-primary font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
               <FaBlog className="text-lg" />
              <span>Manage Blogs</span>
            </Link>

              <Link
                to="/dashboard/transactions"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive("transactions")
                    ? "bg-gray-100 border-l-4 border-primary font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                <FaMoneyBill className="text-lg" />
                <span>Manage Transactions</span>
              </Link>
            </>
          )}

          {role === "agent" && (
            <>
              <h2 className="text-2xl font-bold mb-10 text-primary tracking-wide">Agent Panel</h2>
            <Link
              to="/dashboard/assigned"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("assigned")
                  ? "bg-gray-100 border-l-4 border-primary font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              <FaTasks className="text-lg" />
              <span>Assigned Customer</span>
            </Link>
            <Link
              to="/dashboard/blogs"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("blogs")
                  ? "bg-gray-100 border-l-4 border-primary font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
               <FaBlog className="text-lg" />
              <span>Manage Blogs</span>
            </Link>
            <Link
             to="/dashboard/policy-clearance"
             className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
             isActive("policy-clearance")
              ? "bg-gray-100 border-l-4 border-primary font-semibold"
               : "hover:bg-gray-50"
               }`}
                  >
              <FaClipboardCheck className="text-lg" />
                <span>Policy Clearance</span>
                </Link>
            </>
          )}

       {role ==='customer' && (
   <>
    <h2 className="text-2xl font-bold mb-5 text-primary tracking-wide">Customer Panel</h2>
    <Link
      to="/dashboard/my-applications"
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
        isActive("my-applications")
          ? "bg-gray-100 border-l-4 border-primary font-semibold"
          : "hover:bg-gray-50"
      }`}
    >
      <FaUserCheck className="text-lg" />
      <span>My Applications</span>
    </Link>
    <Link
  to="/dashboard/payment-status"
  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
    isActive("payment-status")
      ? "bg-gray-100 border-l-4 border-primary font-semibold"
      : "hover:bg-gray-50"
  }`}
 >
  <FaCreditCard className="text-lg" />
  <span>Payment Status</span>
 </Link>
      <Link
        to="/dashboard/claim-request"
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          isActive("claim-request")
            ? "bg-gray-100 border-l-4 border-primary font-semibold"
            : "hover:bg-gray-50"
        }`}
      >
        <FaFileAlt className="text-lg" />
        <span>Claim Request</span>
      </Link>
   </>
  )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
