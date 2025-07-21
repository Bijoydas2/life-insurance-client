import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PolicyTable from "./PolicyTable";
import PolicyFormModal from "./PolicyFormModal";

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
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-primary">Manage Policies</h2>
      <button onClick={handleAdd} className="btn btn-primary mb-4 text-right">
        Add New Policy
      </button>

      <PolicyTable
        policies={policies}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

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
