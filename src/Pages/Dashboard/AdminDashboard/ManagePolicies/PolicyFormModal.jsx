import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PolicyFormModal = ({ policy, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // react-hook-form setup with default values from policy
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: policy || {
      title: "",
      category: "",
      minAge: "",
      maxAge: "",
      basePremium: "",
      description: "",
      coverageRange: { min: "", max: "" },
      durationOptions: [],
      eligibility: [],
      benefits: [],
      premiumLogic: "",
      image: "",
    },
  });

  // useFieldArray for arrays (durationOptions, eligibility, benefits)
  const {
    fields: durationFields,
    append: appendDuration,
    remove: removeDuration,
  } = useFieldArray({
    control,
    name: "durationOptions",
  });

  const {
    fields: eligibilityFields,
    append: appendEligibility,
    remove: removeEligibility,
  } = useFieldArray({
    control,
    name: "eligibility",
  });

  const {
    fields: benefitsFields,
    append: appendBenefits,
    remove: removeBenefits,
  } = useFieldArray({
    control,
    name: "benefits",
  });

 const onSubmit = async (data) => {
 const payload = {
  ...data,
  coverageRange: {
    min: data["coverageRange.min"],
    max: data["coverageRange.max"],
  },
  basePremium: Number(data.basePremium),
  minAge: Number(data.minAge),
  maxAge: Number(data.maxAge),
};
  delete payload["coverageRange.min"];
  delete payload["coverageRange.max"];

  try {
    const isEdit = !!policy;
    const res = isEdit
      ? await axiosSecure.put(`/policies/${policy._id}`, payload)
      : await axiosSecure.post("/policies", payload);

    if (res.data.insertedId || res.data.modifiedCount > 0) {
      toast.success(`Policy ${isEdit ? "updated" : "added"}`);
      queryClient.invalidateQueries(["policies"]);
      closeModal();
    }
  } catch (err) {
    toast.error("Failed to save policy");
  }
};

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full overflow-y-auto max-h-[90vh]">
        <h3 className="text-4xl text-center text-primary font-semibold mb-4">
          {policy ? "Edit Policy" : "Add New Policy"}
        </h3>

       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-700">

  {/* Policy Title */}
  <div>
    <label className="text-sm font-medium block mb-1">Policy Title</label>
    <input
      {...register("title", { required: "Title is required" })}
      className="input input-bordered w-full bg-white placeholder-gray-400"
      placeholder="Enter Policy Title"
    />
    {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
  </div>

  {/* Category */}
  <div>
    <label className="text-sm font-medium block mb-1">Category</label>
    <input
      {...register("category", { required: "Category is required" })}
      className="input input-bordered w-full bg-white placeholder-gray-400"
      placeholder="e.g. Term Life"
    />
    {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
  </div>

  {/* Age Range */}
  <div className="flex gap-4">
    <div className="w-1/2">
      <label className="text-sm font-medium block mb-1">Minimum Age</label>
      <input
        type="number"
        {...register("minAge", { required: "Minimum age is required", valueAsNumber: true })}
        className="input input-bordered w-full bg-white"
        placeholder="Min Age"
      />
    </div>
    <div className="w-1/2">
      <label className="text-sm font-medium block mb-1">Maximum Age</label>
      <input
        type="number"
        {...register("maxAge", { required: "Maximum age is required", valueAsNumber: true })}
        className="input input-bordered w-full bg-white"
        placeholder="Max Age"
      />
    </div>
  </div>

  {/* Coverage Range */}
  <div className="flex gap-4">
    <div className="w-1/2">
      <label className="text-sm font-medium block mb-1">Coverage Min</label>
      <input
        type="number"
        {...register("coverageRange.min", { required: "Min coverage required", valueAsNumber: true })}
        className="input input-bordered w-full bg-white"
        placeholder="Min Coverage"
      />
    </div>
    <div className="w-1/2">
      <label className="text-sm font-medium block mb-1">Coverage Max</label>
      <input
        type="number"
        {...register("coverageRange.max", { required: "Max coverage required", valueAsNumber: true })}
        className="input input-bordered w-full bg-white"
        placeholder="Max Coverage"
      />
    </div>
  </div>

  {/* Base Premium */}
  <div>
    <label className="text-sm font-medium block mb-1">Base Premium Rate</label>
    <input
      type="number"
      {...register("basePremium", { required: "Base premium required", valueAsNumber: true })}
      className="input input-bordered w-full bg-white"
      placeholder="e.g. 330"
    />
  </div>

  {/* Image URL */}
  <div>
    <label className="text-sm font-medium block mb-1">Policy Image URL</label>
    <input
      {...register("image", { required: "Image URL is required" })}
      className="input input-bordered w-full bg-white"
      placeholder="Image URL"
    />
  </div>

  {/* Description */}
  <div>
    <label className="text-sm font-medium block mb-1">Description</label>
    <textarea
      {...register("description")}
      className="textarea textarea-bordered w-full bg-white"
      placeholder="Brief policy description"
    ></textarea>
  </div>

  {/* Duration Options */}
  <div>
    <label className="text-sm font-medium block mb-1">Duration Options</label>
    {durationFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2 items-center">
        <input
          {...register(`durationOptions.${index}`, { required: true })}
          className="input input-bordered w-full bg-white"
          placeholder="e.g. 10 Years"
        />
        <button type="button" onClick={() => removeDuration(index)} className="btn btn-sm btn-error">X</button>
      </div>
    ))}
    <button type="button" onClick={() => appendDuration("")} className="btn btn-sm btn-outline">
      Add Duration
    </button>
  </div>

  {/* Eligibility */}
  <div>
    <label className="text-sm font-medium block mb-1">Eligibility Criteria</label>
    {eligibilityFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2 items-center">
        <input
          {...register(`eligibility.${index}`, { required: true })}
          className="input input-bordered w-full bg-white"
          placeholder="e.g. Physically active"
        />
        <button type="button" onClick={() => removeEligibility(index)} className="btn btn-sm btn-error">X</button>
      </div>
    ))}
    <button type="button" onClick={() => appendEligibility("")} className="btn btn-sm btn-outline">
      Add Eligibility
    </button>
  </div>

  {/* Benefits */}
  <div>
    <label className="text-sm font-medium block mb-1">Benefits</label>
    {benefitsFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2 items-center">
        <input
          {...register(`benefits.${index}`, { required: true })}
          className="input input-bordered w-full bg-white"
          placeholder="e.g. Waiver of premiums"
        />
        <button type="button" onClick={() => removeBenefits(index)} className="btn btn-sm btn-error">X</button>
      </div>
    ))}
    <button type="button" onClick={() => appendBenefits("")} className="btn btn-sm btn-outline">
      Add Benefit
    </button>
  </div>

  {/* Premium Logic */}
  <div>
    <label className="text-sm font-medium block mb-1">Premium Calculation Logic</label>
    <textarea
      {...register("premiumLogic")}
      className="textarea textarea-bordered w-full bg-white"
      placeholder="Premium = Base + (Risk Score × Age × Term / 100)"
    ></textarea>
  </div>

  {/* Buttons */}
  <div className="flex justify-end gap-2 pt-4">
    <button type="button" className="btn btn-outline border-secondary hover:bg-secondary " onClick={closeModal}>
      Cancel
    </button>
    <button type="submit" className="btn btn-primary">
      {policy ? "Update" : "Add Policy"}
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default PolicyFormModal;
