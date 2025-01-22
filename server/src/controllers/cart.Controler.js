import User from "../models/User";
import Product from "../models/Product";


// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Check if productId and quantity are provided
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          field: "quantity",
          message: "Quantity must be greater than 0 and productId is required.",
        },
      });
    }

    // Check if product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          field: "product",
          message: "Product not found.",
        },
      });
    }

    // Find the user and check if they already have the product in their cart
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found.",
        },
      });
    }

    // Check if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      // If the product is already in the cart, update the quantity
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      user.cart.push({ productId, quantity });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};


// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        error: {
          field: "productId",
          message: "Product ID is required.",
        },
      });
    }

    // Find the user and check if they have the product in their cart
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found.",
        },
      });
    }

    // Find the product in the user's cart and remove it
    const updatedCart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    // If no product was found in the cart
    if (updatedCart.length === user.cart.length) {
      return res.status(404).json({
        success: false,
        error: {
          field: "product",
          message: "Product not found in cart.",
        },
      });
    }

    // Update the cart in the user document
    user.cart = updatedCart;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};


