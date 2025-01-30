import express from "express";
import { addAddress, updateAddress, deleteAddress, getAllAddresses } from "../controllers/address.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router(); 


router.post("/add",protectRoute, addAddress);   
router.put("/update", protectRoute, updateAddress);   
router.delete("/delete",protectRoute, deleteAddress);   
router.get("/get",protectRoute, getAllAddresses);   


export default router; 
 
 
 



