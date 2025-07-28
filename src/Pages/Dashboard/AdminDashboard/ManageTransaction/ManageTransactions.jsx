import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaChartLine } from 'react-icons/fa';

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState({
    from: null,
    to: null,
    user: '',
    policy: '',
  });

  // fetchTransactions inside component to use axiosSecure
  const fetchTransactions = async ({ queryKey }) => {
    const [_key, filters] = queryKey;
    const params = {};

    if (filters.from) params.from = filters.from.toISOString();
    if (filters.to) params.to = filters.to.toISOString();
    if (filters.user.trim()) params.user = filters.user.trim();
    if (filters.policy.trim()) params.policy = filters.policy.trim();

    const response = await axiosSecure.get('/transactions', { params });
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: fetchTransactions,
    keepPreviousData: true,
    retry: false,
    onError: () => {
      toast.error('Failed to fetch transactions');
    },
  });

  // Handle input changes for filters
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Prepare chart data from transactions
  const transactions = data?.transactions || [];
  const totalIncome = data?.totalIncome || 0;

  const chartData = transactions.reduce((acc, t) => {
    const date = new Date(t.date).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.amount += t.amount;
    } else {
      acc.push({ date, amount: t.amount });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <title>Manage Transaction</title>
      <h1 className="text-3xl font-bold mb-6 text-primary">Manage Transactions</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 font-semibold">From Date</label>
          <DatePicker
            selected={filters.from}
            onChange={(date) => handleFilterChange('from', date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select start date"
            className="input input-bordered bg-white text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">To Date</label>
          <DatePicker
            selected={filters.to}
            onChange={(date) => handleFilterChange('to', date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select end date"
            className="input input-bordered bg-white text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="text"
            value={filters.user}
            onChange={(e) => handleFilterChange('user', e.target.value)}
            placeholder="Filter by user email"
            className="input bg-white text-gray-700 input-bordered"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Policy Name</label>
          <input
            type="text"
            value={filters.policy}
            onChange={(e) => handleFilterChange('policy', e.target.value)}
            placeholder="Filter by policy name"
            className="input input-bordered bg-white text-gray-700"
          />
        </div>

        <button onClick={() => refetch()} className="btn btn-primary ml-2">
          Apply Filters
        </button>
      </div>

      {/* Loading/Error States */}
      {isLoading && <p>Loading transactions...</p>}
      {isError && <p className="text-red-600">Error fetching transactions</p>}

      {/* Total Income */}
      {!isLoading && !isError && (
        <div className="mb-6 text-2xl font-semibold text-center text-green-700 p-6 rounded-2xl bg-amber-400">
          Total Income: ${totalIncome.toFixed(2)}
        </div>
      )}

      {/* Transactions Table */}
      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="table  w-full">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Transaction ID</th>
                <th>Customer Email</th>
                <th>Policy Name</th>
                <th>Paid Amount ($)</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t._id} className='bg-white text-gray-700'>
                    <td className="font-mono">{t.transactionId}</td>
                    <td>{t.email}</td>
                    <td>{t.policyName}</td>
                    <td>{t.amount.toFixed(2)}</td>
                    <td>{new Date(t.date).toLocaleString()}</td>
                    <td>
                      <span
                        className={`font-semibold px-2 py-1 rounded ${
                          t.status === 'Paid'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

     {/* Earnings Chart */}
{!isLoading && !isError && (
  <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
      <FaChartLine className="text-indigo-600 text-xl" />
      Earnings Over Time
    </h2>
    {chartData.length === 0 ? (
      <p className="text-gray-600">No data available to display the chart.</p>
    ) : (
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: "8px", border: "1px solid #d1d5db" }}
            labelStyle={{ color: "#4b5563" }}
            itemStyle={{ color: "#4f46e5" }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
)}
    </div>
  );
};

export default ManageTransactions;
