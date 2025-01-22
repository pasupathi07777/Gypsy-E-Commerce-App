import product from "../models/product.model.js";
import { validateFields } from "../utils/functions.js";
import User from "../models/user.model.js";

// add product       
export const addCategory = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body, "Product upload request");
    const validationErrors = validateFields(req.body);
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: validationErrors,
      });
    }

    // Create a new product in the database
    const newProduct = await product.create({
      ...req.body,
      photos: uploadedPhotos,
    });

    if (!newProduct) {
      return res.status(500).json({
        success: false,
        error: {
          field: "database",
          message: "Failed to create the product in the database.",
        },
      });
    }

    // Find the user and update their myPrpduct array
    console.log(req.user._id, "userId");

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found.",
        },
      });
    }

    // Add the new product to the user's myPrpduct array
    user.myProducts.push(newProduct._id);
    await user.save();
    // Send success response
    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};
