import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PolicyClearancePage = () => {
  const axiosSecure = useAxiosSecure();
 

  const [selectedClaim, setSelectedClaim] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // React Query: fetch claims from /claims/all and filter pending
const { data: claims = [], isLoading, isError,refetch} = useQuery({
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

  if (isLoading) return <p>Loading claims...</p>;
  if (isError) return <p>Error loading claims. Please try again later.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Policy Clearance</h1>

      {claims.length === 0 ? (
        <p>No pending claims found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-secondary">
                <th className=" px-4 py-2">Policy Name</th>
                <th className=" px-4 py-2">User Email</th>
                <th className=" px-4 py-2">Amount</th>
                <th className=" px-4 py-2">Reason</th>
                <th className=" px-4 py-2">Claim Date</th>
                <th className=" px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="text-gray-700  bg-white ">
                  <td className="text-primary px-4 py-2">{claim.policyName}</td>
                  <td className=" px-4 py-2">{claim.userEmail}</td>
                  <td className=" px-4 py-2">${claim.amount}</td>
                  <td className="px-4 py-2">{claim.reason}</td>
                  <td className=" px-4 py-2">
                    {new Date(claim.claimDate).toLocaleDateString()}
                  </td>
                  <td className=" px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedClaim(claim);
                        setModalOpen(true);
                      }}
                      className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-700 text-2xl font-bold hover:text-gray-900"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Claim Details
            </h2>

            <p className="text-gray-700">
              <strong >Policy Name:</strong> {selectedClaim.policyName}
            </p>
            <p className="text-gray-700">
              <strong >User Email:</strong> {selectedClaim.userEmail}
            </p>
            <p className="text-gray-700">
              <strong >Amount:</strong> ${selectedClaim.amount}
            </p>
            <p className="text-gray-700">
              <strong >Reason:</strong> {selectedClaim.reason}
            </p>
            <p className="text-gray-700">
              <strong >Claim Date:</strong>{" "}
              {new Date(selectedClaim.claimDate).toLocaleString()}
            </p>
            <p className="my-4 text-gray-700">
              <strong>Document:</strong>{" "}
              <a
                href={selectedClaim.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Document
              </a>
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleApprove(selectedClaim._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 transition"
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
