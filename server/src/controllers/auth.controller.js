import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import { validateFields } from "../utils/functions.js";
import nodemailer from "nodemailer";
const { EMAIL_USER, EMAIL_PASSWORD } = process.env; 

// signup

export const signup = async (req, res) => {
  console.log(req.body,"body");
  const { username, email } = req.body;

  try {
    const validationErrors = validateFields({
      username,
      email,
    });

    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: validationErrors,
      });
    }

    const existingUser1 = await User.findOne({
      email: email,
      otpVerified: false,
    });

    if (existingUser1) {
      return res.status(400).json({
        success: false,
        error: {
          field: "email",
          message: "Email already exists and is verified",
        },
      });
    }

    const existingUser = await User.findOne({
      email: email,
      otpVerified: true,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          field: "email",
          message: "Email already exists and is verified",
        },
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username:username,
      email,
      otp,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your OTP for email verification",
      text: `Hello ${username},\n\nYour OTP for email verification is: ${otp}\n\nPlease use this OTP to verify your email.\n\nBest regards,\nYour App Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          error: {
            field: "email",
            message: "Failed to send OTP to email",
          },
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(201).json({
          success: true,
          message: "User created, OTP sent to email for verification",
        });
      }
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




// login

export const login = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: email});

    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          field: "email",
          message: "Email Not Found",
        },
      });
    }

    // Check if the OTP is verified before proceeding
    // if (!user.otpVerified) {
    //   return res.status(400).json({
    //     success: false,
    //     error: {
    //       field: "otp",
    //       message: "Email not verified. Please verify your email first.",
    //     },
    //   });
    // }

    // Generate new OTP for login and send to email
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    // Update OTP in the database (without verifying it)
    user.otp = otp;
    await user.save();

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your OTP for login",
      text: `Hello ${user.username},\n\nYour OTP for login is: ${otp}\n\nPlease use this OTP to complete your login.\n\nBest regards,\nYour App Team`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          error: {
            field: "email",
            message: "Failed to send OTP to email",
          },
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({
          success: true,
          message: "OTP sent to your email for login verification",
        });
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};



// Combined OTP Verification for Signup and Login
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  

  try {
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          field: "email",
          message: "User not found",
        },
      });
    }

    // If OTP does not match
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: {
          field: "otp",
          message: "Invalid OTP",
        },
      });
    }

    // Case 1: User is verifying OTP for Signup
    if (!user.otpVerified) {
      user.otpVerified = true; // Mark as verified for Signup
      await user.save();

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully. You can now complete the signup.",
        user,
        token: generateToken(user._id),
      });
    }

    // Case 2: User is verifying OTP for Login
    if (user.otpVerified) {
      // Mark the user as logged in or generate a JWT token if required
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully. You are now logged in.",
        user,
        token: generateToken(user._id),
      });
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      error: {
        field: "other",
        message: "Internal Server Error",
      },
    });
  }
};



export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ succces: true, user: req.user });
  } catch (error) {
    res.status(500).json({ succces: false, error: "Internal server error" });
  }
};
