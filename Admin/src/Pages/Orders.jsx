import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Orders = () => {
  // Dummy order data
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      product: "Laptop",
      date: "2025-01-10",
      status: "Shipped",
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Phone",
      date: "2025-01-12",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Sam Wilson",
      product: "Headphones",
      date: "2025-01-15",
      status: "Delivered",
    },
    {
      id: 4,
      customer: "Tom Harris",
      product: "Monitor",
      date: "2025-01-18",
      status: "Pending",
    },
    {
      id: 5,
      customer: "Nancy Green",
      product: "Keyboard",
      date: "2025-01-19",
      status: "Shipped",
    },
  ];

  // State to store filter value
  const [filterDate, setFilterDate] = useState("");

  // State to manage order edit/delete
  const handleEdit = (id) => {
    alert(`Editing order with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting order with ID: ${id}`);
  };

  // Filter orders based on the date
  const filteredOrders = orders.filter((order) => {
    return order.date.includes(filterDate);
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Date Filter */}
      <div className="mb-6">
        <label htmlFor="date" className="text-sm font-medium">
          Filter by Date:
        </label>
        <input
          type="date"
          id="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="ml-2 p-2 border rounded-md"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-4">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(order.id)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEdit size={20} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
