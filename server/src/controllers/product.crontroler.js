import product from "../models/product.model.js";
import { validateFields } from "../utils/functions.js";
import cloudinary from "../utils/cloudinary.js";

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
