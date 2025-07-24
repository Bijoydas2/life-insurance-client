import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerLottie from "../../assets/Lotties/register.json";
import UseAuth from "../../hooks/UseAuth";
import SocailLogin from "../../Components/SocailLogin";
import UseAxios from '../../hooks/UseAxios';

import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const axiosInstance = UseAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Upload_key}`;
     console.log("API key:", import.meta.env.VITE_image_upload_key);
      const res = await axios.post(imagUploadUrl, formData);
      setProfilePic(res.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    const { name, email, password } = data;

    // Password must have min 6 chars, at least 1 uppercase and 1 lowercase letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include one uppercase and one lowercase letter."
      );
      return;
    }

    if (!profilePic) {
      toast.error("Please upload your profile picture.");
      return;
    }

    createUser(email, password)
      .then(async (result) => {
        await updateUserProfile({
          displayName: name,
          photoURL: profilePic,
        });

        // Post user info to backend with role "user"
        try {
          await axiosInstance.post("/users", {
            email,
            name,
            role: "customer",
            photoURL: profilePic,
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString(),
          });
        } catch (err) {
          console.error("Backend user save error:", err);
          toast.error("Failed to save user data in backend.");
        }

        toast.success("Account created successfully!");
        reset();
        navigate(from);
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
      <div className="max-w-xs w-full">
        <Lottie animationData={registerLottie} loop={true} />
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-xl p-8 max-w-lg mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Min 6 chars, 1 uppercase, 1 lowercase
            </p>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A7EA4]"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
            )}
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            Register
          </button>
        </form>

        <SocailLogin />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
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
