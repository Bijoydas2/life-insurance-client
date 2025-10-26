import React from "react";
import { motion } from "framer-motion";
import Logo from "../../public/logo.png";

const Loader = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center h-screen"
      style={{
     
        backgroundColor: "bg-gradient-to-b from-primary/5 to-gray-50",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        {/* Static Border */}
        <div className="absolute inset-0 rounded-full border-8 border-primary"></div>

        {/* Rotating Border */}
        <motion.div
          className="absolute inset-0 rounded-full border-8 border-transparent"
          style={{
            borderTopColor: "white",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Logo */}
        <div className="w-[160px] h-[160px] bg-primary rounded-full flex items-center justify-center shadow-lg">
          <img src={Logo} alt="Logo" className="w-[100px] h-[100px] object-contain p-3" />
        </div>
      </div>
    </div>
  );
};

export default Loader;