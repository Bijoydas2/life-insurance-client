import { FaLock } from "react-icons/fa";
import { Link } from "react-router";


const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4">
          <FaLock className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
