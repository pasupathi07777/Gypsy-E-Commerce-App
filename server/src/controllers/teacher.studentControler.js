import User from "../models/user.model.js";
import { validateFields } from "../utils/functions.js";

export const getTecStu = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find({ _id: { $ne: userId } });

    if (!users) {
      return res.status(400).json({
        success: false,
        error: {
          field: "user",
          message: "user does not exist",
        },
      });
    }

    return res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);

    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};

export const TeacherUpdateStudentDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, username, password, phone, department, bio, regNumber,role } =
      req.body;
    console.log(userId, req.body);

    // Validate fields
    const validateError = validateFields({ email, username });
    if (validateError) {
      return res.status(400).json({
        success: false,
        error: validateError,
      });
    }

    // Find user (use findById or findOne)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User does not exist",
        },
      });
    }

    if (user.role === "student" && !regNumber) {
      return res.status(400).json({
        success: false,
        error: {
          field: "regNumber",
          message: "RegNumber is Required",
        },
      });
    }

    if (email) user.email = email;
    if (username) user.username = username;
    if (password) {
      user.password = password;
    }
    if (phone) user.phone = phone;
    if (department) user.department = department;
    if (bio) {
      user.bio = bio;
    }
    if (regNumber) {
      user.regNumber = regNumber;
    }
    if (role) {
      user.role = role;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};
export const TeacherDeleteStudent = async (req, res) => {
  try {
  
    
    const { userId } = req.params;
      console.log(userId);

    // Find and delete the user
    const user = await User.findByIdAndDelete(  userId );

    // If user is not found
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found",
        },
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};

