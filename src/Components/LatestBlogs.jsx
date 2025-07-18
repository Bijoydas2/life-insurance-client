import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import { format } from "date-fns";

const LatestBlogs = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs/latest");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (isError || !Array.isArray(blogs)) return <p className="text-red-500 text-center py-6">Failed to load blogs.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-4xl font-bold text-center text-primary mb-10">Latest Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 ">
            <img src={blog.image} alt={blog.title} className="w-full h-44 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-500">{format(new Date(blog.createdAt), 'PPP')}</p>
            <h3 className="text-xl font-semibold mt-2 text-secondary">{blog.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{blog.content.slice(0, 100)}...</p>
            <Link
              to={`/blogs/${blog._id}`}
              className="inline-block mt-4 text-sm font-medium text-white bg-primary px-4 py-2 rounded hover:bg-opacity-90 transition"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/blogs" className="inline-block   bg-primary px-6 py-2 rounded hover:bg-primary hover:text-white transition">
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
