import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStates, verifyOtp } from "../Redux/Slices/auth.Slice";
import img from "../assets/delivery.png";
const Otp = ({ navigation }) => {
  const { currentEmail, otpVerifyLoading } = useSelector(authStates);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    dispatch(verifyOtp({ otp: otpCode, email: currentEmail }))
      .unwrap()
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {

        console.log(err);
      });
  };

  const handleResend = () => {
    alert("OTP Resent: A new OTP has been sent to your email.");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 max-w-[400px]  m-auto">
      <img src={img} alt="Delivery" className="w-full max-w-xs h-auto mb-6" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Email Verification
      </h1>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter the verification code we sent to your email:
      </p>
      <p className="text-sm text-gray-800 font-medium mb-6">
        {currentEmail || "example******@gmail.com"}
      </p>

      <div className="flex space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(e.target.value, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-medium shadow focus:outline-none"
          />
        ))}
      </div>

      <button          
        onClick={handleVerify}
        disabled={otpVerifyLoading}
        className={`w-3/4 py-2 mb-3 bg-yellow-500 text-white  rounded-full font-semibold  ${
          otpVerifyLoading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-600"
        }`}
      >
        {otpVerifyLoading ? "Verifying..." : "Verify"}
      </button>

      <p className="text-sm text-gray-600">
        Didn't receive a code?{" "}
        <button
          onClick={handleResend}
          className="text-yellow-500 font-medium hover:underline"
        >
          Resend
        </button>
      </p>
    </div>
  );
};

export default Otp;
