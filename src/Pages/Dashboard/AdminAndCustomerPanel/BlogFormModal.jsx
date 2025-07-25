import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../../hooks/UseAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const BlogFormModal = ({ blog, setIsModalOpen, refetch }) => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(blog?.image || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      title: blog?.title || '',
      details: blog?.details || '',
      image: blog?.image || '',
    });
    setProfilePic(blog?.image || "");
  }, [blog, reset]);

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      ...data,
      image: profilePic || data.image,  // ensure image updated from upload
      author: user.displayName,
      authorEmail: user.email.toLowerCase(),
      authorProfile: user.photoURL,
      createdAt: blog?.createdAt || new Date().toISOString(),
      totalVisit: blog?.totalVisit || 0,
    };

    try {
      if (blog?._id) {
        await axiosSecure.patch(`/blogs/${blog._id}`, payload);
        Swal.fire('Success!', 'Blog updated successfully!', 'success');
      } else {
        await axiosSecure.post('/blogs', payload);
        Swal.fire('Success!', 'Blog created successfully!', 'success');
      }

      reset();
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to save blog.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Upload_key}`;
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center">
          {blog ? 'Edit Blog' : 'Add New Blog'}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 font-semibold text-secondary text-sm sm:text-base">
              Title
            </label>
            <input
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="input input-bordered text-gray-700 bg-white w-full border-secondary focus:border-primary focus:ring-primary"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-600 mt-1 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="details" className="block mb-2 font-semibold text-secondary text-sm sm:text-base">
              Content
            </label>
            <textarea
              id="details"
              {...register('details', { required: 'Content is required' })}
              className="textarea textarea-bordered text-gray-700 bg-white w-full min-h-[150px] border-secondary focus:border-primary focus:ring-primary"
              placeholder="Write your blog content here..."
            />
            {errors.details && (
              <p className="text-red-600 mt-1 text-sm">{errors.details.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm sm:text-base text-secondary font-medium">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border text-gray-700 bg-white border-secondary focus:border-primary focus:ring-primary rounded"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
            )}
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-3 w-24 h-24 object-cover rounded-full border"
              />
            )}
          </div>

          {/* Author Name */}
          <div>
            <label className="block mb-2 font-semibold text-secondary text-sm sm:text-base">
              Author Name
            </label>
            <input
              type="text"
              value={user.displayName || ''}
              readOnly
              className="input input-bordered w-full text-gray-700 bg-white cursor-not-allowed border-secondary"
            />
          </div>

          {/* Author Email */}
          <div>
            <label className="block mb-2 font-semibold text-secondary text-sm sm:text-base">
              Author Email
            </label>
            <input
              type="text"
              value={user.email || ''}
              readOnly
              className="input input-bordered w-full text-gray-700 bg-white cursor-not-allowed border-secondary"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-white w-full sm:w-auto"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-primary border-primary text-white hover:bg-primary/90 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? 'Saving...' : blog ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
