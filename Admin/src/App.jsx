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
import { getAllUsers } from "./Redux/Slices/user.Slice";
import ConfirmationPopup from "./Components/ConfirmationPopup";
import Category from "./Pages/Category";
import { getAllCategory } from "./Redux/Slices/category.Slice";
import { getAllOrders } from "./Redux/Slices/order.slice";

const App = () => {
  const { loginStatus } = useSelector(authStates);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getUserAuth());
    dispatch(getAllCategory());
  }, [dispatch, navigation]);

  useEffect(() => {
    if (loginStatus) {
      dispatch(getAllUsers());
      dispatch(getAllOrders());
    }
  }, [dispatch, loginStatus]);

  return (
    <div className="bg-[#F4F4F5] whitespace-nowrap">
      <ConfirmationPopup />
      <Routes>
        {loginStatus ? (
          <Route path="/" element={<DashLayout />}>
            <Route index element={<Home navigation={navigation} />} />
            <Route path="orders" element={<Orders navigation={navigation} />} />
            <Route
              path="all-users"
              element={<AllUsers navigation={navigation} />}
            />
            <Route
              path="all-products"
              element={<Products navigation={navigation} />}
            />
            <Route
              path="all-category"
              element={<Category navigation={navigation} />}
            />
          </Route>
        ) : (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login navigation={navigation} />} />
            <Route
              path="verify-otp"
              element={<Otp navigation={navigation} />}
            />
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
