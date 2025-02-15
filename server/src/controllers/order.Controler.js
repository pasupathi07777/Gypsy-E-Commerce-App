import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// export const placeOrder = async (req, res) => {
//   console.log("Cart Product Order");
//   try {
//     const { paymentMethod, deliveryType } = req.body;
//     const user = await User.findById(req.user._id).populate("cart.productId");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     if (!user.cart || user.cart.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart is empty" });
//     }

//     let orders = [];

//     for (const cartItem of user.cart) {
//       const product = cartItem.productId;
//       if (!product) continue;

//       // Create a separate order for each product
//       const newOrder = new Order({
//         userId: user._id,
//         items: {
//           productId: product._id,
//           quantity: cartItem.quantity,
//           price: product.price,
//         },
//         totalPrice: cartItem.quantity * product.price,
//         orderStatus: "Placed",
//         paymentStatus: "Pending",
//         paymentMethod: paymentMethod || "Cash on Delivery",
//         deliveryType: deliveryType || "Standard",
//         address: user.address,
//       });

//       await newOrder.save();
//       user.orders.push(newOrder._id);
//       orders.push(newOrder);
//     }

//     // Empty the cart after order placement
//     user.cart = [];
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Orders placed successfully.",
//       orders,
//     });
//   } catch (error) {
//     console.error("Error placing orders:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


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

    let orders = [];

    for (const cartItem of user.cart) {
      const product = cartItem.productId;
      if (!product) continue;

      // Check if stock is sufficient
      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}. Available: ${product.stock}`,
        });
      }

      // Subtract stock
      product.stock -= cartItem.quantity;
      await product.save();

      // Create a separate order for each product
      const newOrder = new Order({
        userId: user._id,
        items: {
          productId: product._id,
          quantity: cartItem.quantity,
          price: product.price,
        },
        totalPrice: cartItem.quantity * product.price,
        orderStatus: "Placed",
        paymentStatus: "Pending",
        paymentMethod: paymentMethod || "Cash on Delivery",
        deliveryType: deliveryType || "Standard",
        address: user.address,
      });

      await newOrder.save();
      user.orders.push(newOrder._id);
      orders.push(newOrder);
    }

    // Empty the cart after order placement
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Orders placed successfully.",
      orders,
    });
  } catch (error) {
    console.error("Error placing orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "_id photos name")
      .sort({ createdAt: -1 }) // Sort by latest orders
      .lean();

    if (!userOrders || userOrders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found.",
        orders: [],
      });
    }

    const formattedOrders = userOrders.map((order) => ({
      _id: order._id,
      productId: order.items.productId?._id || null,
      name: order.items.productId?.name || "Product not found",
      photos: order.items.productId?.photos || "",
      quantity: order.items.quantity,
      price: order.items.price,
      totalAmount: order.totalPrice,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      deliveryType: order.deliveryType || "Standard",
      address: order.address,
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

// export const cancelUserOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const userId = req.user._id;
//     console.log(orderId, userId);

//     const order = await Order.findOne({ _id: orderId, userId });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found or does not belong to the user.",
//       });
//     }

//     if (order.orderStatus !== "Pending") {
//       return res.status(400).json({
//         success: false,
//         message: "Only pending orders can be canceled.",
//       });
//     }


//     order.orderStatus = "Cancelled";
//     await order.save();



//     res.status(200).json({
//       success: true,
//       cancelProduct: order,
//       message: "Order canceled successfully.",
//     });
//   } catch (error) {
//     console.error("Error canceling order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// export const placeDirectOrder = async (req, res) => {
//   try {
//     const { productId, quantity, paymentMethod, deliveryType } = req.body;

//     console.log(
//       "Placing Direct Order for Product:",
//       productId,
//       "Quantity:",
//       quantity
//     );

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     const orderQuantity = quantity > 0 ? quantity : 1; 
//     const totalPrice = orderQuantity * product.price;

//     // Create new order
//     const newOrder = new Order({
//       userId: user._id,
//       items: {
//         productId: product._id,
//         quantity: orderQuantity,
//         price: product.price,
//       },
//       totalPrice,
//       orderStatus: "Placed",
//       paymentStatus: "Pending",
//       paymentMethod: paymentMethod || "Cash on Delivery",
//       deliveryType: deliveryType || "Standard",
//       address: user.address,
//     });

//     await newOrder.save();
//     user.orders.push(newOrder._id);
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Order placed successfully.",
//       order: {
//         _id: newOrder._id,
//         productId: product._id,
//         name: product.name,
//         photos: product.photos,
//         quantity: orderQuantity,
//         price: product.price,
//         totalPrice,
//         orderStatus: newOrder.orderStatus,
//         paymentStatus: newOrder.paymentStatus,
//         paymentMethod: newOrder.paymentMethod,
//         deliveryType: newOrder.deliveryType,
//         address: newOrder.address,
//         createdAt: newOrder.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Error placing direct order:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


export const cancelUserOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;
    console.log(orderId, userId);

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or does not belong to the user.",
      });
    }

    if (order.orderStatus !== "Placed") {
      return res.status(400).json({
        success: false,
        message: "Only placed orders can be canceled.",
      });
    }

    // Restore stock
    const { productId, quantity } = order.items;
    const product = await Product.findById(productId);

    if (product) {
      product.stock += quantity;
      await product.save();
    }

    // Update order status
    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      cancelProduct: order,
      message: "Order canceled successfully. Stock has been updated.",
    });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const placeDirectOrder = async (req, res) => {
  try {
    const { productId, quantity, paymentMethod, deliveryType } = req.body;

    console.log(
      "Placing Direct Order for Product:",
      productId,
      "Quantity:",
      quantity
    );

    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const orderQuantity = quantity > 0 ? quantity : 1;

    // Check if stock is available
    if (product.stock < orderQuantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available.",
      });
    }

    const totalPrice = orderQuantity * product.price;

    // Deduct stock
    product.stock -= orderQuantity;
    await product.save();

    // Create new order
    const newOrder = new Order({
      userId: user._id,
      items: {
        productId: product._id,
        quantity: orderQuantity,
        price: product.price,
      },
      totalPrice,
      orderStatus: "Placed",
      paymentStatus: "Pending",
      paymentMethod: paymentMethod || "Cash on Delivery",
      deliveryType: deliveryType || "Standard",
      address: user.address,
    });

    await newOrder.save();
    user.orders.push(newOrder._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully.",
      order: {
        _id: newOrder._id,
        productId: product._id,
        name: product.name,
        photos: product.photos,
        quantity: orderQuantity,
        price: product.price,
        totalPrice,
        orderStatus: newOrder.orderStatus,
        paymentStatus: newOrder.paymentStatus,
        paymentMethod: newOrder.paymentMethod,
        deliveryType: newOrder.deliveryType,
        address: newOrder.address,
        createdAt: newOrder.createdAt,
      },
    });
  } catch (error) {
    console.error("Error placing direct order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
