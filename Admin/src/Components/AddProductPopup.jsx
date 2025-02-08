import React from "react";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import CustomDropdown from "./CustomDropdown";
import CustomBtn from "./CustomBtn";

const AddProductPopup = ({
  editingProduct,
  newProduct,
  onChange,
  handleAddImage,
  handleChangeroupdown,
  handleRemoveImage,
  handleAddOrUpdateProduct,
  categories,
  loading,
  cancel,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 p-3">
      <div className="bg-white p-6  shadow-lg max-w-full w-full md:w-[80%]  h-[80%] md:h-fit overflow-auto  ">
        <h2 className="text-2xl font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <CustomInput
              label="Product Name"
              type="text"
              name="name"
              value={newProduct.name}
              onChange={onChange}
              className="mt-1 p-2 border w-full"
            />
          </div>

          <div className="">
            <CustomInput
              label="seller"
              type="text"
              name="seller"
              value={newProduct.seller}
              onChange={onChange}
              className="mt-1 p-2 border  w-full"
            />
          </div>

          <div className="">
            <CustomInput
              label="Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={onChange}
              className="mt-1 p-2 border w-full"
            />
          </div>

          <div className="">
            <CustomInput
              label="Stock"
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={onChange}
              className="mt-1 p-2 border  w-full"
            />
          </div>

          <div className="">
            <label className="block text-sm">Description</label>
            <CustomTextArea
              name="description"
              value={newProduct.description}
              onChange={onChange}
              className="mt-1 p-2 border  w-full"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full">
            <CustomDropdown
              title="Select Category"
              items={categories}
              size="lg"
              name="category"
              value={newProduct.category}
              onChange={handleChangeroupdown}
            />
          </div>

          {/* Return Policy Dropdown */}
          <div className="w-full">
            <CustomDropdown
              title="Return Policy (Days)"
              const
              items={Array.from({ length: 30 }, (_, index) => index)}
              // size="lg"
              name="returnPolicy"
              value={newProduct.returnPolicy}
              onChange={handleChangeroupdown}
            />
          </div>

          {/* Warranty Years Dropdown */}
          <div className="w-full">
            <CustomDropdown
              title="Warranty (Years)"
              items={Array.from({ length: 5 }, (_, index) => index)}
              size="lg"
              name="warranty"
              value={newProduct.warranty}
              onChange={handleChangeroupdown}
            />
          </div>

          {/* Delivery Options Dropdown */}
          <div className="w-full">
            <CustomDropdown
              title="Delivery Option"
              items={["Cash On Delevery"]}
              size="lg"
              name="deliveryOption"
              value={newProduct.deliveryOption}
              onChange={handleChangeroupdown}
            />
          </div>

          {/* Photos */}
          <div className="mb-4">
            <label className="block text-sm">Photos (Max 5)</label>
            <input type="file" onChange={handleAddImage} className="mt-1 p-2" />
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
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2  ">
          <CustomBtn
            onClick={handleAddOrUpdateProduct}
            className="p-3 bg-green-500 hover:bg-green-600 text-white "
            label={editingProduct ? "Update Product" : "Add Product"}
            loading={loading}
          />
          <CustomBtn label={"Cancel"} onClick={cancel} />
        </div>  
      </div>
    </div>
  );
};

export default AddProductPopup;
