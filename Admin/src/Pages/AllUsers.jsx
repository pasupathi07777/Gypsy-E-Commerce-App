import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllUsers = () => {
  // Dummy user data
  const users = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
    { id: 3, name: "Sam Wilson", email: "samwilson@example.com" },
    { id: 4, name: "Tom Harris", email: "tomharris@example.com" },
    { id: 5, name: "Nancy Green", email: "nancygreen@example.com" },
    { id: 6, name: "Lisa Brown", email: "lisabrown@example.com" },
  ];

  // Filter state
  const [filter, setFilter] = useState({ name: "", email: "" });

  // Handle Edit User (dummy function)
  const handleEdit = (id) => {
    alert(`Editing user with ID: ${id}`);
  };

  // Handle Delete User (dummy function)
  const handleDelete = (id) => {
    alert(`Deleting user with ID: ${id}`);
  };

  // Filter users based on input
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      user.email.toLowerCase().includes(filter.email.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            className="mt-1 p-2 border rounded-md"
            placeholder="Filter by name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Email</label>
          <input
            type="text"
            value={filter.email}
            onChange={(e) => setFilter({ ...filter, email: e.target.value })}
            className="mt-1 p-2 border rounded-md"
            placeholder="Filter by email"
          />
        </div>
      </div>

      {/* User List with 3 Columns Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around mt-4 space-x-4">
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(user.id)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <FaEdit size={20} />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
