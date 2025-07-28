import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../Components/Loading';

const AssignedCustomers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['assignedApplications', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/assigned?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const mutation = useMutation({
    mutationFn: async ({ appId, status, policyId }) => {
      return axiosSecure.patch(`/applications/status/${appId}`, {
        newStatus: status,
        policyId,
      });
    },
    onSuccess: () => {
      toast.success('✅ Status updated successfully!', { theme: 'colored' });
      queryClient.invalidateQueries(['assignedApplications', user?.email]);
    },
    onError: () => {
      toast.error('❌ Failed to update status.', { theme: 'colored' });
    },
  });

  const handleStatusChange = (appId, policyId, status) => {
    mutation.mutate({ appId, status, policyId });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 max-w-full">
      <title>Assigned Customer</title>
      <h2 className="text-2xl font-semibold mb-4 text-primary">Assigned Customers</h2>

      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
        <table className="table w-full min-w-[600px]">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-2">#</th>
              <th className="whitespace-nowrap px-4 py-2">Customer Name</th>
              <th className="whitespace-nowrap px-4 py-2">Email</th>
              <th className="whitespace-nowrap px-4 py-2">Policy</th>
              <th className="whitespace-nowrap px-4 py-2">Status</th>
              <th className="whitespace-nowrap px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No assigned customers found.
                </td>
              </tr>
            )}
            {applications.map((app, idx) => (
              <tr key={app._id} className="bg-white text-gray-700 hover:bg-gray-50 transition">
                <td className="px-4 py-2 whitespace-nowrap">{idx + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{app.name}</td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{app.email}</td>
                <td className="text-primary px-4 py-2 whitespace-nowrap max-w-xs truncate">{app.policyName}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, app.policyId, e.target.value)}
                    className={`select select-bordered select-sm font-semibold w-full max-w-[140px] ${
                      app.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : app.status === 'Rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    className="btn btn-sm bg-primary border-none text-white hover:bg-primary-focus whitespace-nowrap"
                    onClick={() => setSelectedApp(app)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-2xl mb-3 text-primary">Application Details</h3>
            <div className="space-y-1 text-gray-700 text-sm sm:text-base">
              <p><strong>Name:</strong> {selectedApp.name}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>NID:</strong> {selectedApp.nid}</p>
              <p><strong>Policy:</strong> {selectedApp.policyName}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Nominee:</strong> {selectedApp.nomineeName}</p>
              <p><strong>Relationship:</strong> {selectedApp.relationship}</p>
              <p><strong>Health Issues:</strong> {selectedApp.healthIssues?.join(', ') || 'None'}</p>
              <p><strong>Applied At:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</p>
            </div>

            <div className="modal-action">
              <button
                className="btn bg-secondary border-0 text-white hover:bg-secondary-focus"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignedCustomers;
