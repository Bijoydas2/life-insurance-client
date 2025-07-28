import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import Loading from './Loading';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import UseAxios from '../hooks/UseAxios';

const CustomerReviews = () => {
  const axiosInstance = UseAxios();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosInstance.get('/reviews');
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
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Customer Reviews
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        loop={true}
        className="pb-10"
      >
        {reviews.map(({ _id, name, rating, comment, avatar }) => (
          <SwiperSlide key={_id}>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-secondary transition duration-300 h-full flex flex-col">
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
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 flex-grow">
                {comment}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviews;
