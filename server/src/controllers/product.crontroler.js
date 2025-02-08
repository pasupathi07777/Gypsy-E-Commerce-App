import product from "../models/product.model.js";
import { validateFields } from "../utils/functions.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";


// add product
export const postProduct = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body, "Product upload request");

    // Validate input fields
    const validationErrors = validateFields(req.body);
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: validationErrors,
      });
    }

    // Extract fields from request body
    const { photos } = req.body;

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          field: "photos",
          message: "Product photos are required.",
        },
      });
    }

    // Upload photos to Cloudinary
    const uploadedPhotos = [];
    for (const photo of photos) {
      const uploadResponse = await cloudinary.uploader.upload(photo, {
        folder: "products", // Create a specific folder in Cloudinary
      });
      uploadedPhotos.push(uploadResponse.secure_url);
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


export const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    if (!products) {
      res.status(400).json({
        success: false,
        error: {
          field: "products",
          message: "products Not Found",
        },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      products,
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
export const editProduct = async (req, res) => {
  try {
    // Validate input fields
    const validationErrors = validateFields(req.body);
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: validationErrors,
      });
    }

    console.log(req.params.productId, "Product edit request");

    const { productId } = req.params;

    // Validate photos if present in the request body
    if (req.body.photos) {
      const { photos } = req.body;

      if (!Array.isArray(photos) || photos.length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            field: "photos",
            message: "Product photos must be a non-empty array.",
          },
        });
      }

      // Upload updated photos to Cloudinary
      const uploadedPhotos = [];
      for (const photo of photos) {
        const uploadResponse = await cloudinary.uploader.upload(photo, {
          folder: "products",
        });
        uploadedPhotos.push(uploadResponse.secure_url);
      }

      // Update photos in the request body
      req.body.photos = uploadedPhotos;
    }

    // Update the product in the database
    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: {
          field: "product",
          message: "Product not found.",
        },
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId, "Product delete request");

    const deleteProduct = await product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      res.status(400).json({
        success: false,
        error: {
          field: "products",
          message: "products Not Found",
        },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      product: deleteProduct,
      message: "Product deleted successfully",
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



export const updateStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;

    console.log(
      `Updating stock for Product ID: ${productId}, New Stock: ${stock}`
    );

    // Find and update the product
    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      { stock },
      { new: true } // Return updated product
    );

    if (!updatedProduct) {
      return res.status(400).json({
        success: false,
        error: {
          field: "product",
          message: "Product Not Found",
        },
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Stock updated successfully",
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};
