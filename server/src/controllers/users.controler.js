import User from "../models/user.model.js";
import { validateFields } from "../utils/functions.js";

// signup

export const getAllUsers = async (req, res) => {
  try {
    console.log(req.user, "user pasu");

    const users = await User
      .find
      //   {
      //   _id: { $ne: req.user._id },
      // }
      ();
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
export const editUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;
    console.log(role);

    // Use findOne to retrieve a single user based on _id
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          field: "users",
          message: "User Not Found",
        },
      });
    }

    // Check if the role has changed before saving
    if (user.role !== role) {
      user.role = role;
      await user.save();
    }

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
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
    const { userId } = req.params;
    console.log(userId);

    const user = await User.findByIdAndDelete({
      _id: userId,
    });
    if (!user) {
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
      userId: user._id,
      message: "User Successfull Deleted",
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
