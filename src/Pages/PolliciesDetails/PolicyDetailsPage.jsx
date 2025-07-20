import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from '../../Components/Loading'
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

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading policy details.
      </p>
    );

  if (!policy) return <p className="text-center mt-10">No policy found.</p>;

  const handleGetQuote = () => {
    navigate("/quote", { state: { policyId: policy._id } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 my-12 bg-white rounded-lg shadow-lg">
      <div className="md:flex md:gap-10">
        {/* Left: Image */}
        <div className="md:flex-1">
          <img
            src={policy.image}
            alt={policy.title}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
            style={{ minHeight: "400px" }}
          />
        </div>

        {/* Right: Details */}
        <div className="md:flex-1 flex flex-col justify-start relative">
          <div className="text-gray-800">
            <h1
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              {policy.title}
            </h1>

            <p className="mb-6 text-gray-700">{policy.description}</p>

            <div className="grid grid-cols-1 gap-3 mb-6">
              <p className="flex items-center gap-2 text-gray-900 font-semibold">
                <FaTags className="text-[var(--color-secondary)]" />
                Coverage: ৳{policy.coverageAmount?.toLocaleString()}
              </p>
              <p className="flex items-center gap-2 text-gray-900 font-semibold">
                <FaClock className="text-[var(--color-secondary)]" />
                Base Premium: ৳{policy.price}
              </p>
              <p className="flex items-center gap-2 text-gray-900 font-semibold">
                <FaStar className="text-[var(--color-secondary)]" />
                Rating: {policy.rating} / 5
              </p>
              <p className="flex items-center gap-2 text-gray-900 font-semibold">
                <FaUsers className="text-[var(--color-secondary)]" />
                Purchased: {policy.purchaseCount} times
              </p>
              <p className="flex items-center gap-2 text-gray-900 font-semibold">
                <FaUserAlt className="text-[var(--color-secondary)]" />
                Age Limit: {policy.minAge} - {policy.maxAge} years
              </p>
            </div>

            {policy.eligibility && (
              <div className="mb-6">
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  Eligibility
                </h2>
                {Array.isArray(policy.eligibility) ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {policy.eligibility.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{policy.eligibility}</p>
                )}
              </div>
            )}

            {policy.benefits && (
              <div className="mb-6">
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  Benefits
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {policy.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {policy.premiumLogic && (
              <div className="p-4 border-l-4 border-[var(--color-secondary)] bg-gray-100 rounded">
                <h2
                  className="text-xl font-semibold text-gray-700 mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  Premium Calculation Logic
                </h2>
                <p className="text-gray-800">{policy.premiumLogic}</p>
              </div>
            )}
          </div>

          
        </div>
      </div>
      {/* Centered Quote Button */}
          <div
            className="mt-auto flex justify-center items-center"
            style={{ minHeight: "100px" }}
          >
            <button
              onClick={handleGetQuote}
              className="px-8 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Get Quote
            </button>
          </div>
    </div>
  );
};

export default PolicyDetailsPage;
