import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaStar, FaFire } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "./Loading";

const PopularPolicies = () => {
  const axiosSecure = useAxiosSecure();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies/popular");
      return res.data;
    },
  });
 
  if (isLoading) return <Loading/>;

  return (
    <div className="mt-12 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-primary mb-10 flex items-center justify-center gap-2">
        <FaFire className="text-red-600 animate-pulse text-2xl" />
        Popular Policies
      </h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={policy.image}
              alt={policy.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-secondary mb-2">{policy.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {policy.description.slice(0, 100)}...
              </p>
              <div className="flex justify-between items-center mt-4 mb-4">
                <span className="text-lg font-bold text-primary">${policy.price}</span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <FaStar className="text-yellow-500" />
                  {policy.rating || 4.5}
                </span>
              </div>

              {/* View Button */}
              <Link to={`/policy/${policy._id}`}>
                <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition duration-300 font-semibold">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
         <div className="text-center mt-10">
  <Link to="/allPolicies">
    <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition duration-300">
      View All Policies
    </button>
  </Link>
</div>
    </div>
  );
};

export default PopularPolicies;
