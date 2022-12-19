import express from "express";
import { addCourse, changeEmail, editBio, myCourses, myCoursesFilter, addVideoLink, addPreviewLink, addQuestion, addDiscount, getRating, getCourseRating, searchMyCourses } from "../controllers/instructorController.js";

const router = express.Router();

router.post('/addCourse', addCourse);
router.post('/changeEmail', changeEmail);
router.post('/editBio', editBio);
router.get('/myCourses', myCourses);
router.get('/getRating', getRating);
router.get('/getCourseRating', getCourseRating);
router.get('/filterCourses', myCoursesFilter);
router.get('/search', searchMyCourses);
router.post('/addVideoLink', addVideoLink);
router.post('/addPreviewLink', addPreviewLink);
router.post('/addQuestion', addQuestion);
router.post('/addDiscount', addDiscount)

export default router;