export const otpSenter = async (req, res) => {


  try {
  
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
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
      email: user.email,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
    });
  }
};
