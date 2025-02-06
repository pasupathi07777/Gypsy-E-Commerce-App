import express from "express";
import { getEcomDashboardStats } from "../controllers/count.controler.js";

const router = express.Router();

router.get("/dashboard-stats", getEcomDashboardStats);

export default router;
