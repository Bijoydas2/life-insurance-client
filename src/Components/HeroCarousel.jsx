import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/banner/banner1.jpg";
import img2 from "../assets/banner/banner2.jpg";
import img3 from "../assets/banner/banner3.jpg";
import { Link } from "react-router";

const banners = [
  {
    id: 1,
    title: "Secure Your Life with Confidence",
    description: "Best life insurance policies tailored for you.",
    image: img1,
  },
  {
    id: 2,
    title: "Protect What Matters Most",
    description: "Affordable and trusted insurance services.",
    image: img2,
  },
  {
    id: 3,
    title: "Invest in Life, Invest in Security",
    description: "Explore plans with high returns and lifetime benefits.",
    image: img3,
  },
];

const HeroCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      transitionTime={800}
      swipeable
      emulateTouch
    >
      {banners.map((slide) => (
        <div key={slide.id} className="relative h-[60vh] w-full">
          {/* Banner Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Optional dim overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Centered Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 sm:px-6">
            <h2 className="inline-block  text-white px-4 py-2 rounded-md text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="mt-2 inline-block text-secondary px-3 py-1 rounded-md text-sm sm:text-base md:text-lg drop-shadow-md">
              {slide.description}
            </p>
            {/* Button placed below text */}
            <div className="mt-4">
            <Link to="/allPolicies">
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
                See More
              </button>
            </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
