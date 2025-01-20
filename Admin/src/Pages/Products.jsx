import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomTable from "../Components/CustomTable";
import AddProductPopup from "../Components/AddProductPopup";
import { useDispatch } from "react-redux";

const Products = () => {
    const dispatch = useDispatch();
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

  const [editingProduct, setEditingProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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

  const [limit, setLimit] = useState(120);
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert(`Product with ID ${id} deleted`);
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditingProduct(productToEdit);
    setNewProduct(productToEdit);
    setShowPopup(true);
  };

  const handleAddOrUpdateProduct = () => {
    const newId = editingProduct ? editingProduct.id : products.length + 1;
    const updatedProduct = { ...newProduct, id: newId };

    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? updatedProduct : product
        )
      );
    } else {
      setProducts([...products, updatedProduct]);
    }
    setShowPopup(false);
    setEditingProduct(null);
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

  const columns = [
    { field: "id", header: "ID", width: 60 },
    { field: "name", header: "Name", width: 200 },
    { field: "price", header: "Price ($)", width: 100 },
    { field: "stock", header: "Stock", width: 80 },
    { field: "category", header: "Category", width: 150 },
    { field: "seller", header: "seller", width: 150 },
    { field: "returnPolicy", header: "returnPolicy", width: 150 },
    { field: "deliveryTime", header: "deliveryTime", width: 150 },
    { field: "warranty", header: "warranty", width: 150 },
    { field: "deliveryOption", header: "deliveryOption", width: 150 },
    { field: "photos", header: "photos", width: 500 },
    { field: "description", header: "Description", width: 300 },
  ];



  const actions = (row) => (
    <>
      <button
        onClick={() => handleEdit(row.id)}
        className="text-blue-500 hover:text-blue-700 transition"
      >
        <FaEdit size={20} />
      </button>
      <button
        onClick={() => handleDelete(row.id)}
        className="text-red-500 hover:text-red-700 transition ml-2"
      >
        <FaTrashAlt size={20} />
      </button>
    </>
  );

  const paginatedData = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );


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

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <button
          onClick={() => {
            setShowPopup(true);
            setEditingProduct(null);
          }}
          className="mb-6 p-3 bg-green-500 text-white rounded-md"
        >
          Add Product
        </button>
      </div>

      <CustomTable
        data={paginatedData}
        columns={columns}
        actions={actions}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />

      {showPopup && (
        <AddProductPopup
          editingProduct={editingProduct}
          newProduct={newProduct}
          onChange={(value, event) => handleChange(value, event)}
          handleAddImage={handleAddImage}
          handleChangeroupdown={handleChangeroupdown}
          handleRemoveImage={() => handleRemoveImage(photo)}
          handleAddOrUpdateProduct={handleAddOrUpdateProduct}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Products;
