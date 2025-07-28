import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const PolicyClearancePage = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=UseAuth();
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  

  const { data: claims = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["claims"],
    queryFn: async () => {
      const res = await axiosSecure.get("/claims/all");
      return res.data.filter((claim) => claim.status.toLowerCase() === "pending");
    },
  });

  // Approve claim handler
  const handleApprove = async (claimId) => {
    try {
      const res = await axiosSecure.patch(`/claims/${claimId}`, {
        newStatus: "approved",
        agentEmail:user.email,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Claim approved successfully", "success");

        refetch();
        setModalOpen(false);
      } else {
        Swal.fire("Error", "Failed to approve claim", "error");
      }
    } catch (error) {
      console.error("Error approving claim:", error);
      Swal.fire("Error", "Failed to approve claim", "error");
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading claims...</p>;
  if (isError) return <p className="text-center py-6 text-red-600">Error loading claims. Please try again later.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <title>Policy Clearance</title>
      <h1 className="text-3xl font-bold mb-6 text-primary text-center sm:text-left">Policy Clearance</h1>

      {claims.length === 0 ? (
        <p className="text-center text-gray-600">No pending claims found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-300 rounded-md shadow-sm">
          <table className="table-auto w-full min-w-[640px]">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="px-3 py-2 text-left text-sm sm:text-base">Policy Name</th>
                <th className="px-3 py-2 text-left text-sm sm:text-base">User Email</th>
                <th className="px-3 py-2 text-right text-sm sm:text-base">Amount</th>
                <th className="px-3 py-2 text-left text-sm sm:text-base">Reason</th>
                <th className="px-3 py-2 text-left text-sm sm:text-base">Claim Date</th>
                <th className="px-3 py-2 text-center text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="text-gray-700 bg-white hover:bg-gray-50 transition">
                  <td className="text-primary px-3 py-2 max-w-xs truncate">{claim.policyName}</td>
                  <td className="px-3 py-2 max-w-xs truncate">{claim.userEmail}</td>
                  <td className="px-3 py-2 text-right">${claim.amount}</td>
                  <td className="px-3 py-2 max-w-xs truncate">{claim.reason}</td>
                  <td className="px-3 py-2">{new Date(claim.claimDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedClaim(claim);
                        setModalOpen(true);
                      }}
                      className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-700 text-3xl font-bold hover:text-gray-900 transition"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Claim Details</h2>

            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p><strong>Policy Name:</strong> {selectedClaim.policyName}</p>
              <p><strong>User Email:</strong> {selectedClaim.userEmail}</p>
              <p><strong>Amount:</strong> ${selectedClaim.amount}</p>
              <p><strong>Reason:</strong> {selectedClaim.reason}</p>
              <p><strong>Claim Date:</strong> {new Date(selectedClaim.claimDate).toLocaleString()}</p>
              <p>
                <strong>Document:</strong>{" "}
                <a
                  href={selectedClaim.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  View Document
                </a>
              </p>
            </div>

            <div className="flex justify-end gap-4 mt-6 flex-wrap">
              <button
                onClick={() => handleApprove(selectedClaim._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full sm:w-auto"
              >
                Approve
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyClearancePage;
