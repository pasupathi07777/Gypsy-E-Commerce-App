import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";
import { useDispatch, useSelector } from "react-redux";
import { authStates, getUserAuth } from "./Redux/Slices/auth.Slice";
import Home from "./Pages/Home";
import DashLayout from "./Layout/DashLayout";
import AuthLayout from "./Layout/AuthLayout";
import Orders from "./Pages/Orders";
import AllUsers from "./Pages/AllUsers";
import Products from "./Pages/Products";

const App = () => {
  const { loginStatus } = useSelector(authStates); // Get login status from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAuth())
  }, [dispatch, navigate]);

  return (
    <div className="bg-[#F4F4F5]">
      <Routes>
        {loginStatus ? (
          <Route path="/" element={<DashLayout />}>
            <Route index element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-products" element={<Products />} />
          </Route>
        ) : (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="verify-otp" element={<Otp />} />
          </Route>
        )}
        <Route
          path="*"
          element={<Navigate to={loginStatus ? "/" : "/login"} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
