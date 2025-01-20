import React from 'react'
import CustomInput from './CustomInput';
import CustomTextArea from './CustomTextArea';
import CustomDropdown from './CustomDropdown';

const AddProductPopup = ({
  editingProduct,
  newProduct,
  onChange,
  handleAddImage,
  handleChangeroupdown,
  handleRemoveImage,
  handleAddOrUpdateProduct,
  categories,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
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
              onChange={onChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <CustomInput
              label="Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={onChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <CustomInput
              label="Stock"
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={onChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Description</label>
            <CustomTextArea
              name="description"
              value={newProduct.description}
              onChange={onChange}
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
                    onClick={handleRemoveImage}
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
  );
};

export default AddProductPopup