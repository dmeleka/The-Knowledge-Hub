import express from "express";
import { addCourse, changeEmail, editBio, myCourses, myCoursesFilter } from "../controllers/instructorController.js";

const router = express.Router();

router.post('/addCourse', addCourse);
router.post('/changeEmail', changeEmail);
router.post('/editBio', editBio);
router.get('/myCourses', myCourses);
router.get('/filterCourses', myCoursesFilter);

export default router;