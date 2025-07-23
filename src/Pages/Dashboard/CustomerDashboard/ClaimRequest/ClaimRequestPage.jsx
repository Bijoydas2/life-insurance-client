import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link, useLocation } from "react-router";
import { FaFileAlt, FaCreditCard } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UseAuth from "../../../../hooks/UseAuth";
import UseAxios from "../../../../hooks/UseAxios";

const ClaimRequestPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const location = useLocation();
  const axiosInstance =UseAxios();
  const isActive = (path) => location.pathname.includes(path);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const { data: approvedPolicies = [], refetch } = useQuery({
    queryKey: ["approvedPolicies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/approved?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: claims = [] } = useQuery({
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
        documentUrl,
        status: "pending",
        claimDate: new Date(),
      };

      const res = await axiosSecure.post("/claims", claim);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your claim has been submitted.", "success");
        refetch();
        setSelectedPolicy(null);
      } else {
        Swal.fire("Error", "Failed to submit claim. Try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "File upload failed. Try again.", "error");
    } finally {
      setFileUploading(false);
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto p-6 gap-8 min-h-screen">
     

      {/* Main content */}
      <main className="flex-1 bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-3xl font-semibold text-primary mb-8 border-b border-gray-300 pb-2">
          Claim Request
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
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
                  {existingClaim ? (
                    <p className="mt-3 text-sm font-medium text-primary">
                      Claim Status:{" "}
                      <span
                        className={`capitalize ${
                          existingClaim.status === "approved"
                            ? "text-green-600"
                            : existingClaim.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {existingClaim.status}
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={() => setSelectedPolicy(policy)}
                      className="mt-4 px-5 py-2 bg-primary text-white rounded-md shadow hover:bg-secondary transition"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim submission form */}
        {selectedPolicy && (
          <div className="mt-10 max-w-md bg-primary/5 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-primary">
              Submit Claim for: {selectedPolicy.policyName}
            </h3>
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
                className="file-input text-gray-700  bg-white file-input-bordered w-full cursor-pointer"
              />
              <div className="flex justify-between gap-4">
                <button
                  type="submit"
                  className="btn bg-primary border-0 hover:bg-secondary text-white flex-1"
                  disabled={fileUploading}
                >
                  {fileUploading ? "Submitting..." : "Submit Claim"}
                </button>
                <button
                  type="button"
                  className="btn bg-secondary border-0 text-white hover:bg-primary/10 flex-1"
                  onClick={() => setSelectedPolicy(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClaimRequestPage;
