
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomTable from "../Components/CustomTable";
import CustomBtn from "../Components/CustomBtn";
import { orderStates } from "../Redux/Slices/order.slice";

const Orders = () => {
  const { allOrders } = useSelector(orderStates);
  const [filterDate, setFilterDate] = useState("");


  const filteredOrders = allOrders?.filter((order) =>
    order.createdAt.includes(filterDate)
  );


  const handleEdit = (id) => {
    alert(`Editing order with ID: ${id}`);
  };

  // Handle Delete
  const handleDelete = (id) => {
    alert(`Deleting order with ID: ${id}`);
  };

  const columns = [
    { header: "No", field: "index" },
    { header: "Order ID", field: "_id" },
    { header: "product ID", field: "productId" },
    { header: "Product", field: "name" },
    { header: "price", field: "price" },
    { header: "photos", field: "photos" },
    { header: "Date", field: "createdAt" },
    { header: "Status", field: "orderStatus" },
    { header: "Total Amount", field: "totalAmount" },
    { header: "quantity", field: "quantity" },
    { header: "deliveryType", field: "deliveryType" },
    { header: "paymentMethod", field: "paymentMethod" },
    { header: "paymentStatus", field: "paymentStatus" },
  ];


  const actions = (row) => (
    <div className="flex space-x-4">
      <button
        onClick={() => handleEdit(row._id)}
        className="text-blue-500 hover:text-blue-700 transition"
      >
        <FaEdit size={20} />
      </button>
      <button
        onClick={() => handleDelete(row._id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <FaTrashAlt size={20} />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <CustomBtn
          label="Add Order"
          className="bg-blue-600 hover:bg-blue-700"
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="ml-2 p-2 border rounded-md"
        />
      </div>

      <CustomTable
        data={filteredOrders}
        columns={columns}
        actions={(row) => actions(row)}
      />
    </div>
  );
};

export default Orders;
