import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaFire } from "react-icons/fa";
import { Link } from "react-router"; 
import UseAxios from "../hooks/UseAxios";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "./Loading";
import { ThemeContext } from "../Context/ThemeContext";

const PopularPolicies = () => {
  const axiosInstance = UseAxios();
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";


  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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
    <section
      className={`mt-20 max-w-7xl mx-auto px-6 transition-colors duration-300 `}
    >
      <h2
        className={`text-4xl font-extrabold text-center mb-14 flex items-center justify-center gap-3 ${
          dark ? "text-white" : "text-[#27445D]"
        }`}
        data-aos="fade-up"
      >
        <FaFire className="text-primary animate-pulse text-3xl mt-2" />
        Popular Policies
      </h2>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {policies.map((policy, index) => (
          <div
            key={policy._id}
            className={`group relative rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full ${
              dark ? "bg-[#1e293b]" : "bg-white"
            }`}
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
                <h3 className="text-xl font-bold line-clamp-2 drop-shadow">
                  {policy.title}
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p
                className={`text-sm mb-4 line-clamp-3 flex-grow ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {/* Removed unnecessary JS truncation, let line-clamp handle it, or keep it as is. Keeping original logic here: */}
                {policy.description.length > 100
                  ? policy.description.slice(0, 100) + "..."
                  : policy.description}
              </p>

              <div className="flex justify-between items-center mb-5 border-t border-gray-100 pt-4">
                <span className="text-primary text-2xl font-extrabold">
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
                 className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
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