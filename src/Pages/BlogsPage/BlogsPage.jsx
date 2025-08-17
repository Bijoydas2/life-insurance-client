import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { format } from "date-fns";
import Loading from "../../Components/Loading";
import UseAxios from "../../hooks/UseAxios";

const BlogsPage = () => {
  const axiosInstance = UseAxios();
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Blogs per page

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError || !Array.isArray(data?.blogs))
    return (
      <p className="text-center text-red-600 font-semibold py-10">
        Failed to load blogs.
      </p>
    );

  const { blogs = [], totalPages = 1 } = data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <title>All Blogs</title>
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        All Blog Articles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden h-full"
          >
            {/* Image with overlay */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-lg">
                {blog.title}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>{format(new Date(blog.createdAt), "PPP")}</span>
                <span className="flex items-center gap-1 text-secondary font-medium">
                  <FaEye /> {blog.totalVisit}
                </span>
              </div>

              <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
                {blog.details.length > 120 ? blog.details.slice(0, 120) + "..." : blog.details}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={blog.authorProfile}
                  alt={blog.author}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">{blog.author}</span>
              </div>

              <Link
                to={`/blogs/${blog._id}`}
                className="mt-auto block bg-primary hover:bg-secondary text-white py-3 rounded-full text-center font-semibold transition-colors duration-300 shadow-md"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2 flex-wrap">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 text-gray-700 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-primary hover:text-white"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`px-4 py-2 rounded font-medium ${
              page === pg
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 text-gray-700 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-primary hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default BlogsPage;
