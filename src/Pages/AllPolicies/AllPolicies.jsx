import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from "../../Components/Loading";
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllPolicies = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['policies', page, category, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/policies?page=${page}&limit=9&category=${category}&search=${search}`
      );
      return res.data;
    },
  });

  const { policies = [], totalPages = 1 } = data || {};

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl text-primary font-bold mb-6 text-center">All Policies</h2>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border text-gray-300 p-2 rounded w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Term Life">Term Life</option>
          <option value="Senior Plan">Senior Plan</option>
          <option value="Family">Family</option>
        </select>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="border p-2 text-white rounded w-full"
          />
          <button type="submit" className="bg-primary text-white px-4 rounded">
            Search
          </button>
        </form>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="p-4 shadow-md rounded bg-white flex flex-col"
          >
            <img
              src={policy.image}
              alt={policy.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-2xl text-secondary font-semibold mt-3">{policy.title}</h3>
            <p className="text-sm text-gray-700 mt-1 flex-grow">
              {policy.description?.slice(0, 60)}...
            </p>
            <Link
              to={`/policy/${policy._id}`}
              className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded text-center"
            >
              View
            </Link>
          </div>
        ))}
      </div>

     {/* Pagination with Prev / Page Numbers / Next */}
<div className="flex justify-center mt-8 gap-2 flex-wrap">
  {/* Prev Button */}
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={`px-4 py-2 text-gray-700 rounded ${
      page === 1 ? 'bg-gray-300  cursor-not-allowed' : 'bg-gray-200 hover:bg-primary'
    }`}
  >
    Prev
  </button>

  {/* Page Number Buttons */}
  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
    <button
      key={pg}
      onClick={() => setPage(pg)}
      className={`px-4 py-2 text-gray-700 rounded ${
        page === pg ? 'bg-primary text-white  font-semibold' : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      {pg}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className={`px-4 py-2 text-gray-700 rounded ${
      page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-primary'
    }`}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default AllPolicies;
