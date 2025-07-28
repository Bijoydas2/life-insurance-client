import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { Link } from "react-router"; 
import UseAxios from "../../hooks/UseAxios";

const AllPolicies = () => {
  const axiosInstance = UseAxios();

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["policies", page, category, search],
    queryFn: async () => {
      const res = await axiosInstance.get(
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

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl text-primary font-bold mb-10 text-center">
        All Policies
      </h2>

      {/* Filter + Search */}
       <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border text-gray-400 p-2 rounded w-full sm:w-auto"
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

      {/* Policy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            {/* Image with overlay */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold line-clamp-2 drop-shadow">
                  {policy.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {policy.description?.slice(0, 120) || "No description"}
              </p>

              <div className="mt-auto">
                <Link
                  to={`/policy/${policy._id}`}
                  className="block bg-primary hover:bg-secondary text-white text-center py-3 rounded-full font-semibold transition duration-300 shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 text-gray-700 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-primary hover:text-white"
          }`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`px-4 py-2 rounded font-medium ${
              page === pg
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {pg}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 text-gray-700 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-primary hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPolicies;
