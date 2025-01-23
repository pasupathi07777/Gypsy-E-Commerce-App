import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToCart, getCart } from "../controllers/cart.Controler.js";

const router = express.Router();

router.get("/get", protectRoute, getCart);
router.post("/add",protectRoute, addToCart);


export default router;
