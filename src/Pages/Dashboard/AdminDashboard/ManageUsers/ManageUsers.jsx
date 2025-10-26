import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handlePromote = async (email) => {
    try {
      const res = await axiosSecure.put(`/users/${email}`, { role: "agent" });
      if (res.data.modifiedCount > 0) {
        toast.success("User promoted to Agent");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (error) {
      toast.error("Failed to promote user");
    }
  };

  const handleDemote = async (email) => {
    try {
      const res = await axiosSecure.put(`/users/${email}`, { role: "customer" });
      if (res.data.modifiedCount > 0) {
        toast.success("User demoted to Customer");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (error) {
      toast.error("Failed to demote user");
    }
  };

  const handleDelete = async (email, role) => {
    if (role === "admin") {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You cannot delete an admin user.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${email}`);
        if (res.data.deletedCount > 0) {
          toast.success("User deleted");
          queryClient.invalidateQueries(["users"]);
        }
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="p-4">
      <title>Manage Users</title>
      <h2 className="text-3xl font-bold mb-6 text-primary">Manage Users</h2>

      {isLoading && <div>Loading users...</div>}
      {isError && <div>Error loading users</div>}

      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm sm:text-base">
            <thead>
              <tr className="bg-primary text-white whitespace-nowrap">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Registered</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const role = user.role || "customer";
                const registeredDate = new Date(user.created_at).toLocaleDateString();
                const isCurrentUser = false;

                return (
                  <tr key={user._id} className="border-t hover:bg-gray-50 whitespace-nowrap">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={user.photoURL || "https://i.pravatar.cc/40?u=" + user.email}
                        alt={`${user.name}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                        loading="lazy"
                      />
                      <span className="font-semibold text-primary">{user.name || "N/A"}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                    <td className="py-3 px-4">
                      {role === "admin" && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">Admin</span>
                      )}
                      {role === "agent" && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Agent</span>
                      )}
                      {role === "customer" && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">Customer</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{registeredDate}</td>
                    <td className="py-3 px-4 space-y-1 md:space-x-2 flex flex-col md:flex-row">
                      {role === "customer" && (
                        <button
                          onClick={() => handlePromote(user.email)}
                          disabled={isCurrentUser}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                          title="Promote to Agent"
                        >
                          Promote to Agent
                        </button>
                      )}

                      {role === "agent" && (
                        <button
                          onClick={() => handleDemote(user.email)}
                          disabled={isCurrentUser}
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
                          title="Demote to Customer"
                        >
                          Demote to Customer
                        </button>
                      )}

                      {role !== "admin" && !isCurrentUser && (
                        <button
                          onClick={() => handleDelete(user.email, role)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                          title="Delete User"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
