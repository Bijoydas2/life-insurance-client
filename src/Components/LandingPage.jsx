import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShieldAlt, FaUsers, FaHeartbeat, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router"; // Link is usually imported from react-router-dom
import { ThemeContext } from "../Context/ThemeContext";

// Local assets
import heroMain from "../assets/banner/banner1.jpg";
import heroLeft from "../assets/banner/banner2.jpg";
import heroRight from "../assets/banner/banner3.jpg";

const LandingPage = () => {
  // Theme Context থেকে dark স্টেট ডিস্ট্রাকচার করা হলো
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  // মূল ব্র্যান্ড কালার
  const primaryColor = dark ? 'text-cyan-400' : 'text-[#27445D]'; // Dark mode primary accent: Cyan
  const darkBlue = '#27445D'; 

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

  const slides = [
    { src: "https://i.ibb.co.com/9HrkqM3V/pexels-karola-g-4021809.jpg", title: "Health Coverage" },
    { src: "https://i.ibb.co.com/tpGZYKt8/pexels-vika-glitter-392079-1648387-1.jpg", title: "Family Protection" },
    { src: "https://i.ibb.co.com/4nT22gJn/pexels-pixabay-163016.jpg", title: "Accident Insurance" },
    { src: "https://i.ibb.co.com/YBnbh3Kr/pexels-olly-3760067-1.jpg", title: "Life Assurance" },
    { src: "https://i.ibb.co.com/gpbP7Qn/pexels-kampus-8441861.jpg", title: "Emergency Support" },
    { src: "https://i.ibb.co.com/nNppZVMv/pexels-pixabay-164652.jpg", title: "Savings Plans" },
  ];

  return (
    <div className={`relative min-h-screen flex flex-col md:flex-row items-center justify-between 
                     px-8 md:px-12 py-10 overflow-hidden 
                     ${dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}> 
      
      {/* Background */}
      <div className="absolute inset-0">
        {/* Dynamic Background Gradient */}
        <div className={`absolute inset-0 
                         ${dark 
                           ? 'bg-gradient-to-r from-gray-900/90 to-gray-800/80' 
                           : 'bg-gradient-to-r from-primary/30 to-gray-50/80'}`} 
        />
        {/* Optional: Add a subtle texture/pattern for Dark Mode */}
        {dark && (
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>
        )}
      </div>

      {/* Left Section: Text Content */}
      <div
        data-aos="fade-right"
        className="md:w-1/2 text-center md:text-left space-y-6 z-10"
      >
        <h1 
          className="text-4xl md:text-5xl font-extrabold leading-tight"
          style={{ color: dark ? 'white' : darkBlue }} 
        >
          <span className={primaryColor}>LifeSecure</span> – Your <br />Partner in Protection
        </h1>

  <p 
  className={`text-lg md:text-xl max-w-md mx-auto md:mx-0 
              ${dark ? 'text-gray-300' : 'text-gray-700'}`} 
>
  <span className={`font-semibold ${primaryColor}`}>LifeSecure</span> — your trusted partner for smart, safe, and flexible life insurance protection.
</p>

        {/* Button */}
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row items-center md:items-start gap-4 md:gap-6"
        >
          <Link
            to="/learnMore"
       
            className={`btn px-6 py-3 rounded-lg transition duration-300 border-2 
                       ${dark 
                         ? 'bg-cyan-500 text-gray-900 border-cyan-500 hover:bg-gray-100 hover:text-cyan-600' 
                         : 'bg-primary text-white border-primary hover:bg-white hover:text-primary'}`
                       }
          >
            See More <FaArrowRight className="inline ml-2" />
          </Link>
        </div>

        {/* Features */}
        <div
          data-aos="zoom-in-up"
          className="flex justify-center md:justify-start gap-6 pt-6"
        >
          {[
            { icon: <FaShieldAlt />, text: "Secure Coverage" },
            { icon: <FaUsers />, text: "Trusted Clients" },
            { icon: <FaHeartbeat />, text: "Health Assurance" },
          ].map((item, i) => (
            <div
              key={i}
          
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300 
                         ${dark 
                           ? 'bg-gray-700/80 text-gray-200 border border-gray-600' 
                           : 'bg-white/70 backdrop-blur-md text-gray-700'}`
                         }
            >
              <span 
                className={`text-lg ${dark ? 'text-cyan-400' : 'text-[#27445D]'}`} // Icon color change
              >
                {item.icon}
              </span>
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
          {/* Hero Left Image */}
          <img
            src={heroLeft}
            alt="Left"
            className="w-36 h-52 md:w-44 md:h-60 object-cover rounded-3xl shadow-2xl 
                       opacity-85 hover:opacity-100 transition-all duration-500 
                       -rotate-6 hover:-rotate-3 brightness-90 hover:brightness-105 
                       border-2 border-transparent"
          />

          {/* Hero Main Image center*/}
          <div className="relative z-20 scale-110 hover:scale-115 transition-transform duration-500">
            <img
              src={heroMain}
              alt="Main"
              className={`w-52 h-64 md:w-60 md:h-72 object-cover rounded-[2rem] 
                         shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-all duration-500 
                         hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] 
                         ${dark ? 'border-2 border-gray-700' : 'border-2 border-white'}`} // Border color change
            />
          
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Hero Right Image */}
          <img
            src={heroRight}
            alt="Right"
            className="w-36 h-52 md:w-44 md:h-60 object-cover rounded-3xl shadow-2xl 
                       opacity-85 hover:opacity-100 transition-all duration-500 
                       rotate-6 hover:rotate-3 brightness-90 hover:brightness-105 
                       border-2 border-transparent"
          />

          
          <div className={`absolute inset-0 blur-3xl -z-10 
                           ${dark 
                             ? 'bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-teal-400/20' 
                             : 'bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-green-400/20'}`
                           }>
          </div>
        </div>

        {/* Bottom Swiper */}
        <div
          data-aos="fade-up"
          className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative 
                     ${dark ? 'border border-gray-700' : ''}`}
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
                  <h2 className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xl font-semibold tracking-wide px-4 py-2 rounded-full 
                      `} // 
                  >
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