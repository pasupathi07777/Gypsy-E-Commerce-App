import express from "express";
import { addAddress, updateAddress, deleteAddress, getAllAddresses } from "../controllers/address.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

// Routes for address management
router.post("/add",protectRoute, addAddress);  // Add address
router.put("/update", protectRoute, updateAddress);  // Update address
router.delete("/delete",protectRoute, deleteAddress);  // Delete address
router.get("/get",protectRoute, getAllAddresses);  // Get all addresses

export default router;
