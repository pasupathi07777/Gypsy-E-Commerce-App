import express from "express";
import {
  checkAuth,
  login,
  signup,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", signup);


export default router;
