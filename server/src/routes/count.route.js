import express from "express";
import { getEcomDashboardStats } from "../controllers/count.controler.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard-stats",protectRoute, getEcomDashboardStats);

export default router;
