import React from 'react'
import CustomLoader from "./CustomLoader";

const CustomIconButton = ({ onClick, label, className, loading, color }) => {
  return (
    <button
      className={` ${className}  flex justify-center items-center`}
      onClick={onClick}
    >
      {loading ? <CustomLoader color={color} /> : label}
    </button>
  );
};

export default CustomIconButton