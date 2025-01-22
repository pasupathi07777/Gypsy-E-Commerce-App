import User from "../models/User";
import Order from "../models/Order";
import Product from "../models/Product";

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, totalPrice } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          field: "cart",
          message: "Cart cannot be empty.",
        },
      });
    }

    // Check if the user has the required products in their cart
    const user = await User.findById(req.user._id).populate("cart.productId");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found.",
        },
      });
    }

    // Create the global order document
    const newOrder = new Order({
      userId: req.user._id,
      items: cartItems,
      totalPrice: totalPrice,
      orderStatus: "Pending", // Initial order status
    });

    // Save the global order to the Order collection
    await newOrder.save();

    // Add the order reference to the user's order array
    user.orders.push(newOrder._id);
    await user.save();

    // Clear the user's cart after order placement
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};

// Get orders by user
export const getUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("orders");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          field: "user",
          message: "User not found.",
        },
      });
    }

    res.status(200).json({
      success: true,
      orders: user.orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};

// Get all orders (admin view)
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: {
          field: "authorization",
          message: "You do not have permission to view all orders.",
        },
      });
    }

    const allOrders = await Order.find().populate("userId items.productId");

    res.status(200).json({
      success: true,
      orders: allOrders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      error: {
        field: "server",
        message: "Internal Server Error.",
      },
    });
  }
};



import GlobalOrder from "../models/GlobalOrder";
import User from "../models/User";

// Update or Cancel Order
export const updateOrCancelOrder = async (req, res) => {
  try {
    const { orderId, userId, action, orderStatus, paymentStatus, trackingNumber, quantity, productId } = req.body;

    // Validate action type (update or cancel)
    if (!["update", "cancel"].includes(action)) {
      return res.status(400).json({
        success: false,
        error: "Invalid action. Must be 'update' or 'cancel'.",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Find the global order by ID
    const globalOrder = await GlobalOrder.findById(orderId);
    if (!globalOrder) {
      return res.status(404).json({
        success: false,
        error: "Global Order not found",
      });
    }

    if (action === "update") {
      // Handle order update logic
      if (orderStatus) globalOrder.orderStatus = orderStatus;
      if (paymentStatus) globalOrder.paymentStatus = paymentStatus;
      if (trackingNumber) globalOrder.trackingNumber = trackingNumber;

      // If quantity is provided, update the quantity of the specific product in the order
      if (quantity && productId) {
        const itemToUpdate = globalOrder.items.find(item => item.productId.toString() === productId);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }
      }

      // Save the updated global order
      await globalOrder.save();

      // Update the user's reference to the order (if necessary)
      const orderIndex = user.orders.indexOf(orderId);
      if (orderIndex !== -1) {
        user.orders[orderIndex] = globalOrder._id;
        await user.save();
      }

      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        updatedOrder: globalOrder,
      });
    }

    if (action === "cancel") {
      // Handle order cancel logic
      globalOrder.orderStatus = "canceled";  // You can customize the status for cancellation
      globalOrder.paymentStatus = "canceled"; // Assuming payment is also canceled when order is canceled

      // Save the canceled global order
      await globalOrder.save();

      // Update the user's order reference with the canceled status
      const orderIndex = user.orders.indexOf(orderId);
      if (orderIndex !== -1) {
        user.orders[orderIndex] = globalOrder._id;
        await user.save();
      }

      return res.status(200).json({
        success: true,
        message: "Order canceled successfully",
        canceledOrder: globalOrder,
      });
    }
  } catch (err) {
    console.error("Error updating or canceling order:", err);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
