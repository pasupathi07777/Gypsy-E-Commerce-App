import React from "react";
import { Loader } from "rsuite";

const CustomLoader = ({ size = "sm", color }) => {
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
