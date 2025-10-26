import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShieldAlt, FaUsers, FaHeartbeat } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import heroMain from "../assets/banner/banner1.jpg";
import heroLeft from "../assets/banner/banner2.jpg";
import heroRight from "../assets/banner/banner3.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

  const slides = [
    { src: "https://i.ibb.co.com/nsYm6vcM/Bike-1.png", title: "Health Coverage" },
    { src: "https://i.ibb.co.com/KzbtHDgP/cng.webp", title: "Family Protection" },
    { src: "https://i.ibb.co.com/HTvxSpFd/car.png", title: "Accident Insurance" },
    { src: "https://i.ibb.co.com/sdTWJXgN/Bangladesh-Ace-EX2-Intra-V20-Yodha-31-SC-20240918-jpg.webp", title: "Life Assurance" },
    { src: "https://i.ibb.co.com/wNWF0ZS0/Am.png", title: "Emergency Support" },
    { src: "https://i.ibb.co.com/tMwfhQZQ/BigCar.png", title: "Savings Plans" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/TMwRrtS3/world-map-page-0001.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-gray-50/80" />
      </div>

      {/* Left Section */}
      <div
        data-aos="fade-right"
        className="md:w-1/2 text-center md:text-left space-y-6 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#27445D] leading-tight">
          <span className="text-[#27445D]">LifeSecure</span> – Your <br />Partner in Protection
        </h1>

      <p className="text-gray-700 text-lg md:text-xl max-w-md mx-auto md:mx-0">
  <span className="font-semibold text-[#27445D]">LifeSecure</span> — your trusted partner for smart, safe, and flexible life insurance protection.
</p>


        {/* Button */}
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row items-center md:items-start gap-4 md:gap-6"
        >
          <Link
            to="/learnMore"
           className="btn bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary px-6 py-3 rounded-lg transition duration-300"
          >
            Learn More →
          </Link>
        </div>

        {/* Features */}
        <div
          data-aos="zoom-in-up"
          className="flex justify-center md:justify-start gap-6 pt-6 text-gray-700"
        >
          {[
            { icon: <FaShieldAlt />, text: "Secure Coverage" },
            { icon: <FaUsers />, text: "Trusted Clients" },
            { icon: <FaHeartbeat />, text: "Health Assurance" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              <span className="text-[#27445D] text-lg">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div
        data-aos="fade-left"
        className="md:w-1/2 mt-12 md:mt-0 flex flex-col items-center gap-7 z-10"
      >
        {/* Image Group */}
        <div
          data-aos="zoom-in"
          className="relative w-full max-w-3xl mx-auto flex justify-center items-center"
        >
          <img
            src={heroLeft}
            alt="Left"
            className="w-36 h-52 md:w-44 md:h-60 object-cover rounded-3xl shadow-2xl 
            opacity-85 hover:opacity-100 transition-all duration-500 
            -rotate-6 hover:-rotate-3 brightness-90 hover:brightness-105"
          />

          <div className="relative z-20 scale-110 hover:scale-115 transition-transform duration-500">
            <img
              src={heroMain}
              alt="Main"
              className="w-52 h-64 md:w-60 md:h-72 object-cover rounded-[2rem] 
              shadow-[0_10px_25px_rgba(0,0,0,0.25)] border-2 border-white 
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-500"
            />
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          <img
            src={heroRight}
            alt="Right"
            className="w-36 h-52 md:w-44 md:h-60 object-cover rounded-3xl shadow-2xl 
            opacity-85 hover:opacity-100 transition-all duration-500 
            rotate-6 hover:rotate-3 brightness-90 hover:brightness-105"
          />

          {/* Background Glow */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-green-400/20 -z-10"></div>
        </div>

        {/* Bottom Swiper */}
        <div
          data-aos="fade-up"
          className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            effect="fade"
            className="h-64"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-64">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xl md:text-2xl font-semibold tracking-wide bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    {slide.title}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
