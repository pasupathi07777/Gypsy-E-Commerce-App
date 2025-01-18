import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
