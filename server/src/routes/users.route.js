import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteUser, getAllUsers } from "../controllers/users.controler.js";

const router = express.Router();

router.get("/get-users",protectRoute, getAllUsers);
router.delete("/delete-user",protectRoute, deleteUser);


export default router;
