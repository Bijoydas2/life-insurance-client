import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../../Context/ThemeContext"; 

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const policyId = location.state?.policyId;
  const { user } = UseAuth();

  const { theme } = useContext(ThemeContext); 
  const dark = theme === 'dark';

  const { data: policy, isLoading: policyLoading } = useQuery({
    queryKey: ["policy", policyId],
    enabled: !!policyId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies/${policyId}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      policyId,
      policyName: policy?.title || "",
      basePremium: policy?.basePremium,
    
      duration: data.duration || policy?.durationOptions?.[0], 
      email: user.email,
      name: user.displayName,
      status: "Pending",
      paymentStatus: "Due",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/applications", applicationData);
      toast.success("Application submitted successfully! We will contact you soon.");
      navigate("/dashboard/my-applications");
    } catch (error) {
      console.error("Application submission error:", error);
      toast.warn(error.response?.data?.message || "Failed to submit application.");
    }
  };

  if (policyLoading) {
    return (
      <div className={`text-center py-20 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Loading policy information...</p>
      </div>
    );
  }
  
  if (!policyId || !policy) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto">
        <p className="text-red-500 text-xl font-semibold">Error: Policy information missing.</p>
        <button onClick={() => navigate('/policies')} className="mt-4 text-primary hover:underline">
            Browse Policies
        </button>
      </div>
    );
  }

  const inputClasses = `w-full p-3 border rounded-lg transition-colors duration-300 focus:ring-2 ${
    dark
      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-primary-light focus:ring-primary-light/50'
      : 'bg-white border-gray-300 text-gray-800 focus:border-primary focus:ring-primary/50'
  }`;

  const labelClasses = `block font-semibold mb-1 ${dark ? 'text-gray-200' : 'text-gray-700'}`;
  
  const headingClasses = `text-xl font-semibold mt-4 mb-2 ${dark ? 'text-primary-light' : 'text-primary'}`;


  return (
    <div 
        className={`max-w-2xl mx-auto p-8 shadow-2xl my-12 rounded-xl transition-colors duration-300 ${
            dark ? 'bg-[#1e293b] shadow-gray-900/50' : 'bg-white shadow-lg'
        }`}
    >
      <h2 
        className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
            dark ? 'text-primary-light' : 'text-primary'
        }`}
      >
        Application for {policy?.title}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Policy Info  */}
        <div>
          <label className={labelClasses}>Policy Name</label>
          <input
            type="text"
            value={policy?.title || ""}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Full Name</label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className={labelClasses}>Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={labelClasses} htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            {...register("address", { required: "Address is required" })}
            className={inputClasses}
            placeholder="Enter your current residential address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* NID Number */}
        <div>
          <label className={labelClasses} htmlFor="nid">NID Number</label>
          <input
            type="text"
            id="nid"
            {...register("nid", { required: "NID is required", pattern: { value: /^\d+$/, message: "NID must be digits only" } })}
            className={inputClasses}
            placeholder="Enter your National ID number"
          />
          {errors.nid && <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>}
        </div>

        {/* Payment Frequency */}
        <div>
          <label className={labelClasses} htmlFor="paymentFrequency">Payment Frequency</label>
          <select
            id="paymentFrequency"
            {...register("paymentFrequency", { required: "Please select frequency" })}
            className={inputClasses}
          >
            <option value="" className="text-gray-500">Select Option</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {errors.paymentFrequency && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentFrequency.message}</p>
          )}
        </div>

        {/* Nominee Info */}
        <hr className={`my-4 ${dark ? 'border-gray-600' : 'border-gray-200'}`} />
        <h3 className={headingClasses}>Nominee Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <label className={labelClasses} htmlFor="nomineeName">Nominee Name</label>
                <input
                    type="text"
                    id="nomineeName"
                    {...register("nomineeName", { required: "Nominee name is required" })}
                    className={inputClasses}
                    placeholder="Full name of your nominee"
                />
                {errors.nomineeName && <p className="text-red-500 text-sm mt-1">{errors.nomineeName.message}</p>}
            </div>

            <div>
                <label className={labelClasses} htmlFor="relationship">Relationship</label>
                <input
                    type="text"
                    id="relationship"
                    {...register("relationship", { required: "Relationship is required" })}
                    className={inputClasses}
                    placeholder="e.g., Spouse, Child, Parent"
                />
                {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>}
            </div>
        </div>
        

        {/* Health Disclosure */}
        <hr className={`my-4 ${dark ? 'border-gray-600' : 'border-gray-200'}`} />
        <h3 className={headingClasses}>Health Disclosure</h3>

        <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} mb-2 text-sm italic`}>
            Please check any pre-existing health issues that apply to you.
        </p>

        <div className="flex flex-col gap-3">
          {["Heart Disease", "Diabetes", "High Blood Pressure"].map(issue => (
              <label key={issue} className={`flex items-center cursor-pointer ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                <input 
                    type="checkbox" 
                    {...register("healthIssues")} 
                    value={issue} 
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-3 font-medium">{issue}</span>
              </label>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition duration-300 font-semibold mt-6"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;