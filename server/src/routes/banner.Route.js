// routes/bannerRoutes.js
import express from "express";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/banner.controller.js";

const router = express.Router();

router.get("/get", getBanners);
router.post("/post", createBanner);
router.put("/update/:id", updateBanner);
router.delete("/delete/:id", deleteBanner);

export default router;
