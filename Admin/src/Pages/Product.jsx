import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productStates } from "../Redux/Slices/product.Slice";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Product = () => {
  const { id } = useParams();
  const { products } = useSelector(productStates);

  const product = products.find((item) => item._id === id)
  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl">Product not found</div>
    );
  }


  const [mainImage, setMainImage] = useState(product.photos[0]);

  return (
    <div className="  min-h-screen p-6  shadow-lg rounded-lg overflow-x-hidden flex  flex-col gap-4 bg-[#F4F4F5] ">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 ">
        {capitalizeFirstLetter(product.name)}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-80 object-contain  transition-transform transform "
          />

          <div className="flex mt-4 justify-start  w-full ">
            {product.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-contain rounded  cursor-pointer transition-transform ${
                  mainImage === photo ? "border-blue-500 " : "border-gray-300 "
                }`}
                onClick={() => setMainImage(photo)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 space-y-3 text-gray-700 ">
          <p>
            <strong className="text-gray-900">Category:</strong>{" "}
            {capitalizeFirstLetter(product.category)}
          </p>
          <p>
            <strong className="text-gray-900">Seller:</strong>{" "}
            {capitalizeFirstLetter(product.seller)}
          </p>
          <p>
            <strong className="text-gray-900">Price:</strong>{" "}
            <span className="text-green-600 font-semibold">
              ₹{product.price}
            </span>
          </p>
          <p>
            <strong className="text-gray-900">Stock:</strong>{" "}
            {product.stock > 0 ? (
              <span className="text-green-500">In Stock ({product.stock})</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>
          <p>
            <strong className="text-gray-900">Discount:</strong>{" "}
            {product.discount}%
          </p>
          <p>
            <strong className="text-gray-900">Return Policy:</strong>{" "}
            {product.returnPolicy} Days
          </p>
          <p>
            <strong className="text-gray-900">Warranty:</strong>{" "}
            {product.warranty} Months
          </p>
          <p>
            <strong className="text-gray-900">Delivery Option:</strong>{" "}
            {capitalizeFirstLetter(product.deliveryOption)}
          </p>
          <p>
            <strong className="text-gray-900">Delivery Time:</strong>{" "}
            {product.deliveryTime} Days
          </p>
          <p className="text-gray-700 text-wrap">
            <strong className="text-gray-900">Description:</strong>{" "}
            {product.description.length > 100
              ? `${product.description}.`
              : product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
