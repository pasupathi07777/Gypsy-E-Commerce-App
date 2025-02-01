

import mongoose from "mongoose";
import cron from "node-cron";



const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});



const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});



const addressSchema = new mongoose.Schema({
  homeAddress: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },  
});



const userSchema = new mongoose.Schema({
  username: String,
  profilePic: String,
  email: { type: String, unique: true },
  otp: String,
  otpVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  cart: [cartItemSchema],
  wishlist: [wishlistItemSchema],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  myProducts: [],

  address: addressSchema,
});



const User = mongoose.model("User", userSchema);

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const expirationTime = new Date(now.getTime() - 600000);

    const unverifiedUsers = await User.find({
      otpVerified: false,
      createdAt: { $lt: expirationTime },
    });

    if (unverifiedUsers.length > 0) {
      for (let user of unverifiedUsers) {
        await User.deleteOne({ _id: user._id });
        console.log(`Deleted user with email: ${user.email} - OTP expired`);
      }
    }
  } catch (err) {
    console.error("Error checking unverified users:", err);
  }
});

export default User;
