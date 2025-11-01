import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { ThemeContext } from '../Context/ThemeContext'; 
import AOS from "aos"; 
import "aos/dist/aos.css";

const NewsletterForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); 
  const dark = theme === 'dark';

  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <div
        className={` rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 ${
          dark ? 'shadow-xl bg-gradient-to-r from-gray-800  to-gray-900 shadow-gray-900/50' : 'bg-gradient-to-r from-indigo-50 via-white to-indigo-50'
        }`}
        data-aos="zoom-in-up" 
        data-aos-delay="100"
      >
        <h3
          className={`text-3xl font-extrabold text-center mb-6 transition-colors duration-300 ${
            dark ? 'text-white' : 'text-[#27445D]' 
          }`}
          data-aos="fade-down"
        >
          Subscribe to Our Newsletter
        </h3>
        <p className={`text-center 
          ${dark? "dark:text-gray-300": "text-gray-600"} mb-6`} data-aos="fade-up" data-aos-delay="200">
          Stay updated with our latest policies, offers, and tips for secure living.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-4 w-full"
          noValidate
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className={`w-full sm:flex-grow p-2 rounded-xl border focus:outline-none transition-all ${
            
              dark
                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
            } ${
            
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:border-primary focus:ring-2 focus:ring-primary'
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
             className="mt-auto inline-block bg-primary text-white font-semibold text-center p-3 py-2 rounded-xl hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300"
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