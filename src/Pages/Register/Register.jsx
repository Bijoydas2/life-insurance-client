import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerLottie from "../../assets/Lotties/register.json";
import UseAuth from "../../hooks/UseAuth";
import SocailLogin from "../../Components/SocailLogin";


const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photoURL } = data;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters and include one uppercase and one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({
          displayName: name,
          photoURL: photoURL
        }).then(() => {
          toast.success("Account created successfully!");
          reset();
          navigate(from);
        }).catch((error) => {
          toast.error(`Profile update failed: ${error.message}`);
        });
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-4">
      <div className="max-w-xs w-full">
        <Lottie animationData={registerLottie} loop={true} />
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-xl p-8 max-w-lg mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-8">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7EA4]"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7EA4]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7EA4]"
            />
            <p className="text-xs text-gray-500 mt-1">Min 6 chars, 1 uppercase, 1 lowercase</p>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-700 font-medium mb-1">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: "Photo URL is required" })}
              placeholder="Photo URL"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7EA4]"
            />
            {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <SocailLogin />

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
