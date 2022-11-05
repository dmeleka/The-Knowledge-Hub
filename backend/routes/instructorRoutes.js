import express from "express";
import { addCourse, myCourses, myCoursesFilter } from "../controllers/instructorController.js";

const router = express.Router();

router.post('/addCourse', addCourse);
router.get('/myCourses', myCourses);
router.get('/filterCourses', myCoursesFilter);

export default router;