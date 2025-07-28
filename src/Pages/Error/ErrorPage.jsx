import React from 'react';
import { Link } from 'react-router';
import { BiError } from 'react-icons/bi';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 text-center px-4">
      <BiError className="text-7xl text-red-500 mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Sorry, the page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
