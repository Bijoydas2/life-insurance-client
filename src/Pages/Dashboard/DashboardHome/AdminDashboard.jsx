import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { FaBook, FaFileAlt, FaUsers, } from "react-icons/fa";
import Loading from "../../../Components/Loading";


const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/summary");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500 text-center mt-8">Failed to load dashboard data.</p>;

  const {
    totalPolicies,
    totalBlogs,
    totalApplications,
    userRoleCounts = [],
  } = data;

  const roleMap = {
    agent: "Agent",
    customer: "Customer",
    admin: "Admin",
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">📊 Admin Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 border-primary">
          <FaFileAlt className="text-4xl text-primary" />
          <div className="text-secondary">
            <p className="text-lg">Total Policies</p>
            <p className="text-2xl  font-bold">{totalPolicies}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 border-secondary">
          <FaBook className="text-4xl text-secondary" />
          <div className="text-secondary">
            <p className="text-lg">Total Blogs</p>
            <p className="text-2xl font-bold">{totalBlogs}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 border-accent">
          <FaFileAlt className="text-4xl text-accent" />
          <div className="text-secondary">
            <p className="text-lg">Applications</p>
            <p className="text-2xl font-bold">{totalApplications}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-l-4 border-rose-500">
          <FaUsers className="text-4xl text-rose-500" />
          <div className="text-secondary">
            <p className="text-lg">Total Users</p>
            <p className="text-2xl font-bold">
              {userRoleCounts.reduce((sum, role) => sum + role.count, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-xl p-6 rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-4 text-center">User Role Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userRoleCounts}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ role, count }) => `${roleMap[role]} (${count})`}
            >
              {userRoleCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              formatter={(value) => roleMap[value]}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
