import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cart.Controler.js";

const router = express.Router();

router.get("/get", protectRoute, getCart); 
router.post("/add",protectRoute, addToCart); 
router.delete("/remove/:productId", protectRoute, removeFromCart); 
router.patch("/update", protectRoute, updateCartQuantity); 


export default router;
