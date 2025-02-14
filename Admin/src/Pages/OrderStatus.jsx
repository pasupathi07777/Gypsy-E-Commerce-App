import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomTable from "../Components/CustomTable";
import { orderStates } from "../Redux/Slices/order.slice";

const OrderStatus = () => {
  const { name } = useParams();
  const { allOrders } = useSelector(orderStates);

  const filteredOrders = allOrders.filter((order) =>
    name === "Pending-Orders"
      ? order.orderStatus === "Pending"
      : name === "Cancelled-Orders"
      ? order.orderStatus === "Cancelled"
      : order.orderStatus === "Delivered"
  );

  // Table Columns
  const columns = [
    { header: "No", field: "index" },
    { header: "User ID", field: "userId" },
    { header: "Total Price", field: "totalPrice" },
    { header: "Order Status", field: "orderStatus" },
    { header: "Payment Status", field: "paymentStatus" },
    { header: "Payment Method", field: "paymentMethod" },
    { header: "Created At", field: "createdAt" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {name.replace("-", " ")}
      </h1>

      <CustomTable data={filteredOrders} columns={columns} />
      
    </div>
  );
};

export default OrderStatus;
