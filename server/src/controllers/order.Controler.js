import User from "../models/user.model.js";
import Order from "../models/order.model.js";


export const placeOrder = async (req, res) => {
  console.log("Cart Product Order");
  try {

    const { paymentMethod, deliveryType } = req.body;
    const user = await User.findById(req.user._id).populate("cart.productId");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let totalPrice = 0;
    let orderItems = [];

    for (const cartItem of user.cart) {
      const product = cartItem.productId;
      if (!product) continue;

      const itemPrice = cartItem.quantity * product.price;
      totalPrice += itemPrice;

      orderItems.push({
        productId: product._id,
        quantity: cartItem.quantity,
        price: product.price,
        img: product.img,
        name: product.name,
      });
    }

    const newOrder = new Order({
      userId: user._id,
      items: orderItems,
      totalPrice: totalPrice,
      orderStatus: "Pending",
      paymentStatus: "Pending",
      paymentMethod: req.body.paymentMethod || "Cash on Delivery",
      deliveryType: req.body.deliveryType || "Standard",
      address: user.address,
    });

    await newOrder.save();

    user.orders.push(newOrder._id);
    user.cart = [];
    await user.save();

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("items.productId", "_id img name")
      .lean();

    res.status(200).json({
      success: true,
      message: "Order placed successfully.",
      order: {
        _id: populatedOrder._id,
        items: populatedOrder.items.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          img: item.productId.img,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: populatedOrder.totalPrice,
        orderStatus: populatedOrder.orderStatus,
        deliveryType: populatedOrder.deliveryType,
        paymentStatus: populatedOrder.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "orders",
      populate: {
        path: "items.productId",
        select: "_id img name",
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.orders || user.orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found.",
        orders: [],
      });
    }

    const formattedOrders = user.orders.map((order) => ({
      _id: order._id,
      items: order.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        img: item.productId.img,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: order.totalPrice,
      orderStatus: order.orderStatus,
      deliveryType: order.deliveryType,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
    }));

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully.",
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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

// Update or Cancel Order
export const updateOrCancelOrder = async (req, res) => {
  try {
    const {
      orderId,
      userId,
      action,
      orderStatus,
      paymentStatus,
      trackingNumber,
      quantity,
      productId,
    } = req.body;


    if (!["update", "cancel"].includes(action)) {
      return res.status(400).json({
        success: false,
        error: "Invalid action. Must be 'update' or 'cancel'.",
      });
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }


    const globalOrder = await GlobalOrder.findById(orderId);
    if (!globalOrder) {
      return res.status(404).json({
        success: false,
        error: "Global Order not found",
      });
    }

    if (action === "update") {
      if (orderStatus) globalOrder.orderStatus = orderStatus;
      if (paymentStatus) globalOrder.paymentStatus = paymentStatus;
      if (trackingNumber) globalOrder.trackingNumber = trackingNumber;

      if (quantity && productId) {
        const itemToUpdate = globalOrder.items.find(
          (item) => item.productId.toString() === productId
        );
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }
      }

      await globalOrder.save();

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
      globalOrder.orderStatus = "canceled";
      globalOrder.paymentStatus = "canceled";

      await globalOrder.save();

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
