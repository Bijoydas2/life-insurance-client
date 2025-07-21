import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { toast } from "react-toastify";


const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  // Load applications
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // Load agents
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  // Handle agent assignment
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

  // Handle rejection
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

  // ✅ Filter out rejected apps
  const filteredApplications = applications.filter((app) => {
    const status = app.status?.trim().toLowerCase();
    return status === "pending" || status === "approved";
  });

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-3xl font-bold text-primary mb-6">Manage Applications</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="py-3 px-4 text-left">Applicant</th>
            <th className="py-3 px-4 text-left">Policy</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Agent</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => {
            const status = app.status?.trim().toLowerCase();

            return (
              <tr key={app._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">
                  <p className="font-semibold">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.email}</p>
                </td>
                <td className="py-3 px-4 text-gray-800">{app.policyName || app.policyId}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(app.appliedAt || app.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {status === "approved" ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <select
                    defaultValue={app.assignedAgent || ""}
                    onChange={(e) => handleAssign(app._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
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
                <td className="py-3 px-4 flex items-center gap-2">
                  <Link
                    to={`/policy/${app.policyId}`}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleReject(app._id)}
                    disabled={status !== "pending"}
                    className={`px-3 py-1 rounded text-sm ${
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
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplications;
