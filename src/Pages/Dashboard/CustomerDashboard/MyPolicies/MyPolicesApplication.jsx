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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Policies</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-secondary text-white">
              <th>Policy</th>
              <th>Status</th>
              <th>Premium</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPolicies.map(policy => (
              <tr key={policy._id} className="bg-white text-gray-700">
                <td>{policy.policyName}</td>
                <td>{policy.status}</td>
                <td>{policy.basePremium} ৳</td>
                <td>
                  {Array.isArray(policy.duration)
                    ? policy.duration.join(', ')
                    : policy.duration}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
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
