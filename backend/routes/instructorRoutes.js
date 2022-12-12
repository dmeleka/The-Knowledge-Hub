import express from "express";
import { addCourse, changeEmail, editBio, myCourses, myCoursesFilter, addVideoLink, addPreviewLink, addQuestion, addDiscount } from "../controllers/instructorController.js";

const router = express.Router();

router.post('/addCourse', addCourse);
router.post('/changeEmail', changeEmail);
router.post('/editBio', editBio);
router.get('/myCourses', myCourses);
router.get('/filterCourses', myCoursesFilter);
router.post('/addVideoLink', addVideoLink);
router.post('/addPreviewLink', addPreviewLink);
router.post('/addQuestion', addQuestion);
router.post('/addDiscount', addDiscount)

export default router;