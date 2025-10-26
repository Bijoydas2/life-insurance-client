import React, { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router"; 
import Loading from "./Loading";
import UseAxios from "../hooks/UseAxios";

import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../Context/ThemeContext";

const RecentPolicies = () => {
  const axiosInstance = UseAxios();
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      offset: 100, 
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);

  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ["recentPolicies"],
    queryFn: async () => {
      const res = await axiosInstance.get("/policies/recent");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError || !Array.isArray(policies))
    return (
      <p className="text-center py-10 text-red-600 font-semibold">
        Failed to load recent policies.
      </p>
    );

  return (
    <section
      className={`mt-16 max-w-7xl mx-auto px-6 transition-colors duration-300 `}
    >
      <h2
        className={`text-4xl font-extrabold text-center mb-14 flex items-center justify-center gap-3 ${
          dark ? "text-white" : "text-[#27445D]"
        }`}
        data-aos="fade-down"
      >
        <FaClock className="text-primary animate-pulse text-3xl mt-2" />
        Recent Policies
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {policies.map((policy, index) => (
          <div
            key={policy._id || policy.createdAt}
            className={`group relative rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden h-full ${
              dark ? "bg-[#1e293b]" : "bg-white"
            }`}
            data-aos="zoom-in"
            data-aos-delay={index * 100} // stagger animation
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
                <h3 className="text-xl font-bold line-clamp-2 drop-shadow">
                  {policy.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p
                className={`text-sm mb-3 line-clamp-3 flex-grow ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {policy.description.length > 100
                  ? policy.description.slice(0, 100) + "..."
                  : policy.description}
              </p>

              <div className="flex justify-between items-center mb-5 border-t border-gray-100 pt-4">
                <span className="text-primary text-2xl font-extrabold">
                  ${policy.basePremium}
                </span>
                <span
                  className={`text-xs ${
                    dark ? "text-gray-400" : "text-gray-500"
                  } font-semibold`}
                >
                  Created: {new Date(policy.createdAt).toLocaleDateString()}
                </span>
              </div>

              <Link
                to={`/policy/${policy._id || policy.title}`}
                className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPolicies;