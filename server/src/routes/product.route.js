import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getProducts, postProduct } from "../controllers/product.crontroler.js";

const router = express.Router();

router.post("/add", protectRoute, postProduct);
router.get("/get", protectRoute, getProducts);

export default router;
