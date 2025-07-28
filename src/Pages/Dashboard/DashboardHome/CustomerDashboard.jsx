import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../Components/Loading";




const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF4D4F", "#1890FF"];

const CustomerDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure= useAxiosSecure();
 const { data: summary = {}, isLoading, error } = useQuery({
  queryKey: ["customerSummary", user?.email],
  queryFn: async () => {
    const response = await axiosSecure.get(
      `/applications/summary?email=${user.email}`
    );
    return response.data;
  },
  enabled: !!user?.email,
  refetchOnWindowFocus: false,
    retry: false,
});

  if (isLoading) return <Loading/>;

  if (error)
    return (
      <p className="text-center text-red-600">
        Error loading data. Please try again.
      </p>
    );

  const { total = 0, approved = 0, pending = 0, rejected = 0, paymentsDue = 0 } =
    summary;

  const chartData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
    { name: "Payments Due", value: paymentsDue },
  ];

  return (
    <div className="p-4 space-y-6">
      <title>Dashboard</title>
      <h2 className="text-2xl font-semibold text-center">Customer Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg text-primary font-bold">Total Applications</h3>
          <p className="text-3xl text-primary font-semibold">{total}</p>
        </div>
        <div className="bg-green-100 text-green-800 shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">Approved</h3>
          <p className="text-3xl font-semibold">{approved}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">Pending</h3>
          <p className="text-3xl font-semibold">{pending}</p>
        </div>
        <div className="bg-red-100 text-red-800 shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">Rejected</h3>
          <p className="text-3xl font-semibold">{rejected}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">Payments Due</h3>
          <p className="text-3xl font-semibold">{paymentsDue}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 shadow rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-center text-primary">
          Application Status Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
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

export default CustomerDashboard;
