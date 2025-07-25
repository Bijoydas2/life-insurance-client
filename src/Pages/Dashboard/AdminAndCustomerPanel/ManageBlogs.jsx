import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';
import BlogFormModal from './BlogFormModal';

const ManageBlogs = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Normalize _id to string
  const getId = (id) => (id && typeof id === 'object' && id.$oid ? id.$oid : id);

  // Fetch blogs for logged in user (role=agent used here, adjust as needed)
  const { data: blogs = [] } = useQuery({
    queryKey: ['manageBlogs', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/blogs/manage?email=${user.email}&role=agent`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete blog and update cache instantly
  const handleDelete = async (id) => {
    const blogId = getId(id);
    if (!blogId) return Swal.fire('Error', 'Invalid blog ID', 'error');

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/blogs/${blogId}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
        queryClient.setQueryData(['manageBlogs', user?.email], (old = []) =>
          old.filter((b) => getId(b._id) !== blogId)
        );
      } else {
        Swal.fire('Error!', 'Delete failed.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Delete request failed.', 'error');
    }
  };

  return (
    <div className="p-4 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Manage Blogs</h2>
        <button
          className="btn btn-primary whitespace-nowrap"
          onClick={() => {
            setEditingBlog(null);
            setIsModalOpen(true);
          }}
        >
          + Add New Blog
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
        <table className="table w-full min-w-[600px]">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="whitespace-nowrap px-4 py-2">Title</th>
              <th className="whitespace-nowrap px-4 py-2">Author</th>
              <th className="whitespace-nowrap px-4 py-2">Email</th>
              <th className="whitespace-nowrap px-4 py-2">Visits</th>
              <th className="whitespace-nowrap px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
            {blogs.map((blog) => (
              <tr
                key={getId(blog._id)}
                className="bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                <td className="text-primary px-4 py-2 whitespace-nowrap max-w-xs truncate">{blog.title}</td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{blog.author}</td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{blog.authorEmail}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{blog.totalVisit}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm bg-green-700 border-0 whitespace-nowrap"
                      onClick={() => {
                        setEditingBlog(blog);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error whitespace-nowrap"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <BlogFormModal
          blog={editingBlog}
          setIsModalOpen={setIsModalOpen}
          refetch={() => queryClient.invalidateQueries(['manageBlogs', user?.email])}
        />
      )}
    </div>
  );
};

export default ManageBlogs;
