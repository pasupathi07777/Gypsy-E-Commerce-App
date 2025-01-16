import express from "express";
import {
  checkAuth,
  login,
  signup,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-OTP", verifyOTP);
router.post("/checkToken", protectRoute, checkAuth);

export default router;
