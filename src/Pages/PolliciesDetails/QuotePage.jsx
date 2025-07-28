import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";

const QuotePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const policyId = location.state?.policyId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();

  const [premium, setPremium] = useState(null);

  const calculatePremium = (data) => {
    const baseRate = 500;
    const ageFactor = data.age / 100;
    const coverageFactor = data.coverageAmount / 1000000;
    const durationFactor = parseInt(data.duration);
    const smokerFactor = data.smoker === "yes" ? 1.5 : 1;

    const annualPremium =
      baseRate * ageFactor * coverageFactor * durationFactor * smokerFactor;

    return annualPremium;
  };

  const onSubmit = (data) => {
    const annual = calculatePremium(data);
    const monthly = annual / 12;

    setPremium({
      annual: annual.toFixed(2),
      monthly: monthly.toFixed(2),
      formData: data,
    });
  };

  return (
    <div
      className="max-w-lg mx-auto p-6 bg-white rounded shadow my-12"
      style={{ color: "var(--color-primary)" }}
    >
        <title>Get Quote</title>
      <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "var(--color-primary)" }}>
        Get Your Quote
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Age */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register("age", {
              required: "Age is required",
              min: { value: 18, message: "Minimum age is 18" },
              max: { value: 100, message: "Maximum age is 100" },
            })}
            className="w-full border rounded p-2 text-gray-700"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full border rounded p-2 text-gray-700"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Coverage Amount */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="coverageAmount">
            Coverage Amount (৳)
          </label>
          <input
            type="number"
            id="coverageAmount"
            {...register("coverageAmount", {
              required: "Coverage amount is required",
              min: { value: 100000, message: "Minimum coverage is 100,000" },
            })}
            className="w-full border rounded p-2 text-gray-700"
            placeholder="E.g., 2000000"
          />
          {errors.coverageAmount && (
            <p className="text-red-600 text-sm mt-1">{errors.coverageAmount.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Duration (years)</label>
          <select
            {...register("duration", { required: "Duration is required" })}
            className="w-full border rounded p-2 text-gray-700"
          >
            <option value="">Select Duration</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="25">25 Years</option>
          </select>
          {errors.duration && (
            <p className="text-red-600 text-sm mt-1">{errors.duration.message}</p>
          )}
        </div>

        {/* Smoker */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Smoker</label>
          <select
            {...register("smoker", { required: "Please select an option" })}
            className="w-full border rounded p-2 text-gray-700"
          >
            <option value="">Select Option</option>
            <option value="yes">Smoker</option>
            <option value="no">Non-Smoker</option>
          </select>
          {errors.smoker && (
            <p className="text-red-600 text-sm mt-1">{errors.smoker.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded font-semibold transition"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
          }}
        >
          Calculate Premium
        </button>
      </form>

      {/* Display Premium */}
      {premium && (
        <div
          className="mt-6 border rounded p-4 text-center"
          style={{ borderColor: "var(--color-secondary)", backgroundColor: "#FFF9F2" }}
        >
          <p className="text-lg font-semibold mb-2" style={{ color: "var(--color-primary)" }}>
            Estimated Premium
          </p>
          <p>
            Monthly: <strong>৳{premium.monthly}</strong>
          </p>
          <p>
            Annual: <strong>৳{premium.annual}</strong>
          </p>

          {/* Apply Button */}
          <button
            onClick={() =>
              navigate("/application", {
                state: { ...premium.formData, policyId },
              })
            }
            className="mt-4 px-6 py-2 rounded font-semibold transition"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "white",
            }}
          >
            Apply for Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default QuotePage;
