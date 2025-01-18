import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Products = () => {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Product A",
      price: 20,
      stock: 50,
      description: "A great product",
    },
    {
      id: 2,
      name: "Product B",
      price: 35,
      stock: 100,
      description: "Popular item",
    },
    {
      id: 3,
      name: "Product C",
      price: 15,
      stock: 30,
      description: "Best selling",
    },
    {
      id: 4,
      name: "Product D",
      price: 50,
      stock: 10,
      description: "Limited edition",
    },
    {
      id: 5,
      name: "Product E",
      price: 25,
      stock: 200,
      description: "Affordable choice",
    },
    {
      id: 6,
      name: "Product F",
      price: 40,
      stock: 70,
      description: "Top-rated product",
    },
  ];

  // Filter state
  const [filter, setFilter] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  // Filter products based on input
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      (filter.price ? product.price <= filter.price : true) &&
      (filter.stock ? product.stock >= filter.stock : true) &&
      product.description
        .toLowerCase()
        .includes(filter.description.toLowerCase())
    );
  });

  // Handle Edit Product (dummy function)
  const handleEdit = (id) => {
    alert(`Editing product with ID: ${id}`);
  };

  // Handle Delete Product (dummy function)
  const handleDelete = (id) => {
    alert(`Deleting product with ID: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            className="mt-1 p-2 border rounded-md"
            placeholder="Filter by name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Max Price</label>
          <input
            type="number"
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="mt-1 p-2 border rounded-md"
            placeholder="Filter by price"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Min Stock</label>
          <input
            type="number"
            value={filter.stock}
            onChange={(e) => setFilter({ ...filter, stock: e.target.value })}
            className="mt-1 p-2 border rounded-md"
            placeholder="Filter by stock"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Description</label>
          <input
            type="text"
            value={filter.description}
            onChange={(e) =>
              setFilter({ ...filter, description: e.target.value })
            }
            className="mt-1 p-2 border rounded-md"
            placeholder="Filter by description"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm text-gray-700">Price: ${product.price}</p>
              <p className="text-sm text-gray-700">Stock: {product.stock}</p>
            </div>

            {/* Action Buttons: Edit and Delete */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEdit(product.id)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <FaEdit size={20} />
              </button>

              <button
                onClick={() => handleDelete(product.id)}
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

export default Products;
