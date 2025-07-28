import React from 'react';
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa'; 

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6 text-red-500">
          <FaBan size={60} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
