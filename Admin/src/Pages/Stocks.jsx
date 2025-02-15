import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { productStates, updateStock } from "../Redux/Slices/product.Slice";
import CustomTable from "../Components/CustomTable";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import CustomIconButton from "../Components/CustomIconButton";
import icons from "../assets/icons";

const Stocks = () => {
  const { name } = useParams();
  const { products, updateStockLoading } = useSelector(productStates);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentStock, setCurrentStock] = useState({ id: "", stock: 0 });

  const filteredProducts = products.filter((product) =>
    name === "Available-Stock" ? product.stock > 0 : product.stock === 0
  );

  // Table Columns
  const columns = [
    { header: "No", field: "index" },
    { header: "Product Name", field: "name" },
    { header: "Category", field: "category" },
    { header: "Price", field: "price" },
    { header: "Stock", field: "stock" },
    // { header: "Seller", field: "seller" },
  ];

  // Handle "Add Stock" action
  const handleAddStock = (product) => {
    setCurrentStock({ id: product._id, stock: product.stock });
    setShowModal(true);
  };

  // Table Actions (Edit Stock)
  const actions = (row) => (
    <CustomIconButton
    // loading={}
      label={icons.edit}
      onClick={() => handleAddStock(row)}
      className="text-blue-500 hover:text-blue-700 transition"
    />
  );

  // Handle Stock Update
  const handleStockSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStock({ id: currentStock.id, stock: currentStock.stock }))
      .unwrap()
      .then(() => {
       setShowModal(false);
      })

   
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {name.replace("-", " ")}
      </h1>

      <CustomTable
        data={filteredProducts}
        columns={columns}
        actions={(row) => actions(row)}
      />

      {/* Add Stock Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Update Stock</h3>
            <form onSubmit={handleStockSubmit}>
              <CustomInput
                // label="Stock Quantity" 
                type="number"
                value={currentStock.stock}
                onChange={(value) =>
                  setCurrentStock({ ...currentStock, stock: Number(value) })
                }
              />
              <div className="flex justify-end space-x-2 mt-4">
                <CustomBtn
                  type="submit"
                  label="Update"
                  loading={updateStockLoading}
                />
                <CustomBtn
                  label="Cancel"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
