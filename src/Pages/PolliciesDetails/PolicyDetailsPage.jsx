import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from '../../Components/Loading';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTags, FaClock, FaStar, FaUsers, FaUserAlt } from "react-icons/fa";

const PolicyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

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
    const fullStars = Math.floor(rating);
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block text-xl ${
            i <= fullStars ? "text-yellow-400" : "text-gray-300"
          }`}
          aria-label={`${i} star`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 my-12 bg-white rounded-lg shadow-md">
      <title>Policy Details</title>
      <div className="md:flex md:gap-10">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={policy.image}
            alt={policy.title}
            className="w-full h-[400px] object-cover rounded-lg shadow"
          />
           <h1 className="text-4xl font-bold  text-primary mt-6">{policy.title}</h1>
            <p className="text-gray-700 mt-4">{policy.description}</p>
        </div>

        {/* Textual Info */}
        <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col justify-between" style={{ minHeight: "400px" }}>
          <div>
           

            <div className="grid grid-cols-1 gap-3 text-sm mb-6 text-gray-800">
              <p className="flex items-center gap-2 font-semibold">
                <FaTags className="text-secondary" />
                Category: {policy.category}
              </p>

              <p className="flex items-center gap-2 font-semibold">
                <FaUserAlt className="text-secondary" />
                Age Eligibility: {policy.minAge} - {policy.maxAge} years
              </p>

              <p className="flex items-center gap-2 font-semibold">
                <FaTags className="text-secondary" />
                Coverage: ৳{policy.coverageRange.min.toLocaleString()} - ৳{policy.coverageRange.max.toLocaleString()}
              </p>

              <p className="flex items-center gap-2 font-semibold">
                <FaClock className="text-secondary" />
                Base Premium: ৳{policy.basePremium}
              </p>

              {/* Rating display */}
              {policy.rating !== undefined && (
                <p className="flex items-center gap-2 font-semibold">
                  <FaStar className="text-yellow-400" />
                  <span>{renderStars(policy.rating)}</span>
                  <span className="ml-2 text-gray-600">({policy.rating.toFixed(1)})</span>
                </p>
              )}
            </div>

            {/* Duration Options */}
            {policy.durationOptions?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-primary mb-2">Duration Options</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {policy.durationOptions.map((duration, index) => (
                    <li key={index}>{duration}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Eligibility */}
            {policy.eligibility?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-primary mb-2">Eligibility</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {policy.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {policy.benefits?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-primary mb-2">Benefits</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {policy.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Premium Logic */}
            {policy.premiumLogic && (
              <div className="p-4 bg-gray-100 border-l-4 border-secondary rounded mb-6">
                <h2 className="text-lg font-semibold mb-2 text-primary">Premium Logic</h2>
                <p className="text-gray-800">{policy.premiumLogic}</p>
              </div>
            )}
          </div>
          {/* Button */}
          
        </div>
      </div>
      <div className="flex justify-center mt-6">
            <button
              onClick={handleGetQuote}
              className="btn btn-primary px-6 py-3 text-white font-semibold rounded-lg"
            >
              Get Quote
            </button>
          </div>
    </div>
  );
};

export default PolicyDetailsPage;
