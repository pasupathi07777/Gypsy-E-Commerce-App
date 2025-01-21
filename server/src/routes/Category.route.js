import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { addCategory } from "../controllers/category.controler.js";

const router = express.Router();

router.post("/add", protectRoute, addCategory)
router.get("/get", protectRoute, addCategory);
router.put("/update/:categortId", protectRoute, addCategory);
router.delete("/delete/:categortId", protectRoute, addCategory);

export default router;
