import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import { format } from "date-fns";
import UseAxios from "../hooks/UseAxios";
import { FaEye } from "react-icons/fa";
import Loading from "./Loading";
import { ThemeContext } from "../Context/ThemeContext"; 
import AOS from "aos";
import "aos/dist/aos.css";

const LatestBlogs = () => {
  const axiosInstance = UseAxios();
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";


  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blogs/latest");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError || !Array.isArray(blogs))
    return (
      <p className="text-center py-10 text-red-600 font-semibold">
        Failed to load blogs.
      </p>
    );

  return (
    <section
      className={`max-w-7xl mx-auto px-6 mt-16 py-10 transition-colors duration-300 `}
    >
      <h2
        className={`text-4xl font-extrabold text-center mb-14 `}
        data-aos="fade-down"
      >
        Latest Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className={`group relative rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden ${
              dark ? "bg-[#1e293b]" : "bg-white"
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image & overlay */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white">
                <h3 className="text-lg font-semibold line-clamp-2 drop-shadow-md">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-2 text-sm font-medium drop-shadow-md">
                 
                  <FaEye className="text-secondary" /> 
                  <span>{blog.totalVisit}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm mb-3`}>
                {format(new Date(blog.createdAt), "PPP")}
              </p>
              <p className={`${dark ? "text-gray-300" : "text-gray-700"} flex-grow line-clamp-3 mb-4`}>
                {blog.details.length > 120
                  ? blog.details.slice(0, 120) + "..."
                  : blog.details}
              </p>

              <div className={`flex justify-between items-center text-sm font-semibold mb-5 ${dark ? "text-primary" : "text-gray-600"}`}>
                <span className="italic">By {blog.author}</span>
              </div>

              <Link
                to={`/blogs/${blog._id}`}
                className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300 text-center"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16" data-aos="fade-up">
        <Link
          to="/blogs"
          className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;