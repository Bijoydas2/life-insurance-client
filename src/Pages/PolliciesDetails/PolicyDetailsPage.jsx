import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from '../../Components/Loading';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTags, FaClock, FaStar, FaUserAlt } from "react-icons/fa";
import { ThemeContext } from "../../Context/ThemeContext"; 

const PolicyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); 
  const dark = theme === 'dark';

  const { data: policy, isLoading, error } = useQuery({
    queryKey: ["policy", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading policy details.</p>;
  if (!policy) return <p className="text-center mt-10">No policy found.</p>;

  const handleGetQuote = () => {
    navigate("/quote", { state: { policyId: policy._id } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating); 
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block text-xl ${
            i <= roundedRating ? "text-yellow-400" : dark ? "text-gray-600" : "text-gray-300"
          }`}
          aria-label={`${i} star`}
        />
      );
    }
    return stars;
  };

  return (
    <div 
      className={`max-w-6xl mx-auto px-4 py-10 my-12 rounded-lg shadow-xl transition-colors duration-300 ${
        dark ? 'bg-[#1e293b]' : 'bg-white' 
      }`}
    >
      
      <h1 className="sr-only">Policy Details: {policy.title}</h1>
      
      <div className="md:flex md:gap-10">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={policy.image}
            alt={policy.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <h1 className={`text-4xl font-bold mt-6 ${dark ? 'text-primary-light' : 'text-primary'}`}>
            {policy.title}
          </h1>
          <p className={`mt-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            {policy.description}
          </p>
        </div>

        {/* Textual Info */}
        <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col justify-between">
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-800'}`}>Policy Snapshot</h2>
            
            {/* Key Information Grid */}
            <div className="grid grid-cols-1 gap-4 text-sm mb-6">
              {/* Category */}
              <p className={`flex items-center gap-2 font-semibold ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
                <FaTags className="text-secondary" />
                Category: <span className={`${dark ? 'text-white' : 'text-primary'}`}>{policy.category}</span>
              </p>

              {/* Age Eligibility */}
              <p className={`flex items-center gap-2 font-semibold ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
                <FaUserAlt className="text-secondary" />
                Age Eligibility: <span className={`${dark ? 'text-white' : 'text-primary'}`}>{policy.minAge} - {policy.maxAge} years</span>
              </p>

              {/* Coverage Range */}
              <p className={`flex items-center gap-2 font-semibold ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
                <FaTags className="text-secondary" />
                Coverage: <span className={`${dark ? 'text-white' : 'text-primary'}`}>৳{policy.coverageRange.min.toLocaleString()} - ৳{policy.coverageRange.max.toLocaleString()}</span>
              </p>

              {/* Base Premium */}
              <p className={`flex items-center gap-2 font-semibold ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
                <FaClock className="text-secondary" />
                Base Premium: <span className={`text-lg font-extrabold ${dark ? 'text-yellow-400' : 'text-green-600'}`}>৳{policy.basePremium}</span>
              </p>

              {/* Rating display */}
              {policy.rating !== undefined && (
                <p className={`flex items-center gap-2 font-semibold ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
                  <FaStar className="text-yellow-400" />
                  <span>{renderStars(policy.rating)}</span>
                  <span className={`ml-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>({policy.rating.toFixed(1)})</span>
                </p>
              )}
            </div>

            {/* Duration Options */}
            {policy.durationOptions?.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : 'text-primary'}`}>Duration Options</h2>
                <ul className={`list-disc pl-5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {policy.durationOptions.map((duration, index) => (
                    <li key={index}>{duration}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Eligibility */}
            {policy.eligibility?.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : 'text-primary'}`}>Eligibility</h2>
                <ul className={`list-disc pl-5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {policy.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {policy.benefits?.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : 'text-primary'}`}>Benefits</h2>
                <ul className={`list-disc pl-5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {policy.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Premium Logic */}
            {policy.premiumLogic && (
              <div className={`p-4 border-l-4 border-secondary rounded mb-6 ${dark ? 'bg-[#334155]' : 'bg-gray-100'}`}>
                <h2 className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : 'text-primary'}`}>Premium Logic</h2>
                <p className={`${dark ? 'text-gray-300' : 'text-gray-800'}`}>{policy.premiumLogic}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleGetQuote}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default PolicyDetailsPage;