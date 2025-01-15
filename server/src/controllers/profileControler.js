import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { validateFields } from "../utils/functions.js";
import { generateOTP } from "../utils/generateOTP.js";
import nodemailer from "nodemailer";

// update profile
export const updateProfile = async (req, res) => {
  const { username, phone, department, bio, regNumber } = req.body.data;
  console.log(req.body);

  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "user",
          error: "user does not exist",
        },
      });
    }

    const validationErrors = validateFields({
      username,
      phone,
      department,
    });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors.map((error) => ({
          field: error.field,
          error: error.error,
        })),
      });
    }

    if (user.role === "student" && !regNumber) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "regNumber",
          message: "RegNumber Required",
        },
      });
    }

    const existingUsername = await User.findOne({
      username,
      _id: { $ne: req.user._id },
    });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "username",
          message: "username already exists",
        },
      });
    }

    const existingRegNumber = await User.findOne({
      regNumber,
      _id: { $ne: req.user._id },
    });

    if (existingRegNumber) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "RegNumber",
          message: "RegNumber already exists",
        },
      });
    }

    const existingPhoneNumer = await User.findOne({
      phone,
      _id: { $ne: req.user._id },
    });

    if (existingPhoneNumer) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "phone",
          message: "Phone Number already exists",
        },
      });
    }

    (user.username = username ?? user.username),
      (user.phone = phone ?? user.phone),
      (user.department = department ?? user.department),
      (user.bio = bio ?? user.bio),
      (user.regNumber = regNumber ?? user.regNumber),
      await user.save();

    return res.status(201).json({
      success: true,
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    return res.status(500).json({
      success: false,
      errors: {
        field: "other",
        error: "Internal Server Error",
      },
    });
  }
};

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

export const verifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  


  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          field: "user",
          message: "user does not exist",
        },
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: {
          field: "email",
          message: "email pic is required",
        },
      });
    }

    if (email === user.email) {
      return res.status(400).json({
        success: false,
        error: {
          field: "email",
          message: "New email must be different from the current email",
        },
      });
    }

    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for the next 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to your email.");

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.updatePendingData = email;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
      email: user.email,
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

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;


  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          field: "user",
          message: "user does not exist",
        },
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        error: {
          field: "otp",
          message: "Otp is required",
        },
      });
    }
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        error: { field: "otp", message: "No OTP found" },
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: { field: "otp", message: "Invalid OTP" },
      });
    }

    if (new Date(user.otpExpiry).getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        error: { field: "otp", message: "OTP has expired" },
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.email = user.updatePendingData
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};
