import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PolicyRow = ({ policy, index, onEdit }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
      const res = await axiosSecure.delete(`/policies/${policy._id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Policy deleted");
        queryClient.invalidateQueries(["policies"]);
      }
    } catch {
      toast.error("Failed to delete policy");
    }
  };

  return (
    <tr className="text-gray-700 text-xs sm:text-sm md:text-base">
      <td className="whitespace-nowrap px-1 sm:px-2 py-1">{index + 1}</td>
      <td className="text-primary whitespace-nowrap px-1 sm:px-2 py-1">{policy.title}</td>
      <td className="whitespace-nowrap px-1 sm:px-2 py-1">{policy.category}</td>
      <td className="whitespace-nowrap px-1 sm:px-2 py-1">{policy.minAge}</td>
      <td className="whitespace-nowrap px-1 sm:px-2 py-1">{policy.maxAge}</td>
      <td className="whitespace-nowrap px-1 sm:px-2 py-1">{policy.basePremium}</td>
      <td className="whitespace-nowrap space-x-1 sm:space-x-2 px-1 sm:px-2 py-1 flex flex-wrap items-center gap-1">
        <button onClick={() => onEdit(policy)} className="btn btn-xs sm:btn-sm btn-warning">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-xs sm:btn-sm btn-error">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PolicyRow;
