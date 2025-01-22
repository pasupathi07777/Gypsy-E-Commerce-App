import React from "react";
import CustomLoader from "./CustomLoader";

const CustomBtn = ({ label, onClick, type = "button", className = "",loading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${className}`}
    >
   
      {loading ? <CustomLoader /> : label}
    </button>
  );
};

export default CustomBtn;
