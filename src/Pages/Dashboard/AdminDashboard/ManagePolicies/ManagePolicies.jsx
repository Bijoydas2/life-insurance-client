import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PolicyTable from "./PolicyTable";
import PolicyFormModal from "./PolicyFormModal";
import { FaPlus } from "react-icons/fa";

const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["admin-policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/policies");
      return res.data;
    },
  });

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPolicy(null);
    setModalOpen(true);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <title>Manage Policies</title>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary text-center md:text-left">
        Manage Policies
      </h2>

      <div className="flex justify-center md:justify-end mb-4">
        <button
          onClick={handleAdd}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus /> <span className="hidden sm:inline">Add New Policy</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <PolicyTable
          policies={policies}
          isLoading={isLoading}
          onEdit={handleEdit}
        />
      </div>

      {modalOpen && (
        <PolicyFormModal
          policy={editingPolicy}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ManagePolicies;
