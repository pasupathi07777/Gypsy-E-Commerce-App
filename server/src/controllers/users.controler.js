import User from "../models/user.model.js";
import { validateFields } from "../utils/functions.js";


// signup

export const getAllUsers = async (req, res) => {
  try {
    console.log(req.user,"user pasu");
    
    const users = await User.find({
      _id: { $ne: req.user._id },
    });
    if (!users) {
      res.status(400).json({
        success: false,
        error: {
          field: "users",
          message: "Users Not Found",
        },
      });
    }

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {id}=req.params
    const users = await User.findByIdAndDelete({
      _id: id,
    });
    if (!users) {
      res.status(400).json({
        success: false,
        error: {
          field: "users",
          message: "Users Not Found",
        },
      });
    }

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};
