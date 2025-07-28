import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <p className="mt-4 text-gray-500">Loading blog details...</p>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <p className="text-center text-red-600 py-10  font-semibold">
        Failed to load blog.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 my-12 bg-white rounded-2xl shadow-xl border border-gray-200">
      <title>Blog Details</title>
      {/* Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-2xl mb-8 shadow-md"
      />

     
      <p className="text-gray-400 text-sm uppercase tracking-wide font-semibold mb-1">
        {format(new Date(blog.createdAt), "PPP")}
      </p>

      
      <h1 className="text-4xl font-extrabold text-primary mb-6">{blog.title}</h1>

      
      <p className="text-gray-700 leading-relaxed text-lg mb-10">{blog.details}</p>

 
      <div className="flex items-center gap-5 text-gray-600 border-t border-gray-100 pt-6">
        <img
          src={blog.authorProfile}
          alt={blog.author}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
        <div>
          <p className="font-semibold text-secondary">{blog.author}</p>
          <p className="text-sm text-gray-400">{blog.authorEmail}</p>
        </div>

        <span className="flex items-center gap-2 ml-auto text-secondary font-semibold">
          <FaEye className="text-xl" /> {blog.totalVisit}
        </span>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
