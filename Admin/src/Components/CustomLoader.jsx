import React from "react";
import { Loader } from "rsuite";

const CustomLoader = ({ size = "sm", color = "#4A90E2" }) => {
  return (
    <div className="flex justify-center items-center w-full ">
      <Loader
        size={size}
        style={{
          borderTopColor: color,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
    </div>
  );
};

export default CustomLoader;
