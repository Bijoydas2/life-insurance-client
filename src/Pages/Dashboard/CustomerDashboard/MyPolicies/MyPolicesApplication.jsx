import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ReviewModal from './ReviewModel';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import UseAuth from '../../../../hooks/useAuth';

const MyPoliciesApplication = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const { data: myPolicies = [] } = useQuery({
    queryKey: ['myPolicies', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/customer?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleView = (policy) => {
    Swal.fire({
      title: policy.policyName,
      html: `
        <div style="text-align: left;">
          <p><strong>Status:</strong> ${policy.status}</p>
          <p><strong>Base Premium:</strong> ${policy.basePremium} ৳</p>
          <p><strong>Duration:</strong> ${Array.isArray(policy.duration) ? policy.duration.join(', ') : policy.duration}</p>
          <p><strong>Customer:</strong> ${policy.customerName || 'N/A'} (${policy.customerEmail || 'N/A'})</p>
          <p><strong>Address:</strong> ${policy.customerAddress || 'N/A'}</p>
          <p><strong>Nominee:</strong> ${policy.nomineeName || 'N/A'} (${policy.nomineeRelation || 'N/A'})</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Close'
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center sm:text-left">My Policies</h2>
      <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
        <table className="table-auto w-full min-w-[600px]">
          <thead>
            <tr className="bg-secondary text-white text-sm sm:text-base">
              <th className="px-3 py-2 text-left">Policy</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-right">Premium</th>
              <th className="px-3 py-2 text-left">Duration</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPolicies.map(policy => (
              <tr key={policy._id} className="bg-white text-gray-700 hover:bg-gray-50 transition">
                <td className="px-3 py-2 max-w-xs truncate">{policy.policyName}</td>
                <td className="px-3 py-2">{policy.status}</td>
                <td className="px-3 py-2 text-right">{policy.basePremium} ৳</td>
                <td className="px-3 py-2 max-w-xs truncate">
                  {Array.isArray(policy.duration)
                    ? policy.duration.join(', ')
                    : policy.duration}
                </td>
                <td className="px-3 py-2 text-center space-x-1 whitespace-nowrap">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleView(policy)}
                  >
                    View
                  </button>

                  {policy.status === 'Approved' && !policy.reviewed && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedPolicy(policy)}
                    >
                      Give Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPolicy && (
        <ReviewModal
          policy={selectedPolicy}
          closeModal={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
};

export default MyPoliciesApplication;
