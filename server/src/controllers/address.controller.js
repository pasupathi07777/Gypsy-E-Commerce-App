import User from "../models/user.model.js";

// Add a new address to the user's address list
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { homeAddress, email, mobile, pincode, state } = req.body;

    // Validate input
    if (!homeAddress || !email || !mobile || !pincode || !state) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Enter a valid 10-digit mobile number." });
    }
    if (!/^\d{6}$/.test(pincode)) {
      return res
        .status(400)
        .json({ message: "Enter a valid 6-digit pincode." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create the new address
    const newAddress = {
      homeAddress,
      email,
      mobile,
      pincode,
      state,
    };

    // Replace the user's address (store only one address)
    user.address = newAddress; // Replace the previous address with the new one
    await user.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Address added successfully",
        address: newAddress,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update an existing address by its ID
export const updateAddress = async (req, res) => {
  try {
      const userId = req.user._id;
    const { homeAddress, email, mobile, pincode, state } = req.body;
console.log(req.body);

    // Validate input
    if (!homeAddress || !email || !mobile || !pincode || !state) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Enter a valid 10-digit mobile number." });
    }
    if (!/^\d{6}$/.test(pincode)) {
      return res
        .status(400)
        .json({ message: "Enter a valid 6-digit pincode." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the address fields
    user.address = { homeAddress, email, mobile, pincode, state };
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Address updated successfully",
        address: user.address,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete an address from the user's addresses list
export const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and remove the address
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Clear the address field
    user.address = null; // Set the address field to null
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all addresses of a specific user
export const getAllAddresses = async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the user's addresses
    res.status(200).json({ success: true, address: user.address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
