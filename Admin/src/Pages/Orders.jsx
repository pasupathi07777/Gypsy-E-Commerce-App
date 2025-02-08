import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomTable from "../Components/CustomTable";
import CustomBtn from "../Components/CustomBtn";
import CustomSearchInput from "../Components/CustomSearchInput";
import { orderStates } from "../Redux/Slices/order.slice";
import CustomDateRangePicker from "../Components/CustomDateRangePicker";

const Orders = () => {
  const { allOrders } = useSelector(orderStates);

  const [searchQuery, setSearchQuery] = useState(""); // Search filter
  const [dateRange, setDateRange] = useState([null, null]); // Date Range filter

  // Function to check if the order date is within the selected date range
  const isWithinDateRange = (orderDate) => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) return true;

    const orderTimestamp = new Date(orderDate).getTime();
    const startTimestamp = new Date(dateRange[0]).getTime();
    const endTimestamp = new Date(dateRange[1]).getTime();

    return orderTimestamp >= startTimestamp && orderTimestamp <= endTimestamp;
  };

  // Filter orders based on search and date range
  const filteredOrders = allOrders?.filter((order) => {
    const matchesSearch =
      order.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch && isWithinDateRange(order.createdAt);
  });

  // Handle Edit
  const handleEdit = (id) => {
    alert(`Editing order with ID: ${id}`);
  };

  // Handle Delete
  const handleDelete = (id) => {
    alert(`Deleting order with ID: ${id}`);
  };

  // Table columns
  const columns = [
    { header: "No", field: "index" },
    { header: "Order ID", field: "_id" },
    { header: "Product ID", field: "productId" },
    { header: "Product", field: "name" },
    { header: "Price", field: "price" },
    { header: "Photos", field: "photos" },
    { header: "Order Date", field: "createdAt" },
    { header: "Status", field: "orderStatus" },
    { header: "Total Amount", field: "totalAmount" },
    { header: "Quantity", field: "quantity" },
    { header: "Delivery Type", field: "deliveryType" },
    { header: "Payment Method", field: "paymentMethod" },
    { header: "Payment Status", field: "paymentStatus" },

  ];

  // Actions column
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
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        {/* Search and Date Filter */}
        <div className=" flex gap-4 items-center">
          {/* Search Input */}
          <CustomSearchInput
            placeholder="Search by Order ID, Product ID, or Name"
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Date Range Filter */}
          <CustomDateRangePicker
            selectedRange={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>

      {/* Orders Table */}
      <CustomTable data={filteredOrders} columns={columns} actions={actions} />
    </div>
  );
};

export default Orders;
