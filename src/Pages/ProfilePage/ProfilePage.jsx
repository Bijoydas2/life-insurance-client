import { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import UseUserRole from "../../hooks/UseUserRole";
import { FaEnvelope, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Loading";


const ProfilePage = () => {
  const { user } = UseAuth();
  const { role, isLoading: roleLoading } = UseUserRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
    },
  });

  // Fetch profile
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data) {
        setPhotoPreview(data.photoURL || "/default-avatar.png");
        reset({
          name: data.name,
          photoURL: data.photoURL || "",
        });
      }
    },
  });

  const handleUpdate = async (updatedInfo) => {
    try {
      await axiosSecure.patch(`/users/${user.email}`, updatedInfo);
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["userProfile", user.email]);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Update error:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Upload_key}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        const imageUrl = data.data.url;
        setValue("photoURL", imageUrl);
        setPhotoPreview(imageUrl);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload error");
    }
  };

  const onSubmit = (data) => {
    const updatedInfo = {
      name: data.name,
      photoURL: data.photoURL,
    };
    handleUpdate(updatedInfo);
  };

  if (isLoading || roleLoading) {
    return <Loading />;
  }

  if (isError || !profile) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load profile data.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white my-12 py-10 rounded-xl shadow-lg">
      
        <title>My Profile</title>
   

      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        My Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-8 rounded-lg space-y-6">
        {/* Image, Name, Role */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={photoPreview || profile.photoURL || user.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="object-cover w-full h-full"
              onError={(e) => (e.target.src = "/default-avatar.png")}
            />
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                className="input input-bordered w-full max-w-xs text-center font-semibold text-lg"
                autoComplete="name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-sm file-input-bordered mt-2"
              />
            </>
          ) : (
            <h2 className="text-2xl text-primary font-bold">{profile.name}</h2>
          )}

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
        <div className="flex items-center gap-2 text-gray-700 justify-center">
          <FaEnvelope />
          <p>{profile.email}</p>
        </div>

        {/* Last Login */}
        <div className="flex items-center gap-2 text-gray-700 justify-center">
          <FaClock />
          <p>
            {profile.last_log_in
              ? new Date(profile.last_log_in).toLocaleString("en-BD", {
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

        {/* Action buttons */}
        {isEditing ? (
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setPhotoPreview(profile.photoURL || "/default-avatar.png");
                reset({
                  name: profile.name,
                  photoURL: profile.photoURL || "",
                });
              }}
              className="btn btn-outline bg-secondary btn-md"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-md" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn btn-primary btn-sm mt-4 w-full"
            disabled={isSubmitting}
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
