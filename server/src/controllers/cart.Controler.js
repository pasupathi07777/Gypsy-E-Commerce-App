import User from "../models/user.model.js";
import Product from "../models/product.model.js";


export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart.productId",
      select: "name price photos",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found.",
        },
      });
    }

    // Calculate total cart price
    const totalCartPrice = user.cart.reduce((sum, item) => {
      return sum + item.quantity * item.productId.price;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully.",
      cart: user.cart.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        quantity: item.quantity,
        total: item.quantity * item.productId.price,
      })),
      totalCartPrice: totalCartPrice.toFixed(2), // Add total cart price
    });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};



export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          field: "quantity",
          message: "Quantity must be greater than 0 and productId is required.",
        },
      });
    }

    // Check if the product exists
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

    // Find the user
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
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    // Populate the cart with product details
    const populatedUser = await User.findById(req.user._id).populate({
      path: "cart.productId",
      select: "name price photos",
    });

    // Calculate total cart price
    const totalCartPrice = populatedUser.cart.reduce((sum, item) => {
      return sum + item.quantity * item.productId.price;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      cart: populatedUser.cart.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        quantity: item.quantity,
        total: item.quantity * item.productId.price,
      })),
      totalCartPrice: totalCartPrice.toFixed(2), // Add total cart price
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




export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: {
          field: "productId",
          message: "Product ID is required.",
        },
      });
    }

    // Find the user
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

    // Remove the product from the cart
    const updatedCart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    if (updatedCart.length === user.cart.length) {
      return res.status(404).json({
        success: false,
        error: {
          field: "product",
          message: "Product not found in cart.",
        },
      });
    }

    user.cart = updatedCart;
    await user.save();

    // Populate the cart with product details
    const populatedUser = await User.findById(req.user._id).populate({
      path: "cart.productId",
      select: "name price photos",
    });

    // Calculate total cart price
    const totalCartPrice = populatedUser.cart.reduce((sum, item) => {
      return sum + item.quantity * item.productId.price;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully.",
      cart: populatedUser.cart.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        quantity: item.quantity,
        total: item.quantity * item.productId.price,
      })),
      totalCartPrice: totalCartPrice.toFixed(2), // Add total cart price
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


export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    // Validate input
    if (!productId || !action) {
      return res.status(400).json({
        success: false,
        error: {
          field: "action",
          message: "Product ID and action (increment/decrement) are required.",
        },
      });
    }

    // Find the user
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

    // Find the product in the cart
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: {
          field: "product",
          message: "Product not found in cart.",
        },
      });
    }

    // Update the quantity based on the action
    if (action === "increment") {
      user.cart[productIndex].quantity += 1;
    } else if (action === "decrement") {
      user.cart[productIndex].quantity -= 1;

      if (user.cart[productIndex].quantity < 0) {
        user.cart[productIndex].quantity = 0;
      }
    } else {
      return res.status(400).json({
        success: false,
        error: {
          field: "action",
          message: "Invalid action. Use 'increment' or 'decrement'.",
        },
      });
    }

    await user.save();

    // Populate the cart with product details
    const populatedUser = await User.findById(req.user._id).populate({
      path: "cart.productId",
      select: "name price photos",
    });

    // Calculate total cart price
    const totalCartPrice = populatedUser.cart.reduce((sum, item) => {
      return sum + item.quantity * item.productId.price;
    }, 0);

    res.status(200).json({
      success: true,
      message: `Product quantity ${action}ed successfully.`,
      cart: populatedUser.cart.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        quantity: item.quantity,
        total: item.quantity * item.productId.price,
      })),
      totalCartPrice: totalCartPrice.toFixed(2), // Add total cart price
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};