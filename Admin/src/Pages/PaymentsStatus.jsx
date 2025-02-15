import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomTable from "../Components/CustomTable";
import { orderStates } from "../Redux/Slices/order.slice";
import { formatDate, formatTime } from "../utils/Date.Time";

const PaymentsStatus = () => {
  const { name } = useParams();
  const { allOrders } = useSelector(orderStates);
  console.log(allOrders);

  const filteredOrders = allOrders.filter((order) =>
    name === "Pending-Payments"
      ? order.paymentStatus === "Pending" && order.orderStatus !== "Cancelled"
      : order.paymentStatus === "Paid" && order.orderStatus !== "Cancelled"
  );

  // Table Columns
  const columns = [
    { header: "No", field: "index" },
    { header: "User ID", field: "_id" },
    { header: "Product Price", field: "price" },
    { header: "Total Price", field: "totalAmount" },
    { header: "Quantity", field: "quantity" },
    { header: "Order Status", field: "orderStatus" },
    { header: "Payment Status", field: "paymentStatus" },
    { header: "Payment Method", field: "paymentMethod" },
    {
      header: "Order At",
      render: (order) => <span>{formatDate(order.createdAt)}</span>,
    },
    {
      header: "Order Time",
      render: (user) => <span>{formatTime(user.createdAt)}</span>,
    },
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

export default PaymentsStatus;
