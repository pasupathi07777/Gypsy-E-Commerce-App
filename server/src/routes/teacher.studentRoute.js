import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";

import { getTecStu, TeacherDeleteStudent, TeacherUpdateStudentDetails } from "../controllers/teacher.studentControler.js";
const router = express.Router();

router.get("/get-stu-tec/:userId", getTecStu);
router.patch("/teacher-update-student/:userId",TeacherUpdateStudentDetails);
router.delete("/teacher-delete-student/:userId", TeacherDeleteStudent);

export default router;
