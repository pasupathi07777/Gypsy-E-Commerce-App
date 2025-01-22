import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
