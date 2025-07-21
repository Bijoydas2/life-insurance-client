import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


const PolicyRow = ({ policy,index, onEdit }) => {
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
    <tr className="text-gray-700">
      <td>{index + 1}</td>
      <td className="text-primary">{policy.title}</td>
      <td>{policy.category}</td>
      <td>{policy.minAge}</td>
      <td>{policy.maxAge}</td>
      <td>{policy.basePremium}</td>
      <td className="space-x-2">
        <button onClick={() => onEdit(policy)} className="btn btn-sm btn-warning">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-error">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PolicyRow;
