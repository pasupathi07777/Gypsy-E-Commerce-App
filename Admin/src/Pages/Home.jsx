import React, { useEffect } from "react";
import {
  FaUser,
  FaBox,
  FaShoppingCart,
  FaDollarSign,
  FaExclamationTriangle,
  FaList,
} from "react-icons/fa";
import { getAllDataCounts, orderStates } from "../Redux/Slices/count.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const { count } = useSelector(orderStates);
  console.log(count);

  useEffect(() => {
    dispatch(getAllDataCounts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          icon={<FaUser size={30} className="text-blue-500" />}
          title="Users"
          value={count?.totalUsers || 0}
          path={"all-users"}
        />

        {/* Products Count */}
        <Card
          icon={<FaBox size={30} className="text-green-500" />}
          title="Products"
          value={count?.totalProducts || 0}
          path={"all-products"}
        />

        {/* Total Orders */}
        <Card
          icon={<FaShoppingCart size={30} className="text-red-500" />}
          title="Orders"
          value={count?.totalOrders || 0}
          path={"Orders"}
        />

        {/* Available Stock */}
        <Card
          icon={<FaBox size={30} className="text-purple-500" />}
          title="Available Stock"
          value={count?.availableStock || 0}
          path={"Stocks/Available-Stock"}
        />

        {/* Out of Stock Products */}
        <Card
          icon={<FaExclamationTriangle size={30} className="text-yellow-500" />}
          title="Out of Stock"
          value={count?.outOfStockCount || 0}
          path={"Stocks/Out-of-Stock"}
        />

        {/* Total Categories */}
        <Card
          icon={<FaList size={30} className="text-orange-500" />}
          title="Categories"
          value={count?.totalCategories || 0}
          path={"all-category"}
        />

        {/* Earnings */}
        <Card
          icon={<FaDollarSign size={30} className="text-green-600" />}
          title="Total Earnings"
          value={`₹${count?.totalEarnings || 0}`}
        />

        {/* Order Status */}
        <Card
          icon={<FaShoppingCart size={30} className="text-blue-600" />}
          title="Pending Orders"
          value={count?.orderStatus?.pendingOrders || 0}
          path={"Dynamic/Pending-Orders"}
        />
        <Card
          icon={<FaShoppingCart size={30} className="text-yellow-600" />}
          title="Cancelled Orders"
          value={count?.orderStatus?.cancelledOrders || 0}
          path={"Dynamic/Cancelled-Orders"}
        />
        <Card
          icon={<FaShoppingCart size={30} className="text-green-600" />}
          title="Delivered Orders"
          value={count?.orderStatus?.deliveredOrders || 0}
          path={"Dynamic/Delivered Orders"}
        />

        {/* Payment Status */}
        <Card
          icon={<FaDollarSign size={30} className="text-yellow-600" />}
          title="Pending Payments"
          value={count?.paymentStatus?.pendingPayments || 0}
          path={"Dynamic/Pending-Payments"}
        />
        <Card
          icon={<FaDollarSign size={30} className="text-green-600" />}
          title="Successful Payments"
          value={count?.paymentStatus?.successfulPayments || 0}
          path={"Dynamic/Successful-Payments"}
        />
      </div>
    </div>
  );
};

const Card = ({ icon, title, value,path }) => {
    const navigate = useNavigate();
  return (
    <div
      className="flex items-center p-6 bg-white  shadow-lg hover:shadow-xl transition"
      onClick={() => navigate(path)}
    >
      {icon}
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Home;
