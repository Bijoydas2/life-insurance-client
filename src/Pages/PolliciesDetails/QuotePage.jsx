import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router"; 
import { useForm } from "react-hook-form";
import { ThemeContext } from "../../Context/ThemeContext";

const QuotePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const policyId = location.state?.policyId;

  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

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
      className={`max-w-lg mx-auto p-8 rounded-xl shadow-2xl my-12 transition-colors duration-300 ${
        dark ? "bg-[#1e293b] shadow-gray-900/50" : "bg-white shadow-lg"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
          dark ? "text-primary-light" : "text-primary"
        }`}
      >
        Get Your Quote
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Age */}
        <div>
          <label
            className={`block mb-2 font-semibold ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
            htmlFor="age"
          >
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
            className={`w-full border rounded-lg p-3 transition-colors duration-300 ${
              dark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-primary-light"
                : "bg-white border-gray-300 text-gray-800 focus:border-primary"
            }`}
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Gender & Other Select fields */}
        {[
          { name: "gender", label: "Gender", options: [
            { value: "male", label: "Male" }, 
            { value: "female", label: "Female" }, 
            { value: "other", label: "Other" }
          ]},
          { name: "duration", label: "Duration (years)", options: [
            { value: "10", label: "10 Years" }, 
            { value: "15", label: "15 Years" }, 
            { value: "20", label: "20 Years" }, 
            { value: "25", label: "25 Years" }
          ]},
          { name: "smoker", label: "Smoker", options: [
            { value: "yes", label: "Smoker" }, 
            { value: "no", label: "Non-Smoker" }
          ]}
        ].map(({ name, label, options }) => (
          <div key={name}>
            <label
              className={`block mb-2 font-semibold ${
                dark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {label}
            </label>
            <select
              {...register(name, { required: `${label} is required` })}
              className={`w-full border rounded-lg p-3 appearance-none transition-colors duration-300 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white focus:border-primary-light"
                  : "bg-white border-gray-300 text-gray-800 focus:border-primary"
              }`}
            >
              <option value="">Select {label}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
            )}
          </div>
        ))}

        {/* Coverage Amount */}
        <div>
          <label
            className={`block mb-2 font-semibold ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
            htmlFor="coverageAmount"
          >
            Coverage Amount (৳)
          </label>
          <input
            type="number"
            id="coverageAmount"
            {...register("coverageAmount", {
              required: "Coverage amount is required",
              min: { value: 100000, message: "Minimum coverage is 100,000" },
            })}
            className={`w-full border rounded-lg p-3 transition-colors duration-300 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-primary-light"
                  : "bg-white border-gray-300 text-gray-800 focus:border-primary"
              }`}
            placeholder="E.g., 2000000"
          />
          {errors.coverageAmount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverageAmount.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark transition duration-300"
        >
          Calculate Premium
        </button>
      </form>

      {/* Display Premium */}
      {premium && (
        <div
          className={`mt-8 border-2 rounded-xl p-6 text-center shadow-inner transition-colors duration-300 ${
            dark
              ? "bg-gray-700 border-primary-light text-gray-200"
              : "bg-green-50 border-green-400 text-gray-800"
          }`}
        >
          <p
            className={`text-xl font-bold mb-3 ${
              dark ? "text-primary-light" : "text-primary"
            }`}
          >
            Estimated Premium
          </p>
          <p className="text-lg mb-1">
            Monthly: <strong className="text-2xl text-green-600 dark:text-yellow-400">৳{premium.monthly}</strong>
          </p>
          <p className="text-lg">
            Annual: <strong className="text-2xl text-green-600 dark:text-yellow-400">৳{premium.annual}</strong>
          </p>

          {/* Apply Button */}
          <button
            onClick={() =>
              navigate("/application", {
                state: { ...premium.formData, policyId },
              })
            }
            className="mt-5 px-8 py-3 rounded-lg font-semibold text-white bg-secondary hover:bg-secondary-dark transition duration-300 shadow-md"
          >
            Apply for Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default QuotePage;