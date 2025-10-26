import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import UseAuth from '../../../../hooks/UseAuth';

const PaymentStatus = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: approvedPolicies = [] } = useQuery({
    queryKey: ['paymentStatus', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/approved?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-4">
      <title>Payment Status

      </title>
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>Policy</th>
              <th>Premium</th>
              <th>Frequency</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedPolicies.map((policy) => (
              <tr key={policy._id} className="bg-white text-gray-700">
                <td>{policy.policyName}</td>
                <td>${policy.basePremium}</td>
                <td>{policy.paymentFrequency}</td>
                <td>{policy.paymentStatus}</td>
                <td>
                  {policy.paymentStatus === 'Due' ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        navigate('/dashboard/payment', {
                          state: {
                            applicationId: policy._id,
                            premium: policy.basePremium,
                            policyName: policy.policyName,
                            frequency: policy.paymentFrequency,
                          },
                        })
                      }
                    >
                      Pay
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStatus;
