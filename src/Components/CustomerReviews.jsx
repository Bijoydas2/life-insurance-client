import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaStar } from 'react-icons/fa';
import Loading from './Loading';

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError || !Array.isArray(reviews)) {
    return (
      <p className="text-center text-red-500 py-8">
        Failed to load reviews. Please try again later.
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 ">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(({ _id, name, rating, comment, avatar }) => (
          <div
            key={_id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-secondary transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="font-semibold text-lg text-primary">{name}</h3>
                <div className="flex items-center text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
                      }
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">
                    {rating?.toFixed(1) || 5.0}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
              {comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
