import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

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
      duration: policy?.durationOptions,
      email: user.email,
      name: user.displayName,
      status: "Pending",
      paymentStatus: "Due", 
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/applications", applicationData);
      toast.success("Application submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.warn("Failed to submit application.");
    }
  };

  if (policyLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Loading policy information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow my-12 rounded">
     <title>Application Form</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Application Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-gray-700">

        {/* Policy Info */}
        <div>
          <label className="block font-semibold mb-1">Policy Name</label>
          <input
            type="text"
            value={policy?.title || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>

        <div>
          <label>NID Number</label>
          <input
            type="text"
            {...register("nid", { required: "NID is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.nid && <p className="text-red-500">{errors.nid.message}</p>}
        </div>

        {/* ✅ Payment Frequency */}
        <div>
          <label>Payment Frequency</label>
          <select
            {...register("paymentFrequency", { required: "Please select frequency" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Option</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {errors.paymentFrequency && (
            <p className="text-red-500">{errors.paymentFrequency.message}</p>
          )}
        </div>

        {/* Nominee Info */}
        <hr />
        <h3 className="text-xl font-semibold text-[var(--color-secondary)]">Nominee Information</h3>

        <div>
          <label>Nominee Name</label>
          <input
            type="text"
            {...register("nomineeName", { required: "Nominee name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.nomineeName && <p className="text-red-500">{errors.nomineeName.message}</p>}
        </div>

        <div>
          <label>Relationship</label>
          <input
            type="text"
            {...register("relationship", { required: "Relationship is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.relationship && <p className="text-red-500">{errors.relationship.message}</p>}
        </div>

        {/* Health Disclosure */}
        <hr />
        <h3 className="text-xl font-semibold text-[var(--color-secondary)]">Health Disclosure</h3>

        <div className="flex flex-col gap-2">
          <label>
            <input type="checkbox" {...register("healthIssues")} value="Heart Disease" />
            <span className="ml-2">Heart Disease</span>
          </label>
          <label>
            <input type="checkbox" {...register("healthIssues")} value="Diabetes" />
            <span className="ml-2">Diabetes</span>
          </label>
          <label>
            <input type="checkbox" {...register("healthIssues")} value="High Blood Pressure" />
            <span className="ml-2">High Blood Pressure</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded hover:bg-opacity-90 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
