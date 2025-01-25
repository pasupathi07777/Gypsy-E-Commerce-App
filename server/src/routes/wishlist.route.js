import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToWishlist, getWishlist, removeFromWishlist, wishlistToCart } from "../controllers/wishlist.controller.js";


const router = express.Router();

router.get("/get-wishlist", protectRoute, getWishlist);
router.post("/post-whislist", protectRoute, addToWishlist);
router.delete("/wishlist-delete/:productId", protectRoute, removeFromWishlist);
router.post("/wishlist-to-cart", protectRoute, wishlistToCart);


export default router;
