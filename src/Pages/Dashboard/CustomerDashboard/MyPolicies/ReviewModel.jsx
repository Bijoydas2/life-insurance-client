import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import UseAuth from '../../../../hooks/UseAuth';


const ReviewModal = ({ policy, closeModal }) => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();

  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const onSubmit = async (data) => {
    const review = {
      customerName: user.displayName,
      customerEmail: user.email,
      rating: selectedRating,
      feedback: data.feedback,
      policyId: policy.policyId,
      policyName: policy.policyName,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post('/reviews', review);
      Swal.fire('Thank you!', 'Your review has been submitted.', 'success');
      reset();
      closeModal();
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Could not submit review.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-md max-h-[90vh] overflow-auto">
        <h3 className="text-2xl font-semibold text-center text-primary mb-4">
          Review: {policy.policyName}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-secondary">Rating</label>
            <div className="flex gap-2 text-yellow-500 text-3xl justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer transition ${
                    (hoveredRating || selectedRating) >= star
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRatingClick(star)}
                  aria-label={`${star} star`}
                />
              ))}
            </div>
            <input type="hidden" {...register('rating', { required: true })} />
          </div>

          {/* Feedback */}
          <div className="mb-4">
            <label className="block font-medium text-secondary mb-1">Feedback</label>
            <textarea
              {...register('feedback', { required: true })}
              className="textarea textarea-bordered w-full min-h-[100px]"
              placeholder="Share your experience..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              className="btn btn-outline bg-secondary w-full sm:w-auto"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={selectedRating === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
