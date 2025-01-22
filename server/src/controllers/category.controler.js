import product from "../models/product.model.js";
import { validateFields } from "../utils/functions.js";
import categoryModel from "../models/category.model.js";

// add product

export const getCategory = async (req, res) => {
  try {
    // Create a new product in the database
    const categories= await categoryModel.find()

    if (!categories) {
      return res.status(500).json({
        success: false,
        error: {
          field: "category",
          message: "category not found",
        },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      categories,
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


export const addCategory = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body, "Product upload request");
    const {name}=req.body


    const validationErrors = validateFields(req.body);
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: validationErrors,
      });
    }

    // Create a new product in the database
    const category = await categoryModel.create({category:name});

    if (!category) {
      return res.status(500).json({
        success: false,
        error: {
          field: "database",
          message: "Failed to create the category in the database.",
        },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      category,
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

export const editCategory = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body, "Product upload request");
    const {categoryId}=req.params


    const validationErrors = validateFields(req.body);
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: validationErrors,
      });
    }

    // Create a new product in the database
    const category = await categoryModel.findByIdAndUpdate(categoryId,req.body,{new:true});

    if (!category) {
      return res.status(500).json({
        success: false,
        error: {
          field: "database",
          message: "Failed to create the category in the database.",
        },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      category,
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

export const deleteCategory = async (req, res) => {
  try {

    const {categoryId}=req.params



    // Create a new product in the database
    const category = await categoryModel.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(500).json({
        success: false,
        error: {
          field: "database",
          message: "Failed to create the category in the database.",
        },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      category,
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
