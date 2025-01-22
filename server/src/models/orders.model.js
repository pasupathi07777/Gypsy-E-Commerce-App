import mongoose from "mongoose";

// Define the Cart and Order Subschemas for the global order
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Store the price of the product at the time of the order
});


// Define the Global Order Schema
const globalOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who placed the order
    required: true,
  },
  items: [orderItemSchema], // Array of ordered items
  totalPrice: { 
    type: Number, 
    required: true, 
    min: 0 // Ensure total price is non-negative
  },
  orderStatus: {
    type: String,
    default: "Pending", // Initial status of the order
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Possible statuses
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  }, // Timestamp for when the order was created
  deliveryAddress: { 
    type: String, 
    required: true 
  }, // Address for delivery
  paymentMethod: { 
    type: String, 
    required: true 
  }, // E.g., 'Credit Card', 'PayPal', etc.
  paymentStatus: {
    type: String,
    default: "Unpaid", // Payment status for the order
    enum: ["Unpaid", "Paid"],
  },
  trackingNumber: { 
    type: String, 
    default: null 
  }, // Optionally store a tracking number if applicable
  estimatedDelivery: { 
    type: Date 
  }, // Estimated delivery date if applicable
});

const GlobalOrder = mongoose.model("GlobalOrder", globalOrderSchema);

export default GlobalOrder;
