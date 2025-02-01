import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { placeOrder } from "../controllers/order.Controler.js";


const router = express.Router();

router.post("/place-cart-order", protectRoute, placeOrder);



export default router;
