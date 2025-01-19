import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomInput from "../Components/CustomInput";
import CustomTextArea from "../Components/CustomTextArea";
import CustomDropdown from "../Components/CustomDropdown";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      price: 20,
      stock: 50,
      description: "A great product",
      oldPrice: 25,
      photos: ["photoA.jpg"],
      discount: 0,
      category: "Electronics",
      seller: "TechStore",
      returnPolicy: 30,
      deliveryTime: 5,
      warranty: 1,
      deliveryOption: "Cash on Delivery",
    },
    {
      id: 2,
      name: "Product B",
      price: 35,
      stock: 100,
      description: "Popular item",
      oldPrice: 40,
      photos: ["photoB.jpg"],
      discount: 12.5,
      category: "Fashion",
      seller: "ShopNow",
      returnPolicy: 10,
      deliveryTime: 3,
      warranty: 2,
      deliveryOption: "Cash on Delivery",
    },
  ]);

  const [filter, setFilter] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    photos: [],
    category: "Electronics",
    seller: "",
    returnPolicy: 30,
    deliveryTime: 5,
    warranty: 1,
    deliveryOption: "Cash on Delivery",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Groceries",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Baby & Kids",
    "Sports & Outdoors",
    "Books",
    "Footwear",
    "Computers & Accessories",
  ];



  const handleChange = (value, event) => {
    const name = event.target.name;
    console.log(name, value);

    setNewProduct({
      ...newProduct,
      [name]: value, // Use the value from the Input component
    });
  };

  const handleChangeroupdown = (name, value) => {
    console.log(name, value); // Log the name and selected value
    setNewProduct({
      ...newProduct,
      [name]: value, // Update the state based on the selected value
    });
  };



  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditingProduct(productToEdit);
    setNewProduct(productToEdit);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert(`Product with ID ${id} deleted`);
  };

  const handleAddOrUpdateProduct = () => {
    const newId = editingProduct ? editingProduct.id : products.length + 1;
    const newProductData = {
      ...newProduct,
      id: newId,
      discount: calculateDiscount(newProduct.oldPrice, newProduct.price),
    };

    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? newProductData : product
        )
      );
    } else {
      setProducts([...products, newProductData]);
    }
    setShowPopup(false);
    setEditingProduct(null);
  };

  const calculateDiscount = (oldPrice, currentPrice) => {
    if (oldPrice && currentPrice) {
      return ((oldPrice - currentPrice) / oldPrice) * 100;
    }
    return 0;
  };

  const handleRemoveImage = (img) => {
    setNewProduct({
      ...newProduct,
      photos: newProduct.photos.filter((image) => image !== img),
    });
  };

  const handleAddImage = (e) => {
    if (newProduct.photos.length < 5) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct({
            ...newProduct,
            photos: [...newProduct.photos, reader.result],
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert("You can upload a maximum of 5 images.");
    }
  };

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Add Product Button */}
      <button
        onClick={() => {
          setShowPopup(true);
          setEditingProduct(null);
        }}
        className="mb-6 p-3 bg-green-500 text-white rounded-md"
      >
        Add Product
      </button>

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
              <p className="text-sm text-gray-700">
                Discount: {product.discount}%
              </p>
              <p className="text-sm text-gray-700">
                Return Policy: {product.returnPolicy} days
              </p>
              <p className="text-sm text-gray-700">
                Delivery Time: {product.deliveryTime} days
              </p>
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

      {/* Add or Edit Product Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-full w-full md:w-96 overflow-auto h-[95%] ">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Product Form Fields */}
              <div className="mb-4">
                <CustomInput
                  label="Product Name"
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={(value, event) => handleChange(value, event)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <CustomInput
                  label="Price"
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={(value, event) => handleChange(value, event)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <CustomInput
                  label="Stock"
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={(value, event) => handleChange(value, event)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm">Description</label>
                <CustomTextArea
                  name="description"
                  value={newProduct.description}
                  onChange={(value, event) => handleChange(value, event)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>


<div className="w-full bg-gray-500">
  
<CustomDropdown
                title="Select Category"
                items={categories}
                size="lg"
                name="category"
                value={newProduct.category}
                onChange={handleChangeroupdown} // Pass handleChange to update the state
              />
</div>


              {/* Photos */}
              <div className="mb-4">
                <label className="block text-sm">Photos (Max 5)</label>
                <input
                  type="file"
                  onChange={handleAddImage}
                  className="mt-1 p-2"
                />
                <div className="mt-2 flex flex-wrap">
                  {newProduct.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 bg-gray-300 rounded-md mr-2 mb-2"
                    >
                      <img
                        src={photo}
                        alt={`Product ${index}`}
                        className="object-cover w-full h-full rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(photo)}
                        className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddOrUpdateProduct}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

