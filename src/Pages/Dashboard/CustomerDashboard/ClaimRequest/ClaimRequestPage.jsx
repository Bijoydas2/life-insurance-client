import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UseAuth from "../../../../hooks/UseAuth";
import UseAxios from "../../../../hooks/UseAxios";

const ClaimRequestPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const axiosInstance = UseAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { data: approvedPolicies = [] } = useQuery({
    queryKey: ["approvedPolicies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/approved?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: claims = [], refetch } = useQuery({
    queryKey: ["myClaims", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/claims?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reason = form.reason.value;
    const file = form.document.files[0];
    setFileUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    try {
      const uploadRes = await axiosInstance.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Upload_key}`,
        formData
      );
      const documentUrl = uploadRes.data.data.url;

      const claim = {
        userEmail: user.email,
        policyId: selectedPolicy._id,
        policyName: selectedPolicy.policyName,
        reason,
        amount: selectedPolicy.basePremium,
        documentUrl,
        status: "pending",
        claimDate: new Date(),
      };

      const res = await axiosSecure.post("/claims", claim);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your claim has been submitted.", "success");
        refetch();
        setSelectedPolicy(null);
        closeModal();
      } else {
        Swal.fire("Error", "Failed to submit claim. Try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "File upload failed. Try again.", "error");
    } finally {
      setFileUploading(false);
    }
  };

  const handleApprovedClick = (policyName) => {
    Swal.fire({
      title: "Claim Approved",
      text: `Your claim for policy "${policyName}" has been approved!`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <title>Claim Request</title>
      <main className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-semibold text-primary mb-8 border-b border-gray-300 pb-2">
          Claim Request
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedPolicies.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No approved policies found.
            </p>
          )}
          {approvedPolicies.map((policy) => {
            const existingClaim = claims.find((c) => c.policyId === policy._id);
            return (
              <div
                key={policy._id}
                className="border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-primary">{policy.policyName}</h3>
                  <div className="text-gray-700 font-medium">{policy.basePremium} ৳</div>
                  {existingClaim ? (
                    <p className="mt-3 text-sm font-medium text-primary">
                      Claim Status:{" "}
                      {existingClaim.status === "approved" ? (
                        <button
                          onClick={() => handleApprovedClick(policy.policyName)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Approved
                        </button>
                      ) : (
                        <span
                          className={`capitalize ${
                            existingClaim.status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {existingClaim.status}
                        </span>
                      )}
                    </p>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPolicy(policy);
                        openModal();
                      }}
                      className="mt-4 px-5 py-2 bg-primary text-white rounded-md shadow hover:bg-secondary transition w-full md:w-auto"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {isModalOpen && selectedPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
              <h2 className="text-xl text-primary font-semibold mb-4">
                Submit Claim for: {selectedPolicy.policyName}
              </h2>
              <form onSubmit={handleClaimSubmit} className="space-y-5">
                <input
                  type="text"
                  value={selectedPolicy.policyName}
                  readOnly
                  className="input input-bordered w-full bg-white text-gray-700 font-semibold"
                />
                <textarea
                  name="reason"
                  placeholder="Reason for claim"
                  required
                  className="textarea textarea-bordered bg-white w-full resize-none text-gray-700"
                />
                <input
                  type="file"
                  name="document"
                  required
                  className="file-input text-gray-700 bg-white file-input-bordered w-full cursor-pointer"
                />
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <button
                    type="submit"
                    className="btn bg-primary border-0 hover:bg-secondary text-white flex-1 sm:flex-none"
                    disabled={fileUploading}
                  >
                    {fileUploading ? "Submitting..." : "Submit Claim"}
                  </button>
                  <button
                    type="button"
                    className="btn bg-secondary border-0 text-white hover:bg-primary/10 flex-1 sm:flex-none"
                    onClick={() => {
                      closeModal();
                      setSelectedPolicy(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClaimRequestPage;
