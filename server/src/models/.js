import mongoose from "mongoose";

const stafDataModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    currentPosition: {
      type: String,
      required: true,
      trim: true,
    },
    regNumber: {
      type: String,

      unique: true, // Ensure that the regNumber is unique
      trim: true,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("stafData", stafDataModel);

export default Staff;
