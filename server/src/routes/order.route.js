import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserOrders, placeOrder } from "../controllers/order.Controler.js";


const router = express.Router();

router.post("/place-cart-order", protectRoute, placeOrder);
router.get("/user-order", protectRoute, getUserOrders);



export default router;
