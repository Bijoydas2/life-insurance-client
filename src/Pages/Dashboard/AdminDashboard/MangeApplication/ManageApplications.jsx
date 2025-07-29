import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router"; // ✅ Corrected import
import { toast } from "react-toastify";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  const handleAssign = async (id, agentEmail) => {
    try {
      const res = await axiosSecure.patch(`/applications/assign/${id}`, {
        agent: agentEmail,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Agent assigned and application approved!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to assign agent");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/applications/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.warn("Application rejected");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to reject application");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const status = app.status?.trim().toLowerCase();
    return status === "pending" || status === "approved";
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        Manage Applications
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg text-sm md:text-base">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="py-3 px-4 text-left">Applicant</th>
              <th className="py-3 px-4 text-left">Policy</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Agent</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => {
              const status = app.status?.trim().toLowerCase();
              return (
                <tr
                  key={app._id}
                  className="border-t hover:bg-gray-50 whitespace-nowrap"
                >
                  <td className="py-3 px-4 text-gray-800">
                    <p className="font-semibold">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {app.policyName || app.policyId}
                  </td>
                  <td className="py-3 px-4 text-gray-600 hidden sm:table-cell">
                    {new Date(
                      app.appliedAt || app.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status === "approved" ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <select
                      defaultValue={app.assignedAgent || ""}
                      onChange={(e) => handleAssign(app._id, e.target.value)}
                      className="border rounded px-2 py-1 text-gray-700 text-sm"
                      disabled={status !== "pending"}
                    >
                      <option value="">Select Agent</option>
                      {agents.map((agent) => (
                        <option key={agent._id} value={agent.email}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 flex flex-col sm:flex-row gap-2">
                    <Link
                      to={`/policy/${app.policyId}`}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-xs text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleReject(app._id)}
                      disabled={status !== "pending"}
                      className={`px-3 py-1 rounded text-xs ${
                        status === "pending"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No applications to manage.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplications;
