import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";


export const getEcomDashboardStats = async (req, res) => {
  try {
console.log("count Status");

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });
    const processingOrders = await Order.countDocuments({
      orderStatus: "Processing",
    });
    const shippedOrders = await Order.countDocuments({
      orderStatus: "Shipped",
    });
    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });
    const cancelledOrders = await Order.countDocuments({
      orderStatus: "Cancelled",
    });

    const pendingPayments = await Order.countDocuments({
      paymentStatus: "Pending",
    });
    const successfulPayments = await Order.countDocuments({
      paymentStatus: "Paid",
    });
    const failedPayments = await Order.countDocuments({
      paymentStatus: "Failed",
    });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalEarnings = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    const totalStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } },
    ]);
    const availableStock = totalStock.length > 0 ? totalStock[0].total : 0;

    const outOfStockCount = await Product.countDocuments({
      stock: { $lte: 0 },
    });
    const outOfStockProducts = await Product.find({
      stock: { $lte: 0 },
    }).select("name category seller");

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalCategories,
        orderStatus: {
          pendingOrders,
          processingOrders,
          shippedOrders,
          deliveredOrders,
          cancelledOrders,
        },
        paymentStatus: {
          pendingPayments,
          successfulPayments,
          failedPayments,
        },
        totalEarnings,
        availableStock,
        outOfStockCount,
        outOfStockProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
