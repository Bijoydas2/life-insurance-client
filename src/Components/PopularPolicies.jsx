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
    <section className="mt-20 max-w-7xl mx-auto px-6">
      <h2
        className="text-4xl font-extrabold text-center text-[#27445D] mb-14 flex items-center justify-center gap-3"
        data-aos="fade-up"
      >
        <FaFire className="text-primary animate-pulse text-2xl" />
        Popular Policies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {policies.map((policy, index) => (
          <div
            key={policy._id}
            className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image section */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-lg font-bold line-clamp-2 drop-shadow">
                  {policy.title}
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {policy.description.length > 100
                  ? policy.description.slice(0, 100) + "..."
                  : policy.description}
              </p>

              <div className="flex justify-between items-center mb-5">
                <span className="text-primary text-lg font-bold">
                  ${policy.basePremium}
                </span>
                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                  <FaStar className="text-yellow-500" />
                  {policy.rating || 4.5}
                </span>
              </div>

              {/* Button */}
              <Link
                to={`/policy/${policy._id}`}
                className="mt-auto inline-block bg-gradient-to-r from-primary to-[#4D8EBE] text-white font-semibold text-center py-3 rounded-xl hover:from-white hover:to-white hover:text-primary hover:border-primary border-2 border-transparent hover:border transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12" data-aos="fade-up">
        <Link
          to="/allPolicies"
          className="inline-block bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-8 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          View All Policies
        </Link>
      </div>
    </section>
  );
};

export default PopularPolicies;
