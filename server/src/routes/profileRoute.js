import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  updateProfilePhoto,
} from "../controllers/profileControler.js"

const router = express.Router();

router.put("/update-photo", protectRoute, updateProfilePhoto);


export default router;
