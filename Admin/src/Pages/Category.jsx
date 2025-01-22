import React, { useEffect, useState } from "react";
import CustomTable from "../Components/CustomTable";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import {
  addCategory,
  categoryStates,
  getAllCategory,
  editCategory,
  deleteCategory,
} from "../Redux/Slices/category.Slice";
import { useDispatch, useSelector } from "react-redux";
import { showPopup } from "../Redux/Slices/confirmationSlice";
import icons from "../assets/icons";
import CustomIconButton from "../Components/CustomIconButton";


const Category = () => {
  const {
    categories,
    getCategoryLoading,
    postCategoryLoading,
    updateCategoryLoading,
    deleteCategoryLoading,
  } = useSelector(categoryStates);
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

  const onDelete = (id) => {
    dispatch(
      showPopup({
        message: "Are you sure you want to delete this category?",
        onConfirm: () => {
          dispatch(deleteCategory(id));
        },
      })
    );
  };

  const columns = [
    { header: "No", field: "index" },
    { header: "Category", field: "category" },
  ];

  const actions = (row) => (
    <>
      <CustomIconButton
        label={icons.edit}
        onClick={() => {
          setModalType("edit");
          setSelectedCategory(row);
          setCurrentCategory({ name: row.category });
          setShowModal(true);
        }}
        className="text-blue-500 hover:text-blue-700 transition"
      />
      <CustomIconButton
        label={icons.delete}
        onClick={() => onDelete(row._id)}
        className="text-red-500 hover:text-red-700 transition ml-2 bg-"
        loading={deleteCategoryLoading}
        color={"#FF0000"}
      />
    </>
  );


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Category Management
        </h1>
        <CustomBtn
          label="Add Category"
          onClick={() => {
            setModalType("add");
            setShowModal(true);
            setCurrentCategory({ name: "" });
          }}
          className="bg-blue-600 hover:bg-blue-700"
        />
      </div>

      <CustomTable
        data={categories}
        columns={columns}
        actions={(row) => actions(row)}
        loading={getCategoryLoading}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {modalType === "add" ? "Add Category" : "Edit Category"}
              </h3>
              <CustomInput
                label="Category Name"
                value={currentCategory.name}
                onChange={(value) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: value,
                  })
                }
                placeholder="Enter category name"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <CustomBtn
                  type="submit"
                  label={modalType === "add" ? "Add" : "Update"}
                  loading={
                    modalType === "add"
                      ? postCategoryLoading
                      : updateCategoryLoading
                  }
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

export default Category;
