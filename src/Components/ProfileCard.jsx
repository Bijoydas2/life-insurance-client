import { FaEnvelope, FaClock } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/UseUserRole";


const ProfileCard = () => {
  const { user } = UseAuth();
  const { role, isLoading: roleLoading } = useUserRole();

  if (roleLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white my-12 py-10 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User"}
            className="object-cover w-full h-full"
          />
        </div>

        <h2 className="text-2xl text-primary font-bold">
          {user?.displayName || "User"}
        </h2>

        <span
          className={`badge badge-lg 
            ${role === "admin" ? "badge-error" : ""} 
            ${role === "agent" ? "badge-success" : ""} 
            ${role === "customer" ? "badge-info" : ""}
          `}
        >
          {role?.toUpperCase() || "CUSTOMER"}
        </span>
      </div>

      {/* Email */}
      <div className="flex items-center gap-2 text-gray-700 justify-center mt-4">
        <FaEnvelope />
        <p>{user?.email}</p>
      </div>

      {/* Last Login */}
      <div className="flex items-center gap-2 text-gray-700 justify-center mt-2">
        <FaClock />
        <p>
          {user?.metadata?.lastSignInTime
            ? new Date(user.metadata.lastSignInTime).toLocaleString("en-BD", {
                hour12: true,
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
