import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: [String],
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
