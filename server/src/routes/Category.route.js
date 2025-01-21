import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { addCategory, deleteCategory, editCategory, getCategory } from "../controllers/category.controler.js";

const router = express.Router();

router.post("/add", protectRoute, addCategory)
router.get("/get", protectRoute, getCategory);
router.put("/update/:categoryId", protectRoute, editCategory);
router.delete("/delete/:categoryId", protectRoute, deleteCategory);

export default router;
