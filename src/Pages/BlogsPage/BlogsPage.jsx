import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { format } from "date-fns";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";

const BlogsPage = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  if (isLoading)
    return <Loading/>;

  if (isError || !Array.isArray(blogs))
    return (
      <p className="text-center text-red-600 font-semibold py-10">
        Failed to load blogs.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        All Blog Articles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>{format(new Date(blog.createdAt), "PPP")}</span>
                <span className="flex items-center gap-1 text-secondary font-medium">
                  <FaEye /> {blog.totalVisit}
                </span>
              </div>

              <h2 className="text-xl text-secondary font-semibold text-gray-800 mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
                {blog.details.slice(0, 130)}...
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={blog.authorProfile}
                  alt={blog.author}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {blog.author}
                </span>
              </div>

              <Link
                to={`/blogs/${blog._id}`}
                className="mt-5 inline-block  text-center bg-primary hover:bg-secondary text-white text-sm font-semibold px-5 py-2 rounded-full transition"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsPage;
