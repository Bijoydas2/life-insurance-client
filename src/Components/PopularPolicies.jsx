import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaFire } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "./Loading";
import UseAxios from "../hooks/UseAxios";

const PopularPolicies = () => {
  const axiosInstance = UseAxios();

  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axiosInstance.get("/policies/popular");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError || !Array.isArray(policies))
    return (
      <p className="text-center py-10 text-red-600 font-semibold">
        Failed to load policies.
      </p>
    );

  return (
    <section className="mt-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-14 flex items-center justify-center gap-3">
        <FaFire className="text-red-600 animate-pulse text-2xl" />
        Popular Policies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden h-full"
          >
            {/* Image & overlay */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-lg font-bold line-clamp-2 drop-shadow">
                  {policy.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {policy.description.length > 100
                  ? policy.description.slice(0, 100) + "..."
                  : policy.description}
              </p>

              <div className="flex justify-between items-center text-sm font-semibold text-gray-700 mb-5">
                <span className="text-primary text-lg font-bold">
                  ${policy.basePremium}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <FaStar className="text-yellow-500" />
                  {policy.rating || 4.5}
                </span>
              </div>

              {/* “See more” button */}
              <Link
                to={`/policy/${policy._id}`}
                className="mt-auto inline-block bg-primary hover:bg-secondary text-white py-3 rounded-full text-center font-semibold transition-colors duration-300 shadow-md"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/allPolicies"
          className="inline-block bg-primary px-10 py-3 rounded-full text-white font-bold hover:bg-secondary transition-colors duration-300 shadow-lg"
        >
          View All Policies
        </Link>
      </div>
    </section>
  );
};

export default PopularPolicies;
