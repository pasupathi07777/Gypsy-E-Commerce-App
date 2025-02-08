import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteProduct, editProduct, getProducts, postProduct, updateStock } from "../controllers/product.crontroler.js";

const router = express.Router();

router.post("/add", protectRoute, postProduct);
router.get("/get", protectRoute, getProducts);
router.put("/update/:productId", protectRoute, editProduct);
router.delete("/delete/:productId", protectRoute, deleteProduct);
router.patch("/update-stock/:productId", protectRoute, updateStock);

export default router;
