import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import CustomTable from "../Components/CustomTable";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import {
  addCategory,
  categoryStates,
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
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    image: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      dispatch(addCategory(currentCategory))
        .unwrap()
        .then(() => {
            setShowModal(false);
            setCurrentCategory({ name: "", image: "" });
            setSelectedCategory(null);
        })

    } else if (modalType === "edit" && selectedCategory) {
      dispatch(
        editCategory({
          userId: selectedCategory._id,
          category: currentCategory,
        })
      )
        .unwrap()
        .then(() => {
              setShowModal(false);
              setCurrentCategory({ name: "", image: "" });
              setSelectedCategory(null);
        })

    }


  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 10485760) {
          const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(file, options);

          const reader = new FileReader();
          reader.onloadend = () => {
            setCurrentCategory((prevCategory) => ({
              ...prevCategory,
              image: reader.result,
            }));
          };
          reader.readAsDataURL(compressedFile);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCurrentCategory((prevCategory) => ({
              ...prevCategory,
              image: reader.result,
            }));
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        alert("Image compression failed.");
        console.error("Error during compression:", error);
      }
    }
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
    { header: "image", field: "image" },
  ];

  const actions = (row) => (
    <>
      <CustomIconButton
        label={icons.edit}
        onClick={() => {
          setModalType("edit");
          setSelectedCategory(row);
          setCurrentCategory({ name: row.category, image: row.image || "" });
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
            setCurrentCategory({ name: "", image: "" });
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
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            {" "}
            {/* Add relative positioning */}
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


              <div className="mt-4">
                <label className="block  mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 p-1 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                />
                {currentCategory.image && (
                  <div className="relative mt-4">
                    <img
                      src={currentCategory.image}
                      alt="Uploaded"
                      className="w-24 h-24 object-cover border rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentCategory((prevCategory) => ({
                          ...prevCategory,
                          image: "",
                        }))
                      }
                      className="absolute top-1 left-[68px]  bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      title="Remove Image"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
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
