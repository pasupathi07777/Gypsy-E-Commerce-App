import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    regNumber: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    department: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      enum: ["student", "staff"],
    },
    otp: {
      type: String,
      default: "",
    },
    otpExpiry: {
      type: Date,
      default: Date.now(),
    },
    updatePendingData: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
