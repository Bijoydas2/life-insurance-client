import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { Link } from "react-router"; 

import AOS from "aos";
import "aos/dist/aos.css";
import UseAxios from "../../hooks/UseAxios";
import { ThemeContext } from "../../Context/ThemeContext";

const AllPolicies = () => {
  const axiosInstance = UseAxios();
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");


  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["policies", page, search, sortOption],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/policies?page=${page}&limit=9&search=${search}`
      );
      
      let policies = res.data.policies || [];

      
      if (sortOption === "priceLowHigh") {
        policies.sort((a, b) => a.basePremium - b.basePremium);
      } else if (sortOption === "priceHighLow") {
        policies.sort((a, b) => b.basePremium - a.basePremium);
      }

      return { ...res.data, policies };
    },
  });

  const { policies = [], totalPages = 1 } = data || {};

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-10 transition-colors duration-300 ${
        dark ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <title>All Policies</title>
      <h2
        className={`text-4xl font-bold mb-10  text-center ${
          dark ? "text-white" : "text-[#27445D]"
        }`}
        data-aos="fade-down"
      >
        All Policies
      </h2>

      {/* Search + Sort */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className={`border p-2 rounded-lg w-full ${
              dark
                ? "bg-[#1e293b] border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          />
          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300 whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={`border p-3 rounded-lg w-full sm:w-auto ${
            dark
              ? "bg-[#1e293b] border-gray-700 text-gray-200"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <option value="">Sort by Price</option>
          <option value="priceLowHigh">Low to High</option>
          <option value="priceHighLow">High to Low</option>
        </select>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div
            key={policy._id}
            className={`group relative rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden h-full ${
              dark ? "bg-[#1e293b]" : "bg-white"
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image with overlay */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-lg">
                {policy.title}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p
                className={`text-sm mb-4 line-clamp-3 flex-grow ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {policy.description?.slice(0, 120) || "No description"}
              </p>
              <div className="flex justify-between items-center mb-4 border-t border-gray-100 pt-4">
                <span className="text-2xl text-primary font-extrabold">
                  ${policy.basePremium}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Age: {policy.minAge}-{policy.maxAge}
                </span>
              </div>

              <Link
                to={`/policy/${policy._id}`}
                className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Policy Not Found Message */}
      {policies.length === 0 && (
          <p className={`text-center py-10 text-xl font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              No policies found matching your criteria.
          </p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2 flex-wrap">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded transition-all duration-300 font-medium ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : dark
              ? "bg-gray-700 text-white hover:bg-primary"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
              page === pg
                ? "bg-primary text-white shadow-md"
                : dark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded transition-all duration-300 font-medium ${
            page === totalPages
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : dark
              ? "bg-gray-700 text-white hover:bg-primary"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPolicies;