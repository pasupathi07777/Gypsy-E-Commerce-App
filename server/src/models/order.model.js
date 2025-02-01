import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, 
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  }
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema], 
    totalPrice: {
      type: Number,
      required: true,
      min: 0, 
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending", 
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "UPI", "Net Banking", "Wallet"],
      required: true,
    },
    address: {
      homeAddress: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, 
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); 

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); 
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
