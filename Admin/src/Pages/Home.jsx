import React from "react";
import { FaUser, FaBox, FaShoppingCart } from "react-icons/fa";

const Home = () => {
  // Dummy data
  const userCount = 120;
  const productCount = 45;
  const orderCount = 230;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Count Card */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <FaUser size={30} className="mr-4 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Users</h3>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
        </div>

        {/* Product Count Card */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <FaBox size={30} className="mr-4 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <p className="text-2xl font-bold">{productCount}</p>
          </div>
        </div>

        {/* Order Count Card */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <FaShoppingCart size={30} className="mr-4 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-2xl font-bold">{orderCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
