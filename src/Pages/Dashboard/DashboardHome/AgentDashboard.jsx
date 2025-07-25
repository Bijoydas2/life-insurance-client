import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';
import { FaUserTie } from 'react-icons/fa';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AgentDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ['agentSummary', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/agent-summary/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const { assignedCustomersCount, clearanceRequestsCount, blogsCount } = summary;

  const data = [
    { name: 'Assigned Customers', value: assignedCustomersCount },
    { name: 'Clearance Requests', value: clearanceRequestsCount },
    { name: 'My Blogs', value: blogsCount },
  ];

  return (
    <div className="p-6 space-y-8">
    <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
    <FaUserTie className="text-primary w-8 h-8" />
  Agent Dashboard
  </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-[#0088FE]">Assigned Customers</h4>
          <p className="text-3xl text-blue-600 font-bold">{assignedCustomersCount}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-[#00C49F]">Clearance Requests</h4>
          <p className="text-3xl text-green-600 font-bold">{clearanceRequestsCount}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-[#FFBB28]">My Blogs</h4>
          <p className="text-3xl text-yellow-600 font-bold">{blogsCount}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full md:w-1/2 mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgentDashboard;
