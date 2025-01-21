import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStates, loginUser } from "../Redux/Slices/auth.Slice";
import img from "../assets/delivery.png";

const Login = ({ navigation }) => {
  const { loginLoading } = useSelector(authStates);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    dispatch(loginUser(email))
      .unwrap()
      .then(() => {
        navigation("verify-otp");
      })
      .catch((err) => {
        console.error("Error logging in:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white min-h-screen w-full  m-auto ">
      <div className=" flex flex-col justify-center items-center max-w-[400px] ">
        {/* Image */}
        <img
          className="h-64 w-full object-cover bg-red-500 mb-"
          src={img}
          alt="Delivery"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-black mb-2 text-center">
          Login to your account
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please sign in to your account
        </p>

        {/* Email Input */}
        <label className="w-full text-sm text-black mb-2">Email Address</label>
        <input
          type="email"
          className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Sign In Button */}
        <button
          onClick={onSubmit}
          disabled={loginLoading}
          className={`w-4/5 h-12 bg-yellow-500 text-white font-bold rounded-full flex items-center justify-center mb- ${
            loginLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-yellow-600"
          }`}
        >
          {loginLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Login;
