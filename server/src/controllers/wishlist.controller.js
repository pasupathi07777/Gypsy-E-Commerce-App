import User from "../models/user.model.js";

// Get the user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "wishlist.productId",
      select: "name price photos stock", // Populate product details
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully.",
      wishlist: user.wishlist.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        addedAt: item.timestamp,
        stock: item.productId.stock,
      })),
    });
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Add a product to the wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the product is already in the wishlist
    const exists = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist.",
      });
    }

    // Add product to wishlist
    user.wishlist.push({ productId });
    await user.save();

    // Populate the wishlist with product details
    const populatedUser = await User.findById(req.user._id).populate({
      path: "wishlist.productId",
      select: "name price photos description category stock", // Add all necessary fields
    });

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully.",
      wishlist: populatedUser.wishlist.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        description: item.productId.description,
        category: item.productId.category,
        stock: item.productId.stock,
        addedAt: item.timestamp,
      })),
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const updatedWishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    if (updatedWishlist.length === user.wishlist.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist.",
      });
    }

    user.wishlist = updatedWishlist;
    await user.save();

    const populatedUser = await User.findById(req.user._id).populate({
      path: "wishlist.productId",
      select: "name price photos description category stock",
    });

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully.",
      wishlist: populatedUser.wishlist.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        description: item.productId.description,
        category: item.productId.category,
        stock: item.productId.stock,
        addedAt: item.timestamp,
      })),
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const wishlistToCart = async (req, res) => {
  try {
    const { wishlistIds } = req.body;
    console.log(wishlistIds);

    if (!wishlistIds || wishlistIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No wishlist items provided.",
      });
    }

    const user = await User.findById(req.user._id).populate("cart.productId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const addedProducts = [];
    for (const wishlistId of wishlistIds) {
      const productInCart = user.cart.find(
        (item) => item.productId._id.toString() === wishlistId
      );

      if (!productInCart) {
        const wishlistProduct = user.wishlist.find(
          (item) => item.productId._id.toString() === wishlistId
        );

        if (wishlistProduct) {
          user.cart.push({
            productId: wishlistProduct.productId,
            quantity: 1,
          });
          addedProducts.push(wishlistProduct.productId._id);
        }
      }
    }
    user.wishlist = [];

    await user.save();

    res.status(200).json({
      success: true,
      message: `${addedProducts.length} products added to cart.`,
      cart: user.cart.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos[0],
        description: item.productId.description,
        category: item.productId.category,
        stock: item.productId.stock,
        quantity: item.quantity,
        addedAt: item.timestamp,
        stock: item.productId.stock,
      })),
    });
  } catch (error) {
    console.error("Error adding products to cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};





export const moveWishlistItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const user = await User.findById(req.user._id).populate(
      "cart.productId wishlist.productId"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Find the product in the wishlist
    const wishlistProductIndex = user.wishlist.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    if (wishlistProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist.",
      });
    }

    // Check if product is already in the cart
    const productInCart = user.cart.find(
      (item) => item.productId._id.toString() === productId
    );

    if (!productInCart) {
      // Move product to cart
      const wishlistProduct = user.wishlist[wishlistProductIndex];
      user.cart.push({
        productId: wishlistProduct.productId,
        quantity: 1, // Default quantity
      });
    }

    // Remove product from wishlist
    user.wishlist.splice(wishlistProductIndex, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product moved to cart.",
      cart: user.cart.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos?.[0] || "default-image-url",
        description: item.productId.description,
        category: item.productId.category,
        stock: item.productId.stock,
        quantity: item.quantity,
        addedAt: item.timestamp,
      })),
      wishlist: user.wishlist.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        photo: item.productId.photos?.[0] || "default-image-url",
        description: item.productId.description,
        category: item.productId.category,
        stock: item.productId.stock,
      })),
    });
  } catch (error) {
    console.error("Error moving product from wishlist to cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
