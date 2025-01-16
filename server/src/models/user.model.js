import mongoose from "mongoose";
import cron from "node-cron";


// Define the Cart and Order Subschemas
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  otp: String,
  otpVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

  // Cart - Array of cart items
  cart: [cartItemSchema],

  // Orders - Array of order items
  orders: [orderItemSchema],
});

// Create a TTL index to automatically delete documents older than 10 minutes
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const User = mongoose.model("User", userSchema);

// Schedule a task to check for unverified users every minute
cron.schedule("* * * * *", async () => {
  try {
    // Find users who haven't verified OTP within 10 minutes
    const now = new Date();
    const expirationTime = new Date(now.getTime() - 600000); // 600000 ms = 10 minutes

    const unverifiedUsers = await User.find({
      otpVerified: false,
      createdAt: { $lt: expirationTime }, // Users who registered more than 10 minutes ago
    });

    if (unverifiedUsers.length > 0) {
      // Delete unverified users
      for (let user of unverifiedUsers) {
        await User.deleteOne({ _id: user._id });
        console.log(`Deleted user with email: ${user.email} - OTP expired`);
      }
    }
  } catch (err) {
    console.error("Error checking unverified users:", err);
  }
});

// Export your model as usual
export default User
