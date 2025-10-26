import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { format } from "date-fns";
import Loading from "../../Components/Loading";
import UseAxios from "../../hooks/UseAxios";
import { ThemeContext } from "../../Context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogsPage = () => {
  const axiosInstance = UseAxios();
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark"; // ✅ theme context থেকে dark/light চেক

  // 🔹 Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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
    <section
      className={`max-w-7xl mx-auto px-4 py-12 transition-colors duration-300 ${
        dark ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <title>All Blogs</title>

      <h1
        className={`text-4xl font-extrabold text-center mb-12 ${
          dark ? "text-white" : "text-[#27445D]"
        }`}
        data-aos="fade-down"
      >
        All Blog Articles
      </h1>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className={`group relative rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden h-full ${
              dark ? "bg-[#1e293b]" : "bg-white"
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg drop-shadow-lg line-clamp-2">
                {blog.title}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between text-sm mb-2">
                <span className={dark ? "text-gray-300" : "text-gray-500"}>
                  {format(new Date(blog.createdAt), "PPP")}
                </span>
                <span
                  className={`flex items-center gap-1 font-medium ${
                    dark ? "text-primary" : "text-primary"
                  }`}
                >
                  <FaEye /> {blog.totalVisit}
                </span>
              </div>

              <p
                className={`line-clamp-3 mb-4 flex-grow ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {blog.details.length > 120
                  ? blog.details.slice(0, 120) + "..."
                  : blog.details}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={blog.authorProfile}
                  alt={blog.author}
                  className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />
                <span
                  className={`text-sm font-medium ${
                    dark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {blog.author}
                </span>
              </div>

              <Link
                to={`/blogs/${blog._id}`}
                className={`btn border-2 px-6 py-3 rounded-lg font-semibold transition duration-300 text-center ${
                  dark
                    ? "bg-primary text-white hover:bg-transparent hover:primary border-primary"
                    : "bg-primary text-white hover:bg-white hover:text-primary border-primary"
                }`}
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
          className={`px-4 py-2 rounded transition-all duration-300 ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : dark
              ? "bg-gray-700 text-white hover:bg-primary"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
              page === pg
                ? dark
                  ? "bg-primary text-white"
                  : "bg-primary text-white"
                : dark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded transition-all duration-300 ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : dark
              ? "bg-gray-700 text-white hover:bg-teal-500"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default BlogsPage;
