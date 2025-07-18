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
  <form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-3xl mx-auto mt-12 flex flex-col sm:flex-row items-center gap-4 px-4"
  noValidate
>
  <input
    type="email"
    placeholder="Enter your email address"
    className={`w-full sm:flex-grow sm:max-w-[600px] p-3 rounded-md border focus:outline-none transition ${
      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary'
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
    className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
    aria-busy={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : 'Subscribe'}
  </button>

  {errors.email && (
    <p id="email-error" className="mt-2 text-red-600 text-sm sm:absolute sm:bottom-[-24px] sm:left-0">
      {errors.email.message}
    </p>
  )}
</form>


  );
};

export default NewsletterForm;
