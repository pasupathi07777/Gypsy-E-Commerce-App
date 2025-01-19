import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteUser, editUserRole, getAllUsers } from "../controllers/users.controler.js";

const router = express.Router();

router.get("/get-users",protectRoute, getAllUsers);
router.put("/edit-user-role/:userId",protectRoute, editUserRole);
router.delete("/delete-user/:userId",protectRoute, deleteUser);


export default router;
