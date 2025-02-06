import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { cancelUserOrder, getAllOrders, getUserOrders, placeDirectOrder, placeOrder } from "../controllers/order.Controler.js";


const router = express.Router();

router.post("/place-cart-order", protectRoute, placeOrder);
router.get("/user-order", protectRoute, getUserOrders);
router.patch("/order-cancel/:orderId", protectRoute, cancelUserOrder);
router.post("/direct-order", protectRoute, placeDirectOrder);
router.get("/all-orders", protectRoute, getAllOrders);



export default router;
