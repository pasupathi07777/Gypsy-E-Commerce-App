import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    photos: {
      type: [String],
      default: [],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    seller: {
      type: String,
      required: true,
      trim: true,
    },
    returnPolicy: {
      type: Number,
      default: 0,
    },
    deliveryTime: {
      type: Number,
      default: 7,
    },
    warranty: {
      type: Number,
      default: 0,
    },
    deliveryOption: {
      type: String,
      enum: ["Cash on Delivery", "Online Payment"],
      default: "Cash on Delivery",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
