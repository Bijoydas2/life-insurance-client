import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/banner/banner1.jpg";
import img2 from "../assets/banner/banner2.jpg";
import img3 from "../assets/banner/banner3.jpg";

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
      interval={2000}
      transitionTime={600}
      swipeable
      emulateTouch
    >
      {banners.map((slide) => (
        <div key={slide.id} className="relative h-[300px] sm:h-[400px]  md:h-[80vh] lg:h-[60vh]">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div
            className="
              absolute
              top-1/2
              left-1/2
              transform
              -translate-x-1/2
              -translate-y-1/2
              backdrop-blur-sm
              p-4 sm:p-6
              rounded-lg
              max-w-[90%]
              w-full
              text-center
            "
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary mb-2">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-black">
              {slide.description}
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
