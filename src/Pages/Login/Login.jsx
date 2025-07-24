import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import loginLottie from '../../assets/Lotties/login.json';
import { toast } from 'react-toastify';
import UseAuth from '../../hooks/UseAuth';
import SocialLogin from '../../Components/SocailLogin';

const Login = () => {
  const { signIn } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        toast.success('Your Account Logged In Successfully!');
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.code}`);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-6">
      <div className="w-full max-w-sm md:max-w-md">
        <Lottie animationData={loginLottie} loop={true} />
      </div>

      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md md:ml-10">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Login to Insurance Portal</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-all duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <SocialLogin from={from} />
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;