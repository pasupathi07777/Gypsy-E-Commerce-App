import React, { useEffect, useState } from "react";
import CustomTable from "../Components/CustomTable";
import {
  addCategory,
  categoryStates,
  getAllCategory,
  editCategory,
  deleteCategory,
} from "../Redux/Slices/category.Slice";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const { categories } = useSelector(categoryStates);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentCategory, setCurrentCategory] = useState({ name: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "add") {
      dispatch(addCategory(currentCategory));
    } else if (modalType === "edit" && selectedCategory) {
      dispatch(
        editCategory({
          userId: selectedCategory._id,
          category: currentCategory,
        })
      );
    }

    setShowModal(false);
    setCurrentCategory({ name: "" });
    setSelectedCategory(null);
  };

  // Define columns for CustomTable
  const columns = [
    { header: "No", field: "index", width: 50 },
    { header: "Category", field: "category" },
  ];

  // Define actions for CustomTable
  const actions = (row) => (
    <>
      <button
        onClick={() => {
          setModalType("edit");
          setSelectedCategory(row);
          setCurrentCategory({ name: row.category });
          setShowModal(true);
        }}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        Edit
      </button>
      <button
        onClick={() => dispatch(deleteCategory(row._id))}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Delete
      </button>
    </>
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Category Management
        </h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              setModalType("add");
              setShowModal(true);
              setCurrentCategory({ name: "" });
            }}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* CustomTable Component */}
      <CustomTable
        data={categories}
        columns={columns}
        actions={(row) => actions(row)}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {modalType === "add" ? "Add Category" : "Edit Category"}
              </h3>
              <label className="block text-gray-700 font-semibold mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
                required
                className="w-full px-3 py-2 border rounded mb-4"
                placeholder="Enter category name"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {modalType === "add" ? "Add" : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
