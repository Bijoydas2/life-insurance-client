import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-600" />
    </div>
  );
};

export default Loading;
