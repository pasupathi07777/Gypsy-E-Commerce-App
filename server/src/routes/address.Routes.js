import express from "express";
import { addAddress, updateAddress, deleteAddress, getAllAddresses } from "../controllers/address.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

// Routes for address management
router.post("/add",protectRoute, addAddress);  // Add address
router.put("/:userId/address/:addressId",protectRoute, updateAddress);  // Update address
router.delete("/:userId/address/:addressId",protectRoute, deleteAddress);  // Delete address
router.get("/get",protectRoute, getAllAddresses);  // Get all addresses

export default router;
