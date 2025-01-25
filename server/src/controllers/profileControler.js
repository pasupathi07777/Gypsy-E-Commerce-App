import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { validateFields } from "../utils/functions.js";


// update profile photo
export const updateProfilePhoto = async (req, res) => {
  const { profilePic } = req.body;
  // const { userId } = req.params;
  console.log(req.body, "updateProfilePhoto");

  try {
    const user = await User.find({ _id: req.user._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "user",
          error: "user does not exist",
        },
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "user",
          error: "user does not exist",
        },
      });
    }

    if (!profilePic) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "profilePic",
          error: "Profile pic is required",
        },
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({
      success: false,
      errors: {
        field: "other",
        error: "Internal Server Error",
      },
    });
  }
};
