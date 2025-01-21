import React, { useState } from "react";
import CustomTable from "../Components/CustomTable";


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add', 'edit', or 'delete'
  const [currentCategory, setCurrentCategory] = useState({ name: "" });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      setCategories([...categories, currentCategory]);
    } else if (modalType === "edit" && selectedCategoryIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[selectedCategoryIndex] = currentCategory;
      setCategories(updatedCategories);
    } else if (modalType === "delete" && selectedCategoryIndex !== null) {
      const updatedCategories = categories.filter(
        (_, index) => index !== selectedCategoryIndex
      );
      setCategories(updatedCategories);
    }
    setShowModal(false);
    setCurrentCategory({ name: "" });
    setSelectedCategoryIndex(null);
  };

  // Define columns for CustomTable
  const columns = [
    { header: "No", field: "index", width: 50 },
    { header: "Category Name", field: "name" },
  ];

  // Define actions for CustomTable
  const actions = (row, rowIndex) => (
    <>
      <button
        onClick={() => {
          setModalType("edit");
          setSelectedCategoryIndex(rowIndex);
          setCurrentCategory(row);
          setShowModal(true);
        }}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        Edit
      </button>
      <button
        onClick={() => {
          setModalType("delete");
          setSelectedCategoryIndex(rowIndex);
          setShowModal(true);
        }}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Delete
      </button>
    </>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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

      {/* CustomTable Component */}
      <CustomTable
        data={categories}
        columns={columns}
        actions={(row) => actions(row, categories.indexOf(row))}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            {modalType === "delete" ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this category?
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedCategoryIndex(null);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
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
                      setSelectedCategoryIndex(null);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
