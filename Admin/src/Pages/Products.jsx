import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomTable from "../Components/CustomTable";
import AddProductPopup from "../Components/AddProductPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getProduct,
  productStates,
  updateProduct,
} from "../Redux/Slices/product.Slice";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { showPopup } from "../Redux/Slices/confirmationSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, postProductLoading, updateProductLoading } =
    useSelector(productStates);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showPopupProduct, setShowPopupProduct] = useState(false);
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
    dispatch(
      showPopup({
        message: "Are you sure you want to delete this user?",
        onConfirm: () => {
          dispatch(deleteProduct(id));
        },
      })
    );
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setEditingProduct(productToEdit);
    setNewProduct(productToEdit);
    setShowPopupProduct(true);
  };

  const handleAddOrUpdateProduct = () => {
    if (editingProduct) {
      dispatch(updateProduct(newProduct))
        .unwrap()
        .then(() => {
          setShowPopupProduct(false);
          setEditingProduct(null);
        });
    } else {
      dispatch(addProduct(newProduct))
        .unwrap()
        .then(() => {
          setShowPopupProduct(false);
        })
        .catch((err) => {
          console.error("Error logging in:", err);
        });
    }
  };

  const handleChange = (value, event) => {
    const name = event.target.name;
    console.log(name, value);

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleChangeroupdown = (name, value) => {
    console.log(name, value);
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddImage = async (e) => {
    if (newProduct.photos.length < 5) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 10485760) {
          try {
            const options = {
              maxSizeMB: 5,
              maxWidthOrHeight: 1024,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);

            const reader = new FileReader();
            reader.onloadend = () => {
              setNewProduct((prevProduct) => ({
                ...prevProduct,
                photos: [...prevProduct.photos, reader.result],
              }));
            };
            reader.readAsDataURL(compressedFile);
          } catch (error) {
            alert("Image compression failed.");
            console.error("Error during compression: ", error);
          }
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewProduct((prevProduct) => ({
              ...prevProduct,
              photos: [...prevProduct.photos, reader.result],
            }));
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      toast.error("You can upload a maximum of 5 images.");
    }
  };

  // Reset function
  const resetProduct = () => {
    setNewProduct({
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
  };


  const columns = [
    { field: "index", header: "No", width: 60 },
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
        onClick={() => handleEdit(row._id)}
        className="text-blue-500 hover:text-blue-700 transition"
      >
        <FaEdit size={20} />
      </button>
      <button
        onClick={() => handleDelete(row._id)}
        className="text-red-500 hover:text-red-700 transition ml-2"
      >
        <FaTrashAlt size={20} />
      </button>
    </>
  );

  const paginatedData = products.slice((page - 1) * limit, page * limit);

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

  const handleRemoveImage = (index) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      photos: prevProduct.photos.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <button
          onClick={() => {
            setShowPopupProduct(true);
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

      {showPopupProduct && (
        <AddProductPopup
          editingProduct={editingProduct}
          newProduct={newProduct}
          onChange={(value, event) => handleChange(value, event)}
          handleAddImage={handleAddImage}
          handleChangeroupdown={handleChangeroupdown}
          handleRemoveImage={handleRemoveImage}
          handleAddOrUpdateProduct={handleAddOrUpdateProduct}
          categories={categories}
          loading={postProductLoading || updateProductLoading}
          cancel={() => {
            setShowPopupProduct(false);
            setEditingProduct(null);
            resetProduct()
          }}
        />
      )}
    </div>
  );
};

export default Products;
