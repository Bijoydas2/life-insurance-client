import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const NewsletterForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post('/newsletter', { email: data.email });
      toast.success(res.data.message);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-12">
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-8">
        <h3 className="text-3xl font-extrabold text-center text-[#27445D] mb-6">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Stay updated with our latest policies, offers, and tips for secure living.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-4 w-full"
          noValidate
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className={`w-full sm:flex-grow p-4 rounded-xl border focus:outline-none text-gray-700 dark:text-gray-200 transition ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
              }
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>

        {errors.email && (
          <p id="email-error" className="mt-4 text-red-600 text-sm text-center">
            {errors.email.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterForm;
